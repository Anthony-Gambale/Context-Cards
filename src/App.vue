<template>
  <div class="mobile-view">

    <div class="input-group">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="darkMode">
        <label class="form-check-label" for="flexSwitchCheckDefault">Dark</label>
      </div>

      <button type="button" v-if="loggedIn == 1 || loggedIn == 3"
        :class="darkMode ? 'btn btn-dark btn-sm sign-out' : 'btn btn-light btn-sm sign-out'" @click="endAuthWrapper">
        About
      </button>
    </div>

    <!-- Logged in -->
    <div v-if="loggedIn == 1 || loggedIn == 3">

      <ul class="nav nav-underline justify-content-center">
        <li class="nav-item">
          <a :class="currentView == 'search' ? 'nav-link active' : 'nav-link'" href="#" @click="currentView = 'search'">
            Search
          </a>
        </li>
        <li class="nav-item">
          <a :class="currentView == 'browse' ? 'nav-link active' : 'nav-link'" href="#" @click="currentView = 'browse'">
            Deck
          </a>
        </li>
        <li class="nav-item">
          <a :class="currentView == 'review' ? 'nav-link active' : 'nav-link'" href="#" @click="currentView = 'review'">
            Review
          </a>
        </li>
        <li class="nav-item">
          <a :class="currentView == 'export' ? 'nav-link active' : 'nav-link'" href="#" @click="currentView = 'export'">
            Export to Anki
          </a>
        </li>
      </ul>

      <!-- Views -->
      <SearchDeck v-if="currentView === 'search'" :search="search" :addToAnkiExportPile="addToAnkiExportPile"
        :addToDeck="addToDeck" />

      <BrowseDeck v-if="currentView === 'browse'" :readDeck="readDeck" :removeFromDeck="removeFromDeck" />

      <ReviewDeck v-if="currentView === 'review'" :getNextReviewCard="getNextReviewCard" :removeFromDeck="removeFromDeck"
        :addToPile="addToPile" :maxPileIdx="nPiles - 1" :darkMode="darkMode"
        :updatePreviousReviewedPile="updatePreviousReviewedPile" :updatePreviousRemembered="updatePreviousRemembered"
        :updatePreviousForgot="updatePreviousForgot" />

      <ExportDeck v-if="currentView === 'export'" :readAnkiExportPile="readAnkiExportPile"
        :removeFromAnkiExportPile="removeFromAnkiExportPile" :darkMode="darkMode" />

    </div>

    <LoginPage v-if="loggedIn == 2" :beginAuth="beginAuthWrapper" :continueAsGuest="continueAsGuest" />

  </div>
</template>

<script>
import {
  beginAuth, endAuth, passWriteLoggedIn,
  // eslint-disable-next-line
  search
} from '@/firebase'
import LoginPage from '@/components/LoginPage.vue'
import ExportDeck from '@/components/ExportDeck.vue'
import BrowseDeck from '@/components/BrowseDeck.vue'
import ReviewDeck from '@/components/ReviewDeck.vue'
import SearchDeck from '@/components/SearchDeck.vue'

export default {
  name: 'App',

  components: {
    LoginPage,
    ExportDeck,
    BrowseDeck,
    ReviewDeck,
    SearchDeck
  },
  data() {
    return {
      tab: null,
      /*
      0: empty
      1: logged in
      2: logged out
      3: guest
      */
      loggedIn: 0,
      searchResults: [],
      currentView: 'search',
      ankiExportPile: [],
      deck: [],
      nPiles: 5,
      prevPile: -1,
      prevForgot: false,
      prevRemembered: false,
      darkMode: false
    }
  },
  methods: {
    beginAuthWrapper() {
      beginAuth()
    },
    endAuthWrapper() {
      endAuth()
    },
    writeLoggedIn(val) {
      this.loggedIn = val
    },
    continueAsGuest() {
      this.loggedIn = 3
    },
    addToAnkiExportPile(card) {
      this.ankiExportPile.push(card)
    },
    readAnkiExportPile() {
      return this.ankiExportPile
    },
    removeFromAnkiExportPile(removeCard) {
      this.ankiExportPile = this.ankiExportPile.filter(card => {
        return card.english != removeCard.english ||
          card.targetLanguage != removeCard.targetLanguage
      })
    },
    addToDeck(card) {
      this.deck[0].push(card) // add new cards to the *bottom* of the 0th pile
      this.persistDeck()
    },
    addToPile(card, pileIdx) {
      if (pileIdx < this.deck.length) {
        this.deck[pileIdx].push(card) // add reviewed cards to the *bottom* of the ith pile
      } else {
        console.log('tried to add a card ' + card + ' to non-existing pile ' + pileIdx)
      }
      this.persistDeck()
    },
    getNextReviewCard() {
      // check deck size
      if (this.deck.map(pile => pile.length).reduce((acc, curr) => acc + curr, 0) < 6) {
        return {
          card: null,
          pileno: null
        }
      }

      // filter for valid piles
      let validPiles = []
      for (let pile = 0; pile < 5; pile++) {
        let tooSmall = this.deck[pile].length < 1
        let onlyOneCard = this.deck[pile].length == 1
        let nextPile = Math.min(4, this.prevPile + 1)
        let forgotAndZero = (pile == 0) && this.prevForgot // we might see the same card twice in a row
        let rememberedAndNext = (pile == nextPile) && this.prevRemembered // we might see the same card twice in a row
        let forbidOneCard = forgotAndZero || rememberedAndNext
        if (!tooSmall && !(onlyOneCard && forbidOneCard)) {
          for (let x = 0; x < 5 - pile; x++) {
            validPiles.push(pile)
          }
        }
      }

      // this should never happen
      if (validPiles.length == 0) {
        console.log('there are no valid piles - this should never happen')
        return {
          card: null,
          pileno: null
        }
      }

      // select random pile
      const randomPile = validPiles[Math.floor(Math.random() * validPiles.length)]
      console.log(validPiles, randomPile)
      // this.prevPile = randomPile
      return {
        card: this.deck[randomPile][0],
        pileno: randomPile
      }
    },
    readDeck() {
      return JSON.parse(JSON.stringify(this.deck))
    },
    removeFromDeck(removeCard) {
      for (let x = 0; x < this.deck.length; x++) {
        this.deck[x] = this.deck[x].filter(card => {
          return card.english != removeCard.english ||
            card.targetLanguage != removeCard.targetLanguage
        })
      }
      this.persistDeck()
    },
    persistDeck() {
      const json = JSON.stringify(this.deck)
      localStorage.deck = json
    },
    updatePreviousReviewedPile(newPrevPile) {
      console.log('previous pile has been updated to ' + newPrevPile)
      this.prevPile = newPrevPile
    },
    updatePreviousRemembered() {
      console.log('previous review is updated to remembered')
      this.prevRemembered = true
      this.prevForgot = false
    },
    updatePreviousForgot() {
      console.log('previous review is updated to forgotten')
      this.prevRemembered = false
      this.prevForgot = true
    }
  },
  mounted() {
    try {
      this.deck = JSON.parse(localStorage.deck)
    } catch (e) {
      for (let x = 0; x < this.nPiles; x++) {
        this.deck.push([])
      }
    }
    this.darkMode = localStorage.darkMode == 'enabled'
    passWriteLoggedIn(this.writeLoggedIn)
  },
  watch: {
    darkMode: {
      handler() {
        localStorage.darkMode = this.darkMode ? 'enabled' : 'disabled'
        const htmlTag = document.querySelector('html')
        if (this.darkMode) {
          htmlTag.setAttribute('data-bs-theme', 'dark')
        } else {
          htmlTag.setAttribute('data-bs-theme', null)
        }
      }
    }
  }
}
</script>

<style scoped>
.mobile-view {
  max-width: 340px;
  margin: 0 auto;
}

button {
  margin-right: 20px;
}

.sign-out {
  margin-top: 7px;
}

.nav {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>

<style>
.form-switch {
  margin-top: 10px;
  margin-right: 30px;
}
</style>

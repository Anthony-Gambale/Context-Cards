<template>
  <div class="mobile-view">

    <div class="input-group">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="darkMode">
        <label class="form-check-label" for="flexSwitchCheckDefault">Dark</label>
      </div>

      <button
        type="button"
        v-if="loggedIn==1 || loggedIn==3"
        :class="darkMode ? 'btn btn-dark btn-sm sign-out' : 'btn btn-light btn-sm sign-out'"
        @click="endAuthWrapper">
        Sign Out
      </button>
    </div>

    <!-- Logged in -->
    <div v-if="loggedIn==1 || loggedIn==3">

      <ul class="nav nav-underline justify-content-center">
        <li class="nav-item">
          <a
            :class="currentView == 'search' ? 'nav-link active' : 'nav-link'"
            href="#"
            @click="currentView = 'search'">
            Search
          </a>
        </li>
        <li class="nav-item">
          <a
          :class="currentView == 'browse' ? 'nav-link active' : 'nav-link'"
            href="#"
            @click="currentView = 'browse'">
            Browse
          </a>
        </li>
        <li class="nav-item">
          <a
          :class="currentView == 'review' ? 'nav-link active' : 'nav-link'"
            href="#"
            @click="currentView = 'review'">
            Review
          </a>
        </li>
        <li class="nav-item">
          <a
          :class="currentView == 'export' ? 'nav-link active' : 'nav-link'"
            href="#"
            @click="currentView = 'export'">
            Export to Anki
          </a>
        </li>
      </ul>

      <!-- Views -->
      <SearchDeck
        v-if="currentView === 'search'"
        :search="search"
        :addToAnkiExportPile="addToAnkiExportPile"
        :addToDeck="addToDeck"
      />

      <BrowseDeck
        v-if="currentView === 'browse'"
        :readDeck="readDeck"
        :removeFromDeck="removeFromDeck"
      />

      <ReviewDeck
        v-if="currentView === 'review'"
      />

      <ExportDeck
        v-if="currentView === 'export'"
        :readAnkiExportPile="readAnkiExportPile"
        :removeFromAnkiExportPile="removeFromAnkiExportPile"
        :darkMode="darkMode"
      />

    </div>

    <LoginPage
      v-if="loggedIn==2"
      :beginAuth="beginAuthWrapper"
      :continueAsGuest="continueAsGuest"
    />

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
  data () {
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
      darkMode: false
    }
  },
  methods: {
    beginAuthWrapper () {
      beginAuth()
    },
    endAuthWrapper () {
      endAuth()
    },
    writeLoggedIn (val) {
      this.loggedIn = val
    },
    continueAsGuest () {
      this.loggedIn = 3
    },
    addToAnkiExportPile (card) {
      this.ankiExportPile.push(card)
    },
    readAnkiExportPile () {
      return this.ankiExportPile
    },
    removeFromAnkiExportPile (removeCard) {
      this.ankiExportPile = this.ankiExportPile.filter(card => card !== removeCard)
    },
    addToDeck (card) {
      // initialise memory value here
      this.deck.push(card)
      this.persistDeck()
    },
    readDeck () {
      return this.deck
    },
    removeFromDeck (removeCard) {
      this.deck = this.deck.filter(card => card !== removeCard)
      this.persistDeck()
    },
    persistDeck () {
      const json = JSON.stringify(this.deck)
      console.log(json)
      localStorage.deck = json
    }
  },
  mounted () {
    // if (localStorage.deck !== '' && localStorage.deck !== 'undefined') {
    //   this.deck = JSON.parse(localStorage.deck)
    // }
    try {
      this.deck = JSON.parse(localStorage.deck)
    } catch (e) {
      console.log(e)
    }
    this.darkMode = localStorage.darkMode == 'enabled'
    passWriteLoggedIn(this.writeLoggedIn)
  },
  watch: {
    darkMode: {
      handler () {
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
</style>

<style>
/* .dark-theme {
  background-color: #1e1e1e;
  accent-color: #3f3f3f;
  color: #ddd;
} */
.form-switch {
  margin-top: 10px;
  margin-right: 30px;
}
</style>

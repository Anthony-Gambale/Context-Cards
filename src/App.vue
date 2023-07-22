<template>
  <div :class="{ 'dark-theme': darkMode }">
    <div class="mobile-view">

      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="darkMode">
        <label class="form-check-label" for="flexSwitchCheckDefault">Dark theme</label>
      </div>

      <!-- Logged in -->
      <div v-if="loggedIn==1 || loggedIn==3">

        <ul class="nav justify-content-center">
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="currentView = 'search'">
              Search
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="currentView = 'browse'">
              Browse
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="currentView = 'review'">
              Review
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="currentView = 'export'">
              Export to Anki
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="#"
              @click="endAuthWrapper()">
              Sign Out
            </a>
          </li>
        </ul>

        <!-- Views -->
        <SearchDeck
          v-if="currentView === 'search'"
          :search="search"
          :addToAnkiExportPile="addToAnkiExportPile"
        />

        <BrowseDeck
          v-if="currentView === 'browse'"
        />

        <ReviewDeck
          v-if="currentView === 'review'"
        />

        <ExportDeck
          v-if="currentView === 'export'"
          :readAnkiExportPile="readAnkiExportPile"
          :removeFromAnkiExportPile="removeFromAnkiExportPile"
        />

      </div>

      <LoginPage
        v-if="loggedIn==2"
        :beginAuth="beginAuthWrapper"
        :continueAsGuest="continueAsGuest"
      />

    </div>
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
    }
  },
  mounted () {
    passWriteLoggedIn(this.writeLoggedIn)
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
</style>

<style>
.dark-theme {
  background-color: #1e1e1e;
  accent-color: #3f3f3f;
  color: #ddd;
}
.form-switch {
  margin-top: 10px;
}
</style>

<template>
  <div class="mobile-view">

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
      />

      <BrowseDeck
        v-if="currentView === 'browse'"
      />

      <ReviewDeck
        v-if="currentView === 'review'"
      />

      <ExportDeck
        v-if="currentView === 'export'"
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
      currentView: 'search'
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

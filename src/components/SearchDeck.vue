<template>

  <h1>Search</h1>

  <div class="input-group mb-3">
    <button
      class="btn btn-outline-secondary dropdown-toggle"
      type="button" data-bs-toggle="dropdown"
      aria-expanded="false">
      {{ dropDownText }}
    </button>
    <ul class="dropdown-menu">
      <li
        v-for="(language,i) in languageNames"
        :key="i">
        <a
          class="dropdown-item"
          @click="targetLanguage = language">
          {{ language }}
        </a>
      </li>
    </ul>
    <input
      type="text"
      class="form-control"
      aria-label="Text input with dropdown button"
      :placeholder="searchBarText"
      v-model="searchText"
      @keydown.enter="clickSearch">
  </div>

  <!-- Spinner -->
  <div
    class="spinner-border" role="status"
    v-if="spinnerEnabled">
    <span class="visually-hidden">Loading...</span>
  </div>

  <SearchCard
    v-for="(sentence, i) in searchResults"
    :key="i"
    :searchResult="sentence"
    :addToAnkiExportPile="addToAnkiExportPile"
    :addToDeck="addToDeck"
  />

</template>

<script>
import {
  // eslint-disable-next-line
  search
} from '@/firebase'
import { defineComponent } from 'vue'
import languages from '@/languages.json'
import SearchCard from '@/components/SearchCard.vue'

export default defineComponent({
  props: ['search', 'addToAnkiExportPile', 'addToDeck'],
  components: {
    SearchCard
  },
  computed: {
    searchBarText () {
      if (this.targetLanguage == null || this.targetLanguage == 'undefined') {
        return ''
      }
      return 'Search in English or ' + this.targetLanguage
    },
    dropDownText () {
      if (this.targetLanguage == null || this.targetLanguage == 'undefined') {
        return 'Select Target Language'
      }
      return this.targetLanguage
    }
  },
  data () {
    return {
      searchText: '',
      targetLanguage: null,
      languageNames: languages.map(lang => lang.name),
      searchResults: [],
      spinnerEnabled: false
    }
  },
  methods: {
    clickSearch () {
      if (this.targetLanguage == null || this.targetLanguage == 'undefined') return
      this.spinnerEnabled = true
      search(
        this.searchText,
        this.getTargetLanguageCode(this.targetLanguage),
        this.passResult
      )
    },
    getTargetLanguageCode () {
      if (this.targetLanguage === null) {
        return null
      } else {
        const languageObject = languages.find(lang => lang.name === this.targetLanguage)
        if (languageObject) {
          return languageObject.code
        } else {
          console.log('Nothing found in the JSON data with name of ' + this.targetLanguage)
          return null
        }
      }
    },
    passResult (result) {
      this.searchResults = result
    }
  },
  mounted () {
    if (localStorage.targetLanguage !== '') {
      this.targetLanguage = localStorage.targetLanguage
    }
  },
  watch: {
    targetLanguage: {
      handler () {
        localStorage.targetLanguage = this.targetLanguage
      }
    },
    searchResults: {
      handler () {
        this.spinnerEnabled = false
        console.log(this.searchResults)
      }
    }
  }
})
</script>

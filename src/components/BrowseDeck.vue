<template>
  <h1>Browse Deck</h1>

  <!--   <div class="input-group mb-3">
    <input type="text" class="form-control" aria-label="Text input with dropdown button" :placeholder="searchBarText"
      v-model="searchText" @keydown.enter="clickSearch">
  </div> -->

  <div class="input-group mb-3">
    <input type="text" class="form-control" :placeholder="searchBarText" aria-label="Text input with clear button"
      aria-describedby="button-addon2" v-model="searchText" @keydown.enter="searchButtonClicked">
    <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="searchButtonClicked">
      {{ buttonText }}
    </button>
  </div>

  <p v-if="isEmpty()">
    Deck is empty.
  </p>

  <p v-if="!isEmpty()">
    Your deck has {{ deckSize() }} card(s).
  </p>

  <div v-for="(pile, i) in readDeckWrapper()" :key="i">
    <h4 v-if="pile.length > 0">Memory Level {{ i }}</h4>
    <BrowseCard v-for="(card, j) in pile" :key="j" :card="card" :pile="i" :remove="removeFromDeckWrapper" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import BrowseCard from '@/components/BrowseCard.vue'
import Fuse from 'fuse.js'

export default defineComponent({
  props: ['readDeck', 'removeFromDeck'],
  data() {
    return {
      searchText: '',
      currentDeckDisplay: this.readDeck()
    }
  },
  components: {
    BrowseCard
  },
  computed: {
    searchBarText() {
      return 'Type to filter'
    },
    buttonText() {
      if (this.searchText == "") {
        return "Show all cards"
      }
      return "Filter cards"
    }
  },
  methods: {
    searchButtonClicked() {
      this.currentDeckDisplay = this.readDeck()
      if (this.searchText != "") {
        const options = {
          includeScore: true,
          keys: ['english', 'targetLanguage']
        }
        const fuse = new Fuse(this.currentDeckDisplay[0], options)
        const result = fuse.search(this.searchText)
        this.currentDeckDisplay[0] = result.map(object => object.item)
      }
    },
    isEmpty() {
      return this.deckSize() == 0
    },
    deckSize() {
      return this.readDeck().map(pile => pile.length).reduce((acc, curr) => acc + curr, 0)
    },
    readDeckWrapper() {
      return this.currentDeckDisplay
    },
    removeFromDisplay(removeCard) {
      for (let x = 0; x < this.currentDeckDisplay.length; x++) {
        this.currentDeckDisplay[x] = this.currentDeckDisplay[x].filter(card => {
          return card.english != removeCard.english ||
            card.targetLanguage != removeCard.targetLanguage
        })
      }
    },
    removeFromDeckWrapper(removeCard) {
      this.removeFromDeck(removeCard)
      this.removeFromDisplay(removeCard)
    }
  }
})
</script>

<style scoped>
h4 {
  margin-top: 30px;
}
</style>

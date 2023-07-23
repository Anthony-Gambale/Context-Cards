<template>
  <div class="search-card">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <p class="card-text">{{ searchResult.targetLanguage }}</p>
          <p class="card-text">{{ searchResult.english }}</p>
        </div>
        <div class="row">
          <div class="col-xxl text-right">
            
            <button
              class="btn btn-success btn-sm"
              :disabled="addToDeckButtonPressed"
              @click="clickAddToDeckButton()">
              Add to Deck
            </button>

            <button
              class="btn btn-info btn-sm"
              :disabled="ankiExportButtonPressed"
              @click="clickAnkiExportButton()">
              Add to Anki Export Pile
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['searchResult', 'addToAnkiExportPile', 'addToDeck'],
  data () {
    return {
      ankiExportButtonPressed: false,
      addToDeckButtonPressed: false
    }
  },
  methods: {
    clickAnkiExportButton () {
      if (!this.ankiExportButtonPressed) {
        this.ankiExportButtonPressed = true
        this.addToAnkiExportPile(this.searchResult)
      }
    },
    clickAddToDeckButton () {
      if (!this.addToDeckButtonPressed) {
        this.addToDeckButtonPressed = true
        this.addToDeck(this.searchResult)
      }
    }
  },
  watch: {
    searchResult: {
      handler () {
        this.addToDeckButtonPressed = false
        this.ankiExportButtonPressed = false
      }
    }
  }
}
</script>

<style scoped>
.search-card {
  margin-bottom: 15px;
}
button {
  margin-top: 10px;
  margin-right: 20px;
}
</style>

<template>
  <h1>Export to Anki</h1>

  <button
    type="button" class="btn btn-warning"
    @click="generateAnkiDeck">
    Generate Anki Deck
  </button>

  <div class="card anki-output" v-if="ankiDeck !== null">
    <div class="card-body">
      <p class="fst-italic fw-semibold">
        Copy this and save it as a text file to import into Anki. Anki requires
        you to use the '.txt' file extension.
      </p>
      <div class="input-group">
        <textarea
          readonly
          class="form-control" aria-label="With textarea"
          v-model="ankiDeck">
        </textarea>
      </div>
    </div>
  </div>

  <BrowseCard
    v-for="(card, i) in readAnkiExportPile()"
    :key="i"
    :card="card"
    :removeFromAnkiExportPile="removeFromAnkiExportPile"
  />

</template>

<script>
import { defineComponent } from 'vue'
import BrowseCard from '@/components/BrowseCard.vue'

export default defineComponent({
  props: ['readAnkiExportPile', 'removeFromAnkiExportPile'],
  data () {
    return {
      ankiDeck: null
    }
  },
  components: {
    BrowseCard
  },
  methods: {
    generateAnkiDeck () {
      let deck = this.readAnkiExportPile().reduce((acc, card) => {
        return acc + card.targetLanguage + ';' + card.english + '\n'
      }, '').trim()
      if (deck !== '') {
        this.ankiDeck = deck
      }
    }
  }
})
</script>

<style scoped>
button {
  margin-top: 10px;
  margin-bottom: 20px;
}
textarea {
  width: 340px;
  height: 300px;
  background-color: cornsilk;
}
.anki-output {
  margin-bottom: 40px;
  background-color: cornsilk;
}
</style>

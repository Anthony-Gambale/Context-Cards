<template>
  <h1>Export to Anki</h1>

  <button
    :disabled="readAnkiExportPile().length == 0"
    type="button"
    :class="darkMode ? 'btn btn-secondary' : 'btn btn-warning'"
    @click="generateAnkiDeck">
    Generate Anki Deck
  </button>

  <div
    :class="darkMode ? 'card anki-output-dark' : 'card anki-output-light'"
    v-if="ankiDeck !== null">
    <div class="card-body">
      <p class="fst-italic fw-semibold">
        Copy this and save it as a text file to import into Anki. Anki requires
        you to use the '.txt' file extension.
      </p>
      <div class="input-group">
        <textarea
          readonly
          :class="darkMode ? 'form-control anki-textarea-dark' : 'form-control anki-textarea-light'"
          aria-label="With textarea"
          v-model="ankiDeck">
        </textarea>
      </div>
    </div>
  </div>

  <p v-if="readAnkiExportPile().length == 0">
    Anki export pile is empty.
  </p>

  <BrowseCard
    v-for="(card, i) in readAnkiExportPile()"
    :key="i"
    :card="card"
    :pile="null"
    :remove="removeFromAnkiExportPile"
  />

</template>

<script>
import { defineComponent } from 'vue'
import BrowseCard from '@/components/BrowseCard.vue'

export default defineComponent({
  props: ['readAnkiExportPile', 'removeFromAnkiExportPile', 'darkMode'],
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
.anki-textarea-light {
  width: 340px;
  height: 100px;
  background-color: cornsilk; /* change to midnightblue when in dark mode */
}
.anki-output-light {
  margin-bottom: 40px;
  background-color: cornsilk;
}
.anki-textarea-dark {
  width: 340px;
  height: 100px;
  background-color: midnightblue; /* change to midnightblue when in dark mode */
}
.anki-output-dark {
  margin-bottom: 40px;
  background-color: midnightblue;
}
</style>

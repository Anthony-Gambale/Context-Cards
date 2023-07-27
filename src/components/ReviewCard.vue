<template>
  <div class="card">
    <div class="card-body">
      
      <p class="card-text" v-if="card !== null">
        {{ card.targetLanguage }}
      </p>

      <p class="card-text" v-if="card !== null && revealed">
        {{ card.english }}
      </p>
      
      <!-- reveal button -->
      <button
        v-if="!revealed"
        type="button"
        @click="reveal()"
        :class="darkMode ? 'btn btn-secondary' : 'btn btn-light'">
        Reveal English
      </button>

      <!-- hidden -->
      <div class="row" v-if="revealed">
        <div class="col-xxl text-right">
          
          <button
            class="btn btn-secondary btn-sm"
            @click="forgotten()">
            Forgot
          </button>

          <button
          class="btn btn-success btn-sm"
            @click="remembered()">
            Remembered
          </button>

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['card', 'currentPileIdx', 'maxPileIdx', 'darkMode',
          'removeFromDeck', 'addToPile', 'loadNextCard',
          'updatePreviousRemembered', 'updatePreviousForgot'],
  data () {
    return {
      revealed: false
    }
  },
  methods: {
    reveal () {
      this.revealed = true
    },
    forgotten () {
      this.removeFromDeck(this.card)
      this.addToPile(this.card, 0)
      this.revealed = false
      this.updatePreviousForgot()
      this.loadNextCard()
    },
    remembered () {
      this.removeFromDeck(this.card)
      if (this.currentPileIdx >= this.maxPileIdx) {
        this.addToPile(this.card, this.maxPileIdx)
      } else {
        this.addToPile(this.card, this.currentPileIdx + 1)
      }
      this.revealed = false
      this.updatePreviousRemembered()
      this.loadNextCard()
    }
  }
})
</script>

<style scoped>
button {
  margin-right: 20px;
}
</style>

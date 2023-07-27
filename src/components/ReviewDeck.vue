<template>
  <h1>Review</h1>

  <ReviewCard
    v-if="!emptyDeck"
    :removeFromDeck="removeFromDeck"
    :addToPile="addToPile"
    :card="currentCard"
    :currentPileIdx="currentPile"
    :loadNextCard="loadNextCard"
    :maxPileIdx="maxPileIdx"
    :darkMode="darkMode"
    :updatePreviousRemembered="updatePreviousRemembered"
    :updatePreviousForgot="updatePreviousForgot"
  />

  <p v-if="emptyDeck">
    Your deck must have at least 6 cards to begin reviewing.
  </p>

</template>

<script>
import { defineComponent } from 'vue'
import ReviewCard from '@/components/ReviewCard.vue'

export default defineComponent({
  props: ['getNextReviewCard', 'removeFromDeck', 'addToPile',
          'maxPileIdx', 'darkMode', 'updatePreviousReviewedPile',
          'updatePreviousRemembered', 'updatePreviousForgot'],
  data () {
    return {
      emptyDeck: false,
      currentCard: null,
      currentPile: null
    }
  },
  components: {
    ReviewCard
  },
  methods: {
    getNextReviewCardWrapper () {
      const result = this.getNextReviewCard()
      const card = result.card
      const pileno = result.pileno
      if (card == null || pileno == null) {
        this.emptyDeck = true
      } else {
        this.currentCard = card
        this.currentPile = pileno
      }
    },
    loadNextCard () {
      this.updatePreviousReviewedPile(this.currentPile)
      this.getNextReviewCardWrapper()
    }
  },
  mounted () {
    this.getNextReviewCardWrapper()
  }
})
</script>

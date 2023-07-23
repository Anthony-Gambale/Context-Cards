<template>
  <h1>Browse Deck</h1>

  <p v-if="readDeck().length == 0">
    Deck is empty.
  </p>

  <BrowseCard
    v-for="(card, i) in readDeck()"
    :key="i"
    :card="card"
    :remove="removeFromDeck"
  />

</template>

<script>
import { defineComponent } from 'vue'
import BrowseCard from '@/components/BrowseCard.vue'

export default defineComponent({
  props: ['readDeck', 'removeFromDeck'],
  components: {
    BrowseCard
  }
})
</script>

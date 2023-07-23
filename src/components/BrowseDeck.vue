<template>
  <h1>Browse Deck</h1>

  <p v-if="isEmpty()">
    Deck is empty.
  </p>

  <div
    v-for="(pile, i) in readDeck()"
    :key="i">
    <h4 v-if="pile.length > 0">Memory Level {{ i }}</h4>
    <BrowseCard
      v-for="(card, j) in pile"
      :key="j"
      :card="card"
      :pile="i"
      :remove="removeFromDeck"
    />
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import BrowseCard from '@/components/BrowseCard.vue'

export default defineComponent({
  props: ['readDeck', 'removeFromDeck'],
  components: {
    BrowseCard
  },
  methods: {
    isEmpty () {
      return this.readDeck().map(pile => pile.length).reduce((acc,curr) => acc + curr, 0) == 0
    }
  }
})
</script>

<style scoped>
h4 {
  margin-top: 30px;
}
</style>

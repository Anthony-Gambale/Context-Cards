<template>
  <h1 class="justify-content-center">
    Context Cards
  </h1>

  <a href="https://en.wikipedia.org/wiki/Spaced_repetition">SRS</a> for learning languages. You can

  <ul class="justify-content-center">
    <li>
      Search <a href="https://tatoeba.org/en/">Tatoeba</a> example sentence database
    </li>
    <li>
      Create sentence cards in one click
    </li>
    <li>
      Export cards to <a href="https://apps.ankiweb.net/">Anki</a> in one click
    </li>
    <li>
      Synchronise cards between devices in real time <b>(work in progress)</b>
    </li>
  </ul>

  <div class="loginGroup">
    <!-- <button type="button" class="btn btn-info" @click="beginAuth">
      Sign In
    </button> -->

    <button type="button" class="btn btn-link" @click="continueAsGuest">
      Return to Context Cards
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  props: ['beginAuth', 'continueAsGuest'],
  data() {
    return {
    }
  }
})
</script>

<style scoped>
.loginGroup {
  margin-top: 50px;
}

li {
  margin-top: 10px;
}
</style>

<template>

  <h1 class="justify-content-center">
    Context Cards
  </h1>

  <p class="justify-content-center">
    {{ flavourText }}
  </p>

  <button
    type="button"
    class="btn btn-info justify-content-center"
    @click="beginAuth">
  Sign In
  </button>

  <button
    type="button"
    class="btn btn-link justify-content-center"
    @click="continueAsGuest">
  Continue as Guest
  </button>

</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LoginPage',
  props: ['beginAuth', 'continueAsGuest'],
  data () {
    return {
      // copywriting tips
      // solve the problem, dont sell the product
      // e.g. "learn 1000 words" not "get access to a deck of size 1000"
      // and just more generally, lean towards the results, not the methods
      // Think of exactly who is reading. AJATT pilled people who use anki but
      // maybe arent across all the plugin shit
      flavourText: `The plan for this piece of text is to eventually explain
      to you what this app does, and why you should use it. However, I'd rather
      keep working on it at the moment instead of trying to copywrite.`
    }
  }
})
</script>

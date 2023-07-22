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
            <button class="btn btn-success btn-sm" @click="doNothing()">
              Add to Deck
            </button>
            <button class="btn btn-info btn-sm" @click="doNothing()">
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
  props: ['searchResult'],
  methods: {
    doNothing () {
      console.log('Functionality coming soon')
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

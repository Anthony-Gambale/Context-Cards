<template>
  <div class="browse-card">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <p class="card-text">{{ card.targetLanguage }}</p>
          <p class="card-text">{{ card.english }}</p>
        </div>
        <div class="row">
          <div class="col-xxl text-right">
            <button class="btn btn-danger btn-sm" @click="remove(card)">
              Remove
            </button>
            <!-- <button type="button" class="btn btn-sm" v-if="pile !== null">
              Memory score: {{ pile }}
            </button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card', 'remove', 'pile'],
  methods: {
    doNothing () {
      console.log('Functionality coming soon')
    }
  }
}
</script>

<style scoped>
.browse-card {
  margin-bottom: 15px;
}
button {
  margin-top: 10px;
  margin-right: 20px;
}
</style>

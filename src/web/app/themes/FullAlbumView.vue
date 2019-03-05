<template>
  <div class="cover">
    <img class="cover-img" alt="Currently playing album cover" v-bind:src="imgSrc" v-if="imgSrc">
  </div>
</template>

<script lang="ts" src="./FullAlbumView.vue.ts"></script>

<style scoped>
  .cover {
    text-align: center;
    height: 100%;
    display: flex;
    justify-content: center;
  }

  .cover-img {
    display: block;
    height: 100%;
  }
</style>

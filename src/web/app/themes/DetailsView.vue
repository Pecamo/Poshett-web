<template>
  <div class="informations">
    <div class="cover" v-bind:style="{backgroundImage: `url(${imgSrc})`}">
    </div>
    <div class="metadata">
      <div class="info">
        <div class="title">{{ title }}</div>
        <div class="artist" v-if="title">{{ artist }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./DetailsView.vue.ts"></script>

<style scoped>
  .informations {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: column;
    background-color: #111;
    color: #ccc;
  }

  .cover {
    background-size: contain;
    flex-grow: 1;
    background-repeat: no-repeat;
    background-position: center;
    margin: 4vh;
  }

  .metadata {
    display: flex;
    flex-flow: row;
    justify-content: space-evenly;
    align-items: center;
    margin: 4vh;
    margin-top: 0;
  }

  .info {
    display: flex;
    flex-flow: column;
    font-size: 2.5vh;
    text-align: center;
  }

  .info div {
    margin: 0.5vh;
  }

  .title {
    font-weight: bold;
  }

  .artist {
    opacity: 0.4;
  }
</style>

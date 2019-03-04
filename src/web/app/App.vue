<template>
  <fragment>
    <Navbar :isActive="activity"/>
    <router-view/>
  </fragment>
</template>

<script lang="ts" src="./App.vue.ts">
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
  }

  html, body, #root {
    width: 100%;
    height: 100%;
  }

  body {
    background-color: black;
  }
</style>


<template>
  <nav v-bind:class="{ active: isActive }">
    <div class="title">Poshett</div>
    <div>{{ timeDisplay }}</div>
    <button>Change theme</button>
  </nav>
</template>

<script lang="ts" src="./Navbar.vue.ts"></script>

<style scoped>
  nav {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 1);
    transform: translateY(-100%);
    padding: 8px;
    transition: all cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s;
  }

  nav.active {
    transform: translateY(0%);
  }

  .title {
    font-size: 150%;
    font-weight: bold;
  }
</style>


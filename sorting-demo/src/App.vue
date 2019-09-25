<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
  background: black;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: 'Space Mono', monospace;
  color: white;
  a {
    color: #ffd23f;
    text-decoration: none;
    &:hover {
      color: lightgrey;
    }
  }
}
</style>

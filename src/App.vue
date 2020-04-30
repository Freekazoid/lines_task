<template>
  <div id="app">
    <app-help>?</app-help>
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import appHelp from '@/components/help'
export default {
  name: 'App',
  components: { appHelp }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

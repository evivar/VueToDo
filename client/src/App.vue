<template>
 <v-app id="app">
    <router-view />
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import "vuetify/dist/vuetify.min.css";
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>

<template>
  <div id="app">
    <MainPage></MainPage>
  </div>
</template>

<script>
import MainPage from "./views/MainPage";

export default {
  name: "app",
  components: {
    MainPage
  }
};
</script>

<style lang="scss">
body {
  background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  background-repeat: no-repeat;
  background-attachment: fixed;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

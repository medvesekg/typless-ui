<template>
  <div id="app">
    <h1>Typless</h1>
    <div style="background-color:red;color:white" v-if="$store.state.errorMessage">
      {{ $store.state.errorMessage }}
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/training">Training</router-link> |
      <router-link to="/extract">Extract</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

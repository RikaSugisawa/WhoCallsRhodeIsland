<template>
  <div id="app">
    <md-app id="md-app">
      <md-app-toolbar class="md-primary">
        <span class="md-title">Who Calls Rhode Island</span>
      </md-app-toolbar>
      <md-app-content>
        <router-view/>
      </md-app-content>
    </md-app>
  </div>
</template>

<style lang="scss">
  #md-app {
    height: 100%;
  }
</style>

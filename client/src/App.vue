<template>
  <div id="app">
    <transition name="el-zoom-in-center" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>

export default {
	name: "App",
};
</script>

<style lang="scss">
  @import "main.scss";
</style>
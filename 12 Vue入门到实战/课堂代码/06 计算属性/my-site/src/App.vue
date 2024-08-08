<template>
  <div>
    <h1>App组件</h1>
    <Icon type="arrowDown"></Icon>
  </div>
</template>

<script>
import Icon from './components/Icon.vue'
export default {
  name: "App",
  components: {
    Icon
  }
}
</script>

<style scoped>
.iconfont {
  font-size: 14px;
  color: red;
}
</style>
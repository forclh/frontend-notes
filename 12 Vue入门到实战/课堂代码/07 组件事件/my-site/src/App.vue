<template>
  <div>
    <h1>App组件</h1>
    <Pager :total="total" :current="current" @pageChange="handlePageChange"></Pager>
  </div>
</template>

<script>
import Pager from './components/Pager.vue'
export default {
  name: "App",
  components: {
    Pager
  },
  data() {
    return {
      current: 1,
      total: 302,
    }
  },
  methods: {
    handlePageChange(newPage) {
      this.current = newPage;
      console.log('加载资源')
    }
  }
}
</script>

<style scoped></style>
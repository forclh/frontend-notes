<template>
  <div>
    <img class="avatar-container" :src="url" :style="{ width: size + 'px', height: size + 'px' }">
  </div>
</template>

<script>

export default {
  props: {
    url: {
      type: String,  // url属性必须是一个字符串
      require: true
    },
    size: {
      type: Number,
      default: 150, // 默认值
    },
  }
}
</script>

<style lang="less" scoped>
.avatar-img {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
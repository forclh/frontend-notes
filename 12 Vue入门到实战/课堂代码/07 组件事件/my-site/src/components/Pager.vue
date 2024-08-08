<template>
  <!-- 注意根元素的类名命名方式 -->
  <!-- 只有总页数大于1的时候才显示 -->
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="handleClick(1)" :class="{ disabled: current === 1 }">首页</a>
    <a @click="handleClick(current - 1)" :class="{ disabled: current === 1 }">上一页</a>
    <a @click="handleClick(n)" v-for="(n, i) in numbers" :key="i" :class="{ active: n === current }">{{ n }}</a>
    <a @click="handleClick(current + 1)" :class="{ disabled: current === pageNumber }">下一页</a>
    <a @click="handleClick(pageNumber)" :class="{ disabled: current === pageNumber }">尾页</a>
  </div>
</template>

<script>

export default {
  props: {
    // 当前页码
    current: {
      type: Number,
      default: 1
    },
    // 总数据量
    total: {
      type: Number,
      default: 10
    },
    // 页容量
    limit: {
      type: Number,
      default: 10
    },
    // 可见页码数量
    visableNumber: {
      type: Number,
      default: 10
    }
  },
  methods: {
    handleClick(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.pageNumber) {
        newPage = this.pageNumber
      }
      if (newPage === this.current) {
        return;
      }
      this.$emit('pageChange', newPage);
    }
  },
  computed: {
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },
    // 得到显示的最小页码
    visibleMin() {
      return Math.max(1, this.current - Math.floor(this.visableNumber / 2));
    },
    // 得到显示的最大页码
    visibleMax() {
      return Math.min(this.pageNumber, this.visibleMin + this.visableNumber - 1);
    },
    // 得到显示的页码数组
    numbers() {
      let nums = [];
      for (let i = this.visibleMin; i <= this.visibleMax; i++) {
        nums.push(i);
      }
      // Array.from({ length: this.visibleMax - this.visibleMin + 1 }, (v, k) => k + this.visibleMin);
      return nums
    }
  }

}
</script>

<style lang="less" scoped>
// 样式中使用~@表示src目录
// 脚本中@表示src目录
@import "~@/styles/var.less";

.pager-container {
  display: flex;
  justify-content: center;
  margin: 30px 0;

  a {
    color: @primary;
    margin: 0 6px;
    cursor: pointer;

    &.disabled {
      color: @lightWords;
      cursor: not-allowed;
    }

    &.active {
      color: @words;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>
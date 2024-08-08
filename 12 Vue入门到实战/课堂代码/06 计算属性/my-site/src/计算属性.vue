<template>
  <div>
    <h1>App组件</h1>
    <p>姓：{{ firstName }}</p>
    <p>名：{{ lastName }}</p>
    <p>全名：{{ fullName }}</p>
    <p>全名：{{ fullName }}</p>
    <p>全名：{{ fullName }}</p>
    <button @click="fullName = '杜伊伊'">修改姓名为杜伊伊</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      firstName: 'Aiden',
      lastName: 'Kao'
    }
  },
  computed: {
    fullName: {
      get() {
        console.log("fullName called");
        return this.firstName + " " + this.lastName;
      },
      set(val) {
        console.log('正在设置全名', val);
        this.firstName = val[0];
        this.lastName = val.substring(1);
      }
    }
  },
  methods: {
    getFullName() {
      console.log("method called");
      return this.firstName + " " + this.lastName;
    },
    setNewName(first, last) {
      this.firstName = first;
      this.lastName = last;
    }
  }

}
</script>
<template>
  <div class="header">
    <input
      type="text"
      placeholder="请输入你要添加的任务"
      v-model="title"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    add() {
      if (!this.title.trim()) return alert("Please enter");
      const todoObj = {
        id: Math.random() * 10,
        title: this.title,
        done: false,
      };
      this.$emit("addTodo", todoObj);
      this.title = "";
    },
  },
};
</script>

<style>
.header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid black;
  border-radius: 4px;
  padding: 4px 7px;
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236.6);
}
</style>
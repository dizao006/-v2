<template>
  <div class="fotter" v-show="this.todos.length">
    <label>
      <input type="checkbox" @click="test" :checked="isAll" />
    </label>
    <span>
      <span @click="test">已完成{{ tests }}/总数{{ todos.length }}</span>
    </span>
    <button class="btn btn-danger" @click="DelAlls">清除已经完成的任务</button>
  </div>
</template>

<script>
export default {
  props: ["todos"],
  computed: {
    isAll() {
      if (this.todos.length == 0) {
        return false;
      } else {
        return this.tests === this.todos.length;
      }
    },
    tests() {
      return this.todos.reduce((pre, current) => {
        return pre + (current.done ? 1 : 0);
      }, 0);
    },
  },
  methods: {
    DelAlls() {
      this.$emit("DelAll");
    },
    test() {
      this.$emit("Achieve");
    },
  },
};
</script>

<style>
.footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}
.footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}
.footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
}
.footer label button {
  float: right;
  margin-top: 5px;
}
.btn-danger {
  float: right;
}
</style>
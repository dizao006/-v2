<template>
  <li>
    <label>
      <input
        type="checkbox"
        :checked="todo.done"
        @click="handleCheck(todo.id)"
      />
      <span v-show="!todo.isUpdata">{{ todo.title }}</span>
      <input
        type="text"
        v-show="todo.isUpdata"
        ref="inputTitle"
        :value="todo.title"
        @blur="reve(todo, $event)"
      />
    </label>
    <button class="btn btn-danger" @click="Dels(todo.id)">删除</button>
    <button class="btn btn-change" @click="achieve(todo)">修改</button>
  </li>
</template>

<script>
import MyList from "./MyList.vue";
export default {
  comments: {
    MyList,
  },
  props: ["todo"],
  methods: {
    handleCheck(i) {
      this.$bus.$emit("check", i);
    },
    Dels(i) {
      this.$bus.$emit("Del", i);
    },
    //失去焦点时候更新数据
    reve(todo, e) {
      todo.isUpdata = false;
      if (!e.target.value) {
        alert("内容不能为空");
        return;
      }
      this.$bus.$emit("upd", todo.id, e.target.value);
    },
    achieve(todo) {
      if (Object.prototype.hasOwnProperty.call(todo, "isUpdata")) {
        todo.isUpdata = true;
      } else {
        this.$set(todo, "isUpdata", true);
      }
      this.$nextTick(function () {
        //一般用于，当数据改变后要基于更新的dom进行某些操作的时候，要在nextTick中执行
        //下一轮的时候在执行，nextTick会在dom节点更新完毕之后在执行
        //如果这个直接暴露在外面，则会执行完achieve之后才会渲染dom，但是由于inp还没有渲染到页面上，无法获取焦点
        this.$refs.inputTitle.focus();
      });
    },
  },
};
</script>

<style>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}
li label {
  float: left;
  cursor: pointer;
}
li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}
li button {
  float: right;
  display: none;
  margin-top: 3px;
}
li:before {
  content: initial;
}
li:last-child {
  border-bottom: none;
}
li:hover {
  background-color: #ddd;
}
li:hover button {
  display: block;
}
</style>
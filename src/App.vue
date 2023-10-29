<template>
  <div id="root">
    <div class="container">
      <div class="todo-wrap">
        <MyHeader @addTodo="addTodo"></MyHeader>
        <MyList :todos="todos"></MyList>
        <MyFooter :todos="todos" @DelAll="DelAll" @Achieve="Achieve"></MyFooter>
      </div>
    </div>
  </div>
</template>

<script>
import MyFooter from "./components/MyFooter.vue";
import MyHeader from "./components/MyHeader.vue";
import MyList from "./components/MyList.vue";
export default {
  components: {
    MyHeader,
    MyFooter,
    MyList,
  },
  mounted() {
    this.$bus.$on("Del", this.Del);
    this.$bus.$on("check", this.cheke);
    this.$bus.$on("upd", this.upd);
  },
  beforeDestroy() {
    this.$bus.$off("Del", this.Del);
    this.$bus.$off("check", this.cheke);
    this.$bus.$off("upd", this.upd);
  },
  methods: {
    //更新
    upd(id, value) {
      this.todos.forEach((i) => {
        if (i.id === id) {
          i.title = value;
        }
      });
    },
    //添加
    addTodo(todoObj) {
      this.todos.unshift(todoObj);
    },
    //勾选
    cheke(id) {
      this.todos.forEach((item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
      });
    },
    //删除
    Del(id) {
      this.todos = this.todos.filter((e) => e.id !== id);
    },
    //删除已完成的
    DelAll() {
      this.todos = this.todos.filter((e) => e.done === false);
    },
    //全选
    Achieve() {
      this.isAll = this.todos.every((e) => {
        return e.done === true;
      });
      if (this.isAll) {
        this.todos.forEach((e) => {
          e.done = false;
        });
      } else {
        this.todos.forEach((e) => {
          e.done = true;
        });
      }
    },
  },
  data() {
    return {
      todos: JSON.parse(localStorage.getItem("todos")) || [],
    };
  },
  watch: {
    todos: {
      deep: true,
      handler(value) {
        localStorage.setItem("todos", JSON.stringify(value));
      },
    },
  },
};
</script>

<style>
body {
  background: #fff;
}
.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}
.btn-change {
  color: #fff;
  background-color: #a6aeb3;
  border: 1px solid #a6aeb3;
  margin-right: 8px;
}
.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}
.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}
.btn:focus {
  outline: none;
}
.container {
  width: 600px;
  margin: 0 auto;
}
.container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.1.4/vue.esm-browser.min.js";

const app = {
  data(){
    return {
      text: "",
      editId: "",
      editTodo: "",
      todos: [],
      filterBtn:'all',
    }
  },
  methods: {
    removeTodos(index) {
      console.log(index);
      this.todos.splice(index, 1);
    },
    getTodos(){
      this.todos = JSON.parse(localStorage.getItem("note")) || []; // 拿出來並轉換成物件
    },
    addTodos(){
      if(!this.text.trim()){return;};
      this.todos.unshift({
        id: this.todos.length + 1,
        note: this.text,
        status: false,
      });
      localStorage.setItem('note', JSON.stringify(this.todos));
      this.text = "";
    },
    writeCheck(item){
      item.status = !item.status;
      localStorage.setItem('note', JSON.stringify(this.todos));
    },
    editTodos(item){
      this.editId = item.id;
      this.editTodo = item.note;
    },
    editDone(item){
      if(!this.editTodo){return};
      item.note = this.editTodo;
      this.editTodo = '';
      this.editId = '';
    },
    editCancel(){
      this.editId = '';
      this.editTodo = '';
    },
    allClear(){
      if(window.confirm("確定要全部清除嗎？")){
        this.todos.length = 0;
        localStorage.clear();
        console.log('全部清除');
      } else {
        console.log("取消");
      }
    }
  },
  computed: {
    filterTodos() {
      switch(this.filterBtn){
        case "finish":
          return this.todos.filter(item => item.status == true );
        case "unfinish":
          return this.todos.filter(item => !item.status );
        default:
          return this.todos;
      }
    },
    finishLength(){
      return this.todos.filter(item => item.status == true ).length;
    },
    unfinishLength(){
      return this.todos.filter(item => !item.status ).length;
    }
  },
  mounted(){
    this.getTodos();
  }
}

createApp(app).mount("#app");
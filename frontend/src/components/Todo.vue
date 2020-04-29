<template >

<div class="main-todo-holder">

  <div class="bird-container ">
		<div class="bird "></div>
	</div>

  <div class="bird-container bird-container-back">
		<div class="bird bird-back"></div>
	</div>

    <div class="main-todo">
        <div class="main-half">
            <h1>The next thing I need to do:</h1>
            <input @keyup.enter="newTodo" v-model="addTodoInput" name="add-todo" type='text'/> <br>
            <button v-on:click.prevent="newTodo">Add </button>

            <div class="filter-holder">
                <input v-on:click="showAllTodos()" type="radio" id="showAll" v-model="showAll"  name="done" value="true">
                  <label for="showAll"> Show all </label>
               <input v-on:click="showDone()" type="radio" id="done"  name="done">
                  <label for="done"> Show completed only </label>
                  <input v-on:click="showPending()" type="radio" id="notdone" name="done" >
                  <label for="notdone"> Show pending only </label>
            </div>
  
            <div class="extra-btns">
                <button v-on:click="clearAll(allTodos)">
                    I have completed everything, check and clear the list!
                </button>
                <button v-on:click="uncheckAll(allTodos)" >I gotta do it all over again, unmark all of them...</button>
            </div>
        </div>
         <div  class="main-half">
           <div class="list-header">
              <span> Today is {{getDate(new Date().toISOString())}}</span>
              <input type="checkbox" id="time" v-model="showCreated"  name="time" value="true">
                  <label for="time"> Show creation time </label>
           </div>

            <ul  class="list"  v-if="allTodos.length">
            <li class="one-todo" v-for="todo in filteredTodos" :key="todo._id" >

              <div  class="row" >
             
               <div class="check-holder" v-on:click="checkTodo(todo)"> <img v-bind:class="checkedFunction(todo.completed)" src="../assets/check.png"></div> 
               <div class="span-holder">
               <span class="line" v-bind:class="getCrossed(todo)" >{{todo.name}}</span>
               </div>
               <span v-if='showCreated' class="createdon">{{ getDate(todo.createdAt)}}</span> 

                <img  class="icon icon-small" v-if="todo.pinned===false" v-on:click="pinTodo(todo)"  src="../assets/pin.png">
                <img class="icon icon-small" src="../assets/unpin.png" v-if="todo.pinned===true"  v-on:click="pinTodo(todo)"> 
               <img class="icon" v-on:click="removeTodo(todo)" src="../assets/cross.png">

              </div>  



           </li>
  
            </ul>
            <div class="tips">  
              <span > <img src="../assets/pin.png"> Pins a todo to the Home page.</span>
              <span ><img src="../assets/unpin.png"> Unpins a todo from the Home page.</span>
              <span > <img src="../assets/cross.png"> Deletes a todo</span>
            </div>
        </div>
    </div>
</div>


</template>

<script>

  import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Todo',
        computed: {
          ...mapGetters(['allTodos']),
          filteredTodos: function () {
                if (this.filterDone==true && this.showAll==false) {
                  
               return this.allTodos.filter(x => x.completed==true)

                } else if (this.filterDone==false && this.showAll==false ) {
                  return this.allTodos.filter(x => x.completed==false)
                } else {
               return this.allTodos

                }
             
              }, 
        },
        data () {
             return {
                msg: '',
                addTodoInput:"",
                showCreated: false,
                todos: [],
                filterDone: false,
                showAll: true,
                
            }
        },
        mounted() {
          this.fetchTodos()
        },
        created(){
     
          this.fetchTodos()

        },
        updated() {
          this.fetchTodos()
        
        },
        methods:{
            ...mapActions(['fetchTodos', 'addTodo', 'editTodo', 'pinTodo', 'checkTodo']),
       
              newTodo: function(){
                let payload = {
               name: this.addTodoInput,
               completed: false,
              pinned: false
                };
              this.$store.dispatch("addTodo", payload);
            this.addTodoInput = '';
              },

              showDone: function() {
                this.filterDone = true
                this.showAll = false
              },

              showPending: function() {
                this.filterDone = false
                this.showAll = false

              },
              showAllTodos: function() {
                this.showAll = true
               this.filterDone = false
              },

               removeTodo: function (todo) {
                    let payload = {
                      _id:todo._id,
                      name: todo.name,
                      pinned: todo.pinned,
                      completed: todo.completed
                    };
              this.$store.dispatch("removeTodo", payload);

              },


            pinTodo: function(todo) {
              if(todo.pinned==true) {
                todo.pinned = false
              } else {
                todo.pinned=true
              }
              this.$store.dispatch("pinTodo", todo);

            },
              getDate: function(date) {
                    let datevar = new Date(date);
                    let day = datevar.getUTCDate();
                    let month = datevar.getUTCMonth();
                    return `${day}.${month}`
            },

            checkedFunction: function(completed) {
              return {'completed': completed,
                      'uncompleted': !completed
            }},

             checkTodo: function(todo) {
              if(todo.completed==true) {
                todo.completed = false
              } else {
                todo.completed=true
              }
              this.$store.dispatch("checkTodo", todo);

            },
            getCrossed: function(todo) {
              return {
                "crossed": todo.completed && todo.name.length < 40,
                "crossed-decoration":  todo.completed && todo.name.length >  39
              }
            },
            uncheckAll(allTodos) {
              let todos = JSON.parse(JSON.stringify(allTodos))
              todos.forEach(todo => {
                if (todo.completed == true) {
                  todo.completed = false
                  this.$store.dispatch("checkTodo", todo);
                  console.log(todo)
                }
              })
            },

            clearAll(allTodos) {
              let todos = JSON.parse(JSON.stringify(allTodos))
              todos.forEach(todo => {
                if (todo.completed == false) {
                  todo.completed = true
                  this.$store.dispatch("checkTodo", todo);
                  console.log(todo)
                }
              })
              setTimeout(() => {
                todos.forEach(todo => {
              this.$store.dispatch("removeTodo", todo);
                })
              }, 1000);

          
            }
              
        }
    }
</script>

<style scoped>

::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
.main-todo {
    width:94%;
    margin: 0 auto;
    border-left: 2px solid #2c3e50;
    border-right: 2px solid #2c3e50;
    border-bottom: 2px solid #2c3e50;
    border-collapse: collapse;
    height:80%;
    margin-bottom:3%; 
    z-index: 12 !important;
    position: relative;
    display: flex;
    }
.main-half {
    width:50%;
    display: block;
    }
input[type=text]{
  border: 0;
   padding: 30px; 
   border: 2px solid transparent; 
   border-bottom-color: black; 
   transition: 0.4s;
   background: none;
   outline: none;
   width:60%;
   height:40px;
   margin-top:4%;
   font-size: 26px
  }

input:focus{
  padding: 40px;
   transition: 0.4s;
   border:2px solid black
   }
.main-half h1{
    margin-top:5%
}
.main-half:nth-of-type(1){
    border-right:2px solid black
}

button {
  background: none;
  padding: 7px;
  font-size: 20px;
  margin: 50px auto;
  border: 2px solid black;
  width: 20%;
  transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);	
  cursor: pointer;
  user-select: none;
  outline: none
}

button:hover{
  background: black;
  color:lightgray
}
.extra-btns button{
width: 200px;
height:200px;
margin: 10% 5%;
font-size: 24px
}
.list {
  color: #555;
  font-size: 22px;
  padding: 0 !important;
  margin: 2% auto;
  width: 80%;
  max-height: 80%;
  border: 1px solid #dedede;
  overflow-y: scroll;
  position: relative;
}

.list li {
  list-style: none;
  border-bottom: 1px dotted black;
  height: auto;
  background: white;
  text-transform: capitalize;
  text-align: left;
  display: flex;
  width: 100%
}
.list li:hover {
  background:none;
}

img {
    width:25px;
    height:auto;
    margin: auto
}
.completed {
  opacity:1
}
.uncompleted {
  opacity:0
}
.check-holder{
    max-width:60px;
    margin: auto;
    height: auto;
    padding: 15px 15px
}
.span-holder {
width: 90%;
padding-left: 15px;
display: flex;
border-left: 1px solid red
}

li span {
  margin-left: 3px;
  /* max-width: 70%; */
  display: inline-block;
	position: relative;
	transition: all 0.5s cubic-bezier(.55, 0, .1, 1);
  padding:18px;
  /* white-space:nowrap; */
}
.icon{
  opacity: 0;
  transition: all 0.2s linear;
  width: 40px !important;
  height: 40px;
  margin: auto;
  transition: all 0.15s linear
}

.row:hover > .icon {
opacity: 1;
}

.icon:hover{
  -webkit-transform: scale(1.3)
}

.createdon {
  font-size: 10px;
  position: relative;
  top: 5px
}

.list-header {
    display: flex;
  width: 70%;
  margin: 30px auto 0px auto;
  justify-content: space-between
}

[type="checkbox"]:checked,
[type="checkbox"]:not(:checked),
[type="radio"]:checked,
[type="radio"]:not(:checked){
    position: absolute;
    left: -9999px;
}
[type="checkbox"]:checked + label,
[type="checkbox"]:not(:checked) + label,
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: black;
    padding-bottom:5px;
    
}

[type="checkbox"]:checked + label:before,
[type="checkbox"]:not(:checked) + label:before,
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 20px;
    border: 2px solid black;
    background: transparent;
}
[type="checkbox"]:checked + label:after,
[type="checkbox"]:not(:checked) + label:after,
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after  {
    content: '';
    width: 20px;
    height: 20px;
    background: black;
    position: absolute;
    top: 0px;
    left: 0px;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}

[type="checkbox"]:not(:checked) + label:after,
[type="radio"]:not(:checked) + label:after{
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="checkbox"]:checked + label:after,
[type="radio"]:checked + label:after{
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

span:before, span:after {
  content: '';
  position: absolute;
  width: 0%;
  height: 2px;
  top: 50%;
  margin-top: -0.5px;
  background: black;
}

span:before {
  left: -2.5px;
}
span:after {
  right: 2.5px;
  background: black;
  transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.crossed:before {
  background: black;
  width: 100%;
  transition: width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.crossed:after {
  background: transparent;
  width: 100%;
  transition: 0s;
}
.crossed-decoration{
  text-decoration: line-through
}
.filter-holder {
  width: 80%;
  margin:auto;
  display: flex;
  justify-content: space-around
}
.row {
  width: 100%;
  display: flex;
  height: fit-content;
}
.icon-small {
  width: 27px! important;
  height:27px !important
}
.tips{
  position: absolute;
  bottom:1em;
  right:1em;
  font-size: 10px;
  display: grid;
  text-align: left
}
.tips img {
  width:15px;
  height:15px;
  top: 15px
}



.bird {
	background-image: url('../assets/bird.svg');
	background-size: auto 100%;
	width: 88px;
	height: 125px;
	will-change: background-position;
  animation-duration: 1s;
	animation-name: fly-cycle;
	animation-timing-function: steps(10);
	animation-iteration-count: infinite;
}

.bird:nth-of-type(1){
animation-delay: 1.5s;	
}

.bird-container {
	position: absolute;
	transform: scale(0) translateX(-10vw);
	will-change: transform;
	animation-name: fly-right-one;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
  animation-duration: 15s;
}

.bird-container:nth-of-type(1){
	top: 20%;
	left: -10%;
	animation-delay: 0s;

}

.bird-container-back{
	/* transform: scale(0) translateX(110vw) !important; */
	animation-name: fly-left-one !important;
  position: absolute;
	transform: scale(0) translateX(-10vw);
	will-change: transform;
	animation-name: fly-right-one;
	animation-timing-function: linear;
	animation-iteration-count: infinite;
  animation-duration: 15s;
  top: 70%;
	left: -10%;
	animation-delay: 5s;

}

.bird-back {
animation-delay: 9.5s;	
	background-image: url('../assets/bird_back.svg');

}



/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px)  { 

.main-todo{
  width:calc(96% - 1px);
  height:86vh
}
h1{
  font-size: 26px
}
label {
  font-size: 12px
}
.extra-btns button {
  width:140px;
  font-size: 16px;
  height:140px
}
.extra-btns {
  margin-top: 3em;
}
.list li{
  line-height: 22px
}
img{
  width:20px;
  height:auto
}

}


/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {


.main-todo{
  width:calc(96% - 2px);
  height:86vh
}
h1{
  font-size: 20px
}
input[type=text] {
  width:80%
}
label {
  font-size: 12px
}
.extra-btns button {
  width:140px;
  font-size: 16px;
  height:140px
}
.extra-btns {
  display: flex;
  width:50%;
  margin: 5em auto;
  flex-direction: column;
}
.list {
  margin: 5% auto
}
.list li{
  line-height: 22px;
  font-size: 18px
}
img{
  width:20px;
  height:auto
}
[type="checkbox"]:checked + label,
 [type="checkbox"]:not(:checked) + label,
  [type="radio"]:checked + label, 
  [type="radio"]:not(:checked) + label {
    padding-left: 22px
  }

 .filter-holder{
   width: 96%
 } 

 .list-header{
width: 94%
 }

 .icon {
   width: 28px !important;
   height: auto !important;
 }
  .icon-small{
   width:20px !important;
   height:auto !important
 }

}


/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {


.main-todo{
  width:calc(98% - 2px);
  height:86vh
}
h1{
  font-size: 16px
}
input[type=text] {
  width:80%;
  padding:12px;
}
button {
  margin:14px auto
}
label {
  font-size: 9px
}
.extra-btns button {
  width:110px;
  font-size: 11px;
  height:70px;
  padding:5px
}
.extra-btns {
  display: flex;
  width:80%;
  margin: 0em auto;
  flex-direction: row;
}
.list {
  margin: 5% auto
}
.list li{
  line-height: 15px;
  font-size: 12px
}
img{
  width:16px;
  height:auto
}
[type="checkbox"]:checked + label,
 [type="checkbox"]:not(:checked) + label,
  [type="radio"]:checked + label, 
  [type="radio"]:not(:checked) + label {
    padding-left: 22px
  }

 .filter-holder{
   width: 96%
 } 

 .list-header{
  width: 94%;
  margin-top:6px
 }
 .list-header span {
   font-size: 12px
 }

 .icon {
   width: 24px !important;
   height: auto !important;
 }
  .icon-small{
   width:14px !important;
   height:auto !important
 }
.tips{
  display: none
}
.line {
  padding:8px 8px;
  top:20%
}
span:before, span:after {
  top: 32%;
}
}
@media (max-width: 480px) {

.main-todo{
  width:calc(99% - 1px);
  height:92vh;
  display: flex;
  flex-direction: column
}
.main-half {
  width:100%;
  height:50%
}
.main-half:nth-of-type(1) {
    border-bottom: 2px solid black;
    border-right:none
}
h1{
  font-size: 16px
}
input[type=text] {
  width:80%;
  padding:12px;
}
button {
  margin:14px auto;
  font-size: 12px
}
label {
  font-size: 9px
}
.extra-btns button {
  width:110px;
  font-size: 11px;
  height:70px;
  padding:5px
}
.extra-btns {
  display: flex;
  width:80%;
  margin: 0em auto;
  flex-direction: row;
}
.list {
  margin: 5% auto;
  width: 90%
}
.list li{
  line-height: 15px;
  font-size: 12px
}
img{
  width:16px;
  height:auto
}
[type="checkbox"]:checked + label,
 [type="checkbox"]:not(:checked) + label,
  [type="radio"]:checked + label, 
  [type="radio"]:not(:checked) + label {
    padding-left: 22px
  }

 .filter-holder{
   width: 96%
 } 

 .list-header{
  width: 94%;
  margin-top:6px
 }
 .list-header span {
   font-size: 12px
 }

 .icon {
   width: 24px !important;
   height: auto !important;
 }
  .icon-small{
   width:14px !important;
   height:auto !important
 }
.tips{
  display: none
}
.line {
  padding:8px 8px;
  top:20%
}
span:before, span:after {
  top: 32%;
}
}
    </style>
<template>

<div class="main-holder">

  <div class="bird-container ">
		<div class="bird "></div>
	</div>
  <div class="bird-container ">
		<div class="bird "></div>
	</div>

    <div class="main-home">
      <img class="back-icon" v-on:click="navigate('/')" src="../assets/back.png">
      <!-- <p> Hello! Here you find the most important items you pinned not to forget.</p> -->
        <div class="main-half">
            <div class="pinned-half pinned-todos">
                <h2> Pinned todos:</h2>
                <p v-if ="pinnedTodos.length==0" class="pinned-empty">Well done! No essential things to do right now.</p>
                <ul v-if ="pinnedTodos.length!==0" class="list" >
                    <li class="one-todo" v-for="todo in pinnedTodos" :key="todo._id" >

                            <div  class="row" >
                            <div class="check-holder" v-on:click="checkTodo(todo)">
                                 <img v-bind:class="checkedFunction(todo.completed)" src="../assets/check.png"></div> 
                            <div class="span-holder">
                            <span class="line" v-bind:class="getCrossed(todo)" >{{todo.name}}</span>
                            
                            </div>
                                <span  class="createdon">{{ getDate(todo.createdAt)}}</span>

                <img  class="icon icon-small" v-if="todo.pinned===false" v-on:click="pinTodo(todo)"  src="../assets/pin.png">
                <img class="icon icon-small" src="../assets/unpin.png" v-if="todo.pinned===true"  v-on:click="pinTodo(todo)">
                            </div>  
                </li>
  
            </ul>
            </div>

            <div class="pinned-half pinned-shop">
                <h2> Pinned shopping lists: </h2>
                <p v-if="pinnedShops.length==0" class="pinned-empty">Well done! No essential things to buy right now.</p>
            <div>
               <div class="one-list"  v-for="list in pinnedShops" :key="list._id" >
                <ul class="list-shop" >
                     <div class="list-title">
                      <img  class="icon icon-small" v-if="list.pinned===false"  src="../assets/pin.png">
                      <img class="icon icon-small" v-on:click="pinList(list)"  src="../assets/unpin.png" v-if="list.pinned===true" > 
                              <p>{{allShops.indexOf(list)+1}}. {{list.name}}</p>
                      </div>
                    <li class="one-item" v-for="item in list.items" :key="item._id" >

                        <div  class="item-holder" >
                        
                            <div class="check-holder" v-on:click="checkItem(list, item)"> 
                              <img v-bind:class="checkedFunction(item.crossed)" src="../assets/check.png">
                              </div> 
                            <div class="span-holder">
                                 <span v-bind:class="getCrossedShop(item)" class="line" >{{item.name}}</span>   
                            </div>
                        </div>  
                     </li>
    
                </ul>
            </div>
            </div>


            </div>
        </div>

        <div class="main-half notes-half">
             <h2>Your the most important notes:</h2>
                <!-- <p v-if="pinnedNotes.length==0" class="pinned-empty">No pinned notes so far.</p> -->

           <div class="notes-lists" >

            <div v-for="note in pinnedNotes" :key="note._id">
              <div  v-bind:class="note.color" class="note">
                <button v-if="note.pinned===false" v-on:click="pinNote(note)"  > 
              
                </button>
                 <button v-if="note.pinned===true"  v-on:click="pinNote(note)" > 
                  <img src="../assets/unpin.png">
                </button>
                <h2>
                  Note #{{allNotes.indexOf(note)+1}}
                </h2>
                <h4 >{{note.name}}</h4>

                  <div class="date">
                    <p>Created on {{getDate(note.createdAt)}}</p>
                  </div>
              </div>
            </div>
     
        </div>
          
      <span class="tips">Click <img src="../assets/unpin.png"> to unpin an item from the Home page.</span>

        </div>
    </div>
    </div>
</template>

<script>


import {mapGetters, mapActions} from 'vuex';
import router from '../router'


// import $ from 'jquery'

    export default {
        name: 'Home',
        data () {
            return {
                msg: 'Hey Nic HOME'
            }
        },
            computed: {
          ...mapGetters(['allTodos', 'allShops', 'allNotes']),
          pinnedTodos: function () {
            if(this.allTodos) {
               return this.allTodos.filter(x => x.pinned==true)
            } else return this.allTodos
          },
             pinnedShops: function () {

            if(this.allShops) {
               return this.allShops.filter(x => x.pinned==true)
            } else return this.allShops
          },

              pinnedNotes: function () {
            if(this.allNotes) {
               return this.allNotes.filter(x => x.pinned==true)
            } else return this.allNotes

         
          },
       
       
        },

         methods:{
            ...mapActions(['fetchTodos',  'checkTodo', 'fetchShops', 'updateShopList', 'fetchNotes',  'editNote']),

                   checkedFunction: function(completed) {
              return {'completed': completed,
                      'uncompleted': !completed
            }},

                   getCrossed: function(todo) {
              return {
                "crossed": todo.completed && todo.name.length < 40,
                "crossed-decoration":  todo.completed && todo.name.length >  39
              }
            },
              getCrossedShop: function(item) {
              return {
                "crossed": item.crossed && item.name.length < 40,
                "crossed-decoration":  item.crossed && item.name.length >  39
              }
            },

              getDate: function(date) {
                    let datevar = new Date(date);
                    let day = datevar.getUTCDate();
                    let month = datevar.getUTCMonth();
                    return `${day}.${month}`
            },
            checkTodo: function(todo) {
              if(todo.completed==true) {
                todo.completed = false
              } else {
                todo.completed=true
              }
              this.$store.dispatch("checkTodo", todo);

            },
              checkItem: function(list, item) {

              let index = list.items.findIndex(n => n._id == item._id)

              if(list.items[index].crossed == true) {
                list.items[index].crossed = false
              } else {
              list.items[index].crossed = true 
                
              }
              this.$store.dispatch('updateShopList', list);
            },

            pinList: function(list) {
              if(list.pinned==true) {
                list.pinned = false
              } else {
                list.pinned=true
              }
              this.$store.dispatch("pinShopList", list);

            },

            pinTodo: function(todo) {
              if(todo.pinned==true) {
                todo.pinned = false
              } else {
                todo.pinned=true
              }
              this.$store.dispatch("pinTodo", todo);

            },

            pinNote: function(note) {
              if(note.pinned==true) {
                note.pinned = false
              } else {
                note.pinned=true
              }
              this.$store.dispatch("editNote", note);

            },
                navigate(page) {
                router.push({ name: page});
            },
         },

        
  
        mounted () {
            //     $(document).ready(function(){
            //     $('.note').draggable();
            // });
          this.fetchTodos()
          this.fetchShops()
          this.fetchNotes()


            }



  
    }
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

.main-holder {
  overflow: hidden;
    height:80%;
    display: flex;
    position:relative;
    margin-bottom:3%;

}
.main-home {
    width:94%;
    margin: 0 auto;
    border-left: 2px solid black;
    border-right: 2px solid black;
    border-bottom: 2px solid black;
    border-collapse: collapse;
    /* height:80%; */
    /* margin-bottom:3%; */
    z-index: 12;
    position: relative;
}


.main-home p{
padding-top: 20px
}
.main-half {
    display: flex;
    height:50%;
}
.main-half:nth-of-type(1) {
    border-bottom: 2px solid black

}
.main-half:nth-of-type(2) {
    overflow: auto

}

.notes-half {
  flex-direction: column
}

.pinned-half{
    width:50%;
    overflow: auto
}
.pinned-half:nth-of-type(1) {
  border-right:1px solid black
}
.pinned-half:nth-of-type(2) {
  border-left:1px solid black
}
.completed {
  opacity:1
}
.uncompleted {
  opacity:0
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

.list {
  color: #555;
  font-size: 22px;
  padding: 0 !important;
  margin: 20px auto;
  width: 80%;
  max-height: 73%;
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
  width: 35px !important;
  height: 35px;
  margin: auto;
  transition: all 0.15s linear
}


.row:hover > .icon {
opacity: 1;
}

.icon:hover{
  -webkit-transform: rotate(8deg) scale(1.3);

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
  width: 23px! important;
  height:23px !important;
  margin-left:10px;
  margin-right: 10px
}

.one-list {
    height: 300px;
    
}

.list-shop {
  color: #555;
  font-size: 22px;
  padding: 0 !important;
  margin: 0px auto;
  width: 85%;
  max-height: 90%;
  min-height:5%;
  border: 1px solid #dedede;
  overflow-y: scroll;
  position: relative;
  -moz-transition:-moz-transform .15s linear;
  -o-transition:-o-transform .15s linear;
  -webkit-transition:-webkit-transform .15s linear;
}

.list-shop li {
  list-style: none;
  border-bottom: 1px dotted black;
  height: auto;
  background: white;
  text-transform: capitalize;
  text-align: left;
  display: flex;
  width: 100%
}
.list-shop li:hover {
  background:none;
}
.item-holder {
  width: 100%;
  display: flex;
  height: fit-content;
}
.list-title > p {
    padding: 15px;
    background: white;
    cursor: pointer;
    width: 95%;
text-transform: capitalize;
}
.list-shop:hover .icon{
  opacity: 1;
}
.list-title {
display: flex;
border-bottom:1px solid red;
background: white
}
.pinned-shop > div{
 display:grid;
  width: 90%;
  margin: 15px auto;
  grid-template-columns: repeat(2, 1fr);
}

.notes-lists {
  display:grid;
  width: 80%;
  margin: 30px auto;
  grid-template-columns: repeat(6, 1fr);
  
}

.note {
text-decoration:none;
  color:#000;
  background:#ffc;
  display:block;
  height:13em;
  width:11em;
  padding: 1em 0.5em;
  margin: 1em;
  cursor: pointer;
  -moz-box-shadow:5px 5px 7px rgba(33,33,33,1);
  -webkit-box-shadow: 5px 5px 7px rgba(33,33,33,.7);
   box-shadow: 5px 5px 7px rgba(33,33,33,.7);
  -webkit-transform:rotate(-6deg);
  -o-transform:rotate(-6deg);
  -moz-transform:rotate(-6deg);
  -moz-transition:-moz-transform .15s linear;
  -o-transition:-o-transform .15s linear;
  -webkit-transition:-webkit-transform .15s linear;
  overflow-Y:scroll
}


.note:hover{
  -moz-box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -webkit-box-shadow: 10px 10px 7px rgba(0,0,0,.7);
  box-shadow:10px 10px 7px rgba(0,0,0,.7);
  -webkit-transform: scale(1.25);
  -moz-transform: scale(1.25);
  -o-transform: scale(1.25);
  position:relative;
  z-index:5;
}
.note button {
  background: none;
  padding: 5px;
  width:80% !important;
  margin: auto;
  font-size: 11px;
  position: absolute;
  border:none;
  top:3%;
  left:3%;
  display:flex;
}
.note button span {
  text-align:left
}
.note button:hover > img{
transform: rotate(8deg) scale(1.2)

}
.note button:hover > .mouseover-span{
opacity: 1;
padding-left:5px
}
.note button img {
  width:20px;
  position: relative;
  height:auto;
  margin: 0px 3px 0px 5px;
  transition: all 0.15s linear

}
.pink{
  background: #ffccff;
    -o-transform:rotate(4deg);
  -webkit-transform:rotate(4deg);
  -moz-transform:rotate(4deg);
   position:relative;
  top:5px;
}
.green{
  background: #cfc;
    -o-transform:rotate(-3deg);
  -webkit-transform:rotate(-3deg);
  -moz-transform:rotate(-3deg);
  position:relative;
  top:-5px;

}
.yellow{
  background: #feffcc;
    -o-transform:rotate(-1deg);
  -webkit-transform:rotate(-1deg);
  -moz-transform:rotate(-1deg);
  position:relative;
  top:-10px;
}
.blue {
    background: #ccecff;
    -o-transform:rotate(6deg);
  -webkit-transform:rotate(6deg);
  -moz-transform:rotate(6deg);
  position:relative;
  top:10px;
}
h2{
  padding-top: 20px
}
.mouseover-span{
  opacity: 0;
}
.pinned-empty {
  width: 30%;
  margin:10%  auto;
  font-size: 24px
}
.note .date {
  position: absolute;
  width: 90%;
  bottom:0;
  font-size: 12px;
  margin: 0px !important

}
.note .date p {
  width: 90%;
  border-top: 1px solid black;
  padding: 5px 0px
}
.tips{
  position: absolute;
  bottom:1em;
  right:1em;
  font-size: 12px
}
.tips img {
  width:15px;
  height:15px;
  top: 15px
}
.back-icon {
  position: fixed;
  top: 20px;
  left:20px;
  cursor: pointer;
  transition: all 0.15s linear
}
.back-icon:hover{
  transform: scale(1.25)
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
.bird:nth-of-type(2){
animation-delay: 11.5s;	
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
.bird-container:nth-of-type(2){
	top: 80%;
	left: -10%;
	animation-delay:10s;

}





/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px)  { 
.main-holder{
  margin-bottom:1em;
  height:82%;
  width:calc(96% - 1px);
  margin:auto
}
.main-home {
  width:100%
}

.pinned-half:nth-of-type(2) {
  border-left:1px solid black
}
h2{
  font-size: 16px
}
.line {
  font-size:14px;
  padding: 0px;
  overflow-y:auto;
  line-height:20px;
  max-width:100%;
  top:20%
}
img {
  height:18px;
  width:auto
}
.pinned-shop > div{
  width:96%;
  margin:6px auto   
}
.one-list {
  height: 16em
}
.list-title > p{
  padding:9px;
  padding-left:0px;
  font-size: 14px
}
.list li, .list-shop li {
  height:50px
}
.notes-lists {
  width:92%;
  grid-template-columns: repeat(5, 1fr)
}
.note {
  width: 9em;
  height: 11em
}
span:before, span:after {
  top: 18%;
}
.pinned-empty{
  width:70%
}
}


/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {

.main-holder{
  margin-bottom:1em;
  height:87%;
  width:calc(96% - 1px);
  margin:auto
}
.main-home {
  width:100%
}

.pinned-half:nth-of-type(2) {
  border-left:1px solid black
}
h2{
  font-size: 16px
}
.line {
  font-size:14px;
  padding: 0px;
  overflow-y:auto;
  line-height:20px;
  top:22%;
  max-width: 100%
}
img {
  height:14px;
  width:auto
}
.icon {
 height:16px;
width:auto

}
.icon-small {
 height:14px;
width:auto

}
.pinned-shop > div{
  width:96%;
  margin:6px auto   
}
.one-list {
  height: 16em
}
.list-title > p{
  padding:9px;
  padding-left:0px;
  font-size: 14px
}
.list li, .list-shop li {
  height:50px
}
.notes-lists {
  width:96%;
  grid-template-columns: repeat(4, 1fr)
}
.note {
  width: 9em;
  height: 11em
}
span:before, span:after {
  top: 20%;
}
.createdon {
  padding:10px 0px
}
.check-holder {
padding: 15px 7px;

}
.pinned-empty{
  width:60%;
  margin-top:20%
}

}


/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {

.main-holder{
  margin-bottom:1em;
  height:98%;
  width:calc(98% - 1px);
  margin:auto
}
.main-home {
  width:100%
}
.pinned-half{
  overflow:auto
}
.pinned-half:nth-of-type(2) {
  border-left:1px solid black
}
h2{
  font-size: 12px;
  padding-top:3px
}
.line {
  font-size:10px;
  padding: 0px;
  overflow-y:auto;
  line-height:14px;
  top:25%;
  max-width: 100%
}
img {
  height:12px !important;
  width:auto !important
}
.pinned-shop > div{
  width:98%;
  margin:3px auto;
  grid-template-columns: repeat(1, 1fr)
}
.one-list {
  height: 9em
}

.list-title > p{
  padding:4px;
  padding-left:0px;
  font-size: 10px
}
.list li, .list-shop li {
  height:40px
}
.notes-lists {
  width:98%;
  grid-template-columns: repeat(4, 1fr)
}
.note {
  width: 7em;
  height: 8em
}
span:before, span:after {
  top: 15%;
}
.createdon {
  padding:10px 0px
}
.check-holder {
padding: 5px 7px;

}

h4{
  font-size: 10px
}
.date p{
  font-size:8px
}
.pinned-empty{
  width:60%;
  margin-top:6%;
  font-size: 16px
}
}
@media (max-width: 480px) {
.main-holder{
  margin-bottom:1em;
  height:93%;
  width:calc(99% - 1px);
  margin:auto
}
.main-home {
  width:100%
}
.pinned-half{
  overflow:auto
}

h2{
  font-size: 10px;
  padding-top:5px
}
.line {
  font-size:9px;
  padding:0px  0px;
  overflow-y:auto;
  line-height:12px;
  top:35%;
  max-width: 100%
}
img {
  height:12px !important;
  width:auto !important
}
.pinned-shop > div{
  width:98%;
  margin:3px auto;
  grid-template-columns: repeat(1, 1fr)
}
.one-list {
  height: 9em
}
.list-title > p{
  padding:4px;
  padding-left:0px;
  font-size: 10px
}
.list li, .list-shop li {
  height:40px
}
.notes-lists {
  width:98%;
  grid-template-columns: repeat(2, 1fr)
}
.note {
  width: 7em;
  height: 8em
}
span:before, span:after {
  top: 12%;
}
.createdon {
  display:none
}
.check-holder {
padding: 5px 7px;
}
.span-holder{
  padding-left:2px;
  overflow-y: auto
}
.icon-small{
  width:12px !important;
  height:auto !important
}
h4{
  font-size: 10px
}
.date p{
  font-size:8px
}
.pinned-empty{
  width:70%;
  margin-top:40%;
  font-size: 12px
}
}


    </style>


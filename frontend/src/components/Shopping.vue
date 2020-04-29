<template>

<div class="main-shop-holder">

   <div class="bird-container ">
		<div class="bird "></div>
	</div>

  <div class="bird-container bird-container-back">
		<div class="bird bird-back"></div>
	</div>

  <div class="main-shopping">
        <div class="shop-half first-half" >
            <div class="one-list" v-for="list in allShops" :key="list._id" >
              
                <ul v-bind:class="getList(list)" class="list" >
                     <div  v-on:click.prevent="selected(list)" class="list-title">

                        <img  class="icon icon-small" v-if="list.pinned===false" v-on:click="pinList(list)"  src="../assets/pin.png">
                        <img class="icon icon-small" src="../assets/unpin.png" v-if="list.pinned===true"  v-on:click="pinList(list)"> 
                         <p>{{allShops.indexOf(list)+1}}. {{list.name}}</p>
                        <img  class="icon " v-on:click="deleteList(list)"  src="../assets/cross.png">

                          
                      </div>
                    <li class="one-item" v-for="item in list.items" :key="item._id" >

                        <div  class="item-holder" >
                        
                            <div class="check-holder" v-on:click="checkItem(list, item)"> 
                              <img  v-bind:class="checkedFunction(item.crossed)" src="../assets/check.png">
                              </div> 
                            <div class="span-holder">
                                 <span v-bind:class="getCrossed(item)" class="line" >{{item.name}}</span>   
                            </div>
                        </div>  
                     </li>
    
                </ul>
            </div>
        </div>
        <div class="shop-half second-half">
            <div class="quarter" > 
                <h2> Create a new list:</h2>
            <input @keyup.enter="newShopList" v-model="addShopInput" name="add-shop" placeholder="Name your list" type='text'/> <br>
            <button v-on:click.prevent="newShopList">Create </button>
           
            </div>

            <div class="quarter add-items" >

            <div class="half-quarter" >
              <h3> Select the list:</h3>
              <div class="list-names">
                   <div  v-for="list in allShops" :key="list.id" >
                 <div v-on:click.prevent="selected(list)" class="list-name" v-bind:class="selectList(list.name)">
                       <span style="display:block"> {{allShops.indexOf(list)+1}}.{{list.name}}</span>

                 </div>
              </div>

              </div>
            

            </div>

            <div  class="half-quarter">
                <h3>Add items to it: </h3>
              <div style="display:flex">
                 <input @keyup.enter="newItem(selectedList)" v-model="addItemInput" name="add-shop" type='text'/> <br>
                    <button v-on:click.prevent="newItem(selectedList)">+ </button>
                </div> 
            </div>

            </div>

          <button class="empty-btn" v-on:click.prevent="cleanShopList(selectedList)"> Empty the chosen list </button>

            <div class="tips">  
              <span > <img src="../assets/pin.png"> Pins a list to the Home page.</span>
              <span ><img src="../assets/unpin.png"> Unpins a list from the Home page.</span>
              <span > <img src="../assets/cross.png"> Deletes a list</span>
            </div>
        </div>
    </div>

</div>

  
</template>

<script>

  import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Shopping',
             computed: {
          ...mapGetters(['allShops']),
          
        },
        
        data () {
            return {
                addShopInput: '',
                selectedList: {},
                addItemInput: ''
            }
        },

        created(){
          this.fetchShops()
        },
        updated() {
          this.fetchShops()
        
        },
             methods:{
            ...mapActions([ 'fetchShops', 'addShopList', 'pinShopList', 'updateShopList', 'removeShopList']),
            
            newShopList: function(){
                let payload = {
               name: this.addShopInput,
              pinned: false,
              items: []

            };
              this.$store.dispatch("addShopList", payload);
            this.addShopInput = '';
              },

              newItem: function(list) {
                list.items.push({name: this.addItemInput, crossed: false});
                this.$store.dispatch('updateShopList', list);
                this.addItemInput = ''
            
              },
              selected: function (list) {
                this.selectedList = list
              },
                selectList: function(name) {
              return {
                "selected-list": name==this.selectedList.name,
              }
            },

              deleteList: function (list) {
                    let payload = {
                      _id:list._id,
                      name: list.name,
                      pinned: list.pinned,
                      items: list.items
                    };
              this.$store.dispatch("removeShopList", payload);

              },

              checkedFunction: function(crossed) {
              return {'bought': crossed,
                      'tobuy': !crossed
            }},

               getCrossed: function(item) {
              return {
                "crossed": item.crossed && item.name.length < 40,
                "crossed-decoration": item.cross && item.name.length >  39
              }
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

            cleanShopList: function(list) {

              list.items = []
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

            getList: function(list) {
              return {
                "chosen": list.name==this.selectedList.name,
                "not-chosen": list.name==!this.selectedList.name
              }
            }
             }
    }
</script>

<style scoped>
::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}

.main-shop-holder{
  
  overflow: hidden;
  height:80%;
  display: flex;
  position:relative;
  margin-bottom:2%;
}
   .main-shopping {
      width:94%;
      margin: 0 auto;
      border-left: 2px solid #2c3e50;
      border-right: 2px solid #2c3e50;
      border-bottom: 2px solid #2c3e50;
      border-collapse: collapse;
      /* height:80%;
      margin-bottom:3%; */
      position: relative;
      z-index: 12;
      display: flex;
    }
    .shop-half {
        width: 50%;
        height: 100%;
        display: block;
        overflow: auto;
    }
    .second-half {
        display: flex;
        flex-direction: column;
        border-left:2px solid black
    }
    .quarter {
        width: 100%;
        height:50%;
    }

    .quarter:nth-of-type(1) {
        border-bottom: 2px solid black
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
  padding: 35px;
   transition: 0.4s;
   border:2px solid black
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
.first-half {
    display:grid;
    margin: 5px auto 0px auto;
    overflow-y:auto;
    grid-template-columns: 2fr  2fr;
    grid-template-rows: auto auto auto auto;
}

h2{
  margin-top: 2%
}

.list {
  color: #555;
  font-size: 22px;
  padding: 0 !important;
  margin: 3% auto;
  width: 85%;
  max-height: 95%;
  border: 1px solid #dedede;
  overflow-y: scroll;
  position: relative;
  -moz-transition:-moz-transform .15s linear;
  -o-transition:-o-transform .15s linear;
  -webkit-transition:-webkit-transform .15s linear;
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
  display: inline-block;
position: relative;
transition: all 0.5s cubic-bezier(.55, 0, .1, 1);
padding:14px;
text-transform: capitalize;
}
.icon{
  /* opacity: 0; */
  transition: all 0.2s linear;
  width: 40px !important;
  height: 40px;
  margin: auto;
  transition: all 0.15s linear
}
.icon:hover {
-webkit-transform: scale(1.3)
}

.item-holder {
  width: 100%;
  display: flex;
  height: fit-content;
}

.one-list {
    height: 330px;  
    padding: 20px auto
}

.list-title > p {
    padding: 15px;
    background: white;
    cursor: pointer;
    width: 95%;
text-transform: capitalize;
}
.add-items {
  display: flex;
  width: 100%;
}
.half-quarter {
  width: 47%;
  overflow-y:auto
}
.half-quarter input {
  width: 70%;
  margin: auto
}
.half-quarter button {
  width: 40px;
  height:40px
}
.list-name {
  margin: 5%;
  padding: 14px;
  cursor: pointer
}
.selected-list{
  border: 1px solid black
}
.list-title {
display: flex;
border-bottom:1px solid red;
background: white
}

.bought{
opacity: 1
}
.tobuy{
opacity: 0
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

.list-name span {
text-transform: capitalize;

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

.chosen {

   -moz-box-shadow:10px 10px 7px rgba(0,0,0,.5);
  -webkit-box-shadow: 10px 10px 7px rgba(0,0,0,.5);
  box-shadow:10px 10px 7px rgba(0,0,0,.5);
  -webkit-transform: scale(1.05);
  -moz-transform: scale(1.05);
  -o-transform: scale(1.05);
  position:relative;
  z-index:5;
    -webkit-transform:rotate(-3deg);
  -o-transform:rotate(-3deg);
  -moz-transform:rotate(-3deg)

}
h3{
  margin-top:20px
}

.list-names{
    display:grid;
  width: 80%;
  margin: 30px auto;
  grid-template-columns: repeat(2, 1fr);
  overflow-y:auto
}

.empty-btn{
  position:absolute;
  bottom:30px;
  left:50%;
  right:0;
  margin:auto;
  width: 200px;
  padding:18px
}
.icon-small {
  width: 27px! important;
  height:27px !important;
  margin-left: 10px
}

.tips{
  position: absolute;
  bottom:0.5em;
  left:0.5em;
  font-size: 10px;
  display: grid;
  text-align: left
}
.tips img {
  width:12px;
  height:12px;
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
	top: 70%;
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
  top: 20%;
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

  .main-shop-holder {
    height:86%
  }
  .main-shopping {
    width:calc(96% - 1px);
    /* height:84vh */
  }
  h2 {
    font-size: 18px
  }
  h3 {
    font-size: 14px
  }
  .list-names {
    width:70%;
    grid-template-columns: repeat(1, 1fr);
  }
  .list-name {
    font-size:14px;
    padding:4px
  }
  .empty-btn {
    font-size: 14px;
    width:11%;
    padding: 8px 0px
  }

  .list-title p{
    font-size: 12px
  }

  img{
    width:20px !important;
    height: auto !important;
  }
 
  .icon {
    width:26px !important;
    height: auto !important
  }
   .icon-small {
    width:18px !important;
    height:auto !important
  }
  .span-holder {
    padding-left:9px;
  }

  .list li{
    font-size: 14px;
    line-height: 14px;
  }
  .line {
    top:20%
  }
  span:before, span:after {

  top: 40%;
}
.tips{
  display: none
}

}


/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {

  .main-shop-holder {
    height:87%
  }
  .main-shopping {
    width:calc(96% - 1px);
  }
  button {
    padding: 15px;
    width:40%
  }
  .half-quarter button {
    width:40px;
    height:40px;
    padding:10px
  }
  h2 {
    font-size: 18px;
    margin-top:5%
  }
  h3 {
    font-size: 14px
  }
  .list-names {
    width:70%;
    grid-template-columns: repeat(1, 1fr);
  }
  .list-name {
    font-size:14px;
    padding:4px
  }
  .empty-btn {
    font-size: 16px;
    width:18%;
    padding: 8px 0px
  }

  .list-title p{
    font-size: 12px
  }

  img{
    width:20px !important;
    height: auto !important;
  }
 
  .icon {
    width:26px !important;
    height: auto !important
  }
   .icon-small {
    width:18px !important;
    height:auto !important
  }
  .span-holder {
    padding-left:9px;
  }

  .list li{
    font-size: 14px;
    line-height: 14px;
  }
  .line {
    top:20%
  }
  span:before, span:after {

  top: 40%;
}
.tips{
  display: none
}

.first-half {
      grid-template-columns: 1fr;
      overflow: auto;
      height:96%
}

.one-list{
  max-height: 300px
}
}


/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {

  .main-shop-holder {
    height:82%
  }
  .main-shopping {
    width:calc(98% - 1px);
  }
  button {
    padding: 5px;
    margin-top: 5px;
    font-size: 14px;
    width:40%
  }
  .half-quarter button {
    width:30px;
    height:30px;
    padding:7px
  }
  h2 {
    font-size: 14px;
    margin-top:5%
  }
  h3 {
    font-size: 10px
  }
  .list-names {
    width:90%;
    grid-template-columns: repeat(1, 1fr);
  }
  .list-name {
    font-size:10px;
    padding:4px
  }
  .empty-btn {
    font-size: 12px;
    position: absolute;
    bottom:2px;
    right:2px;
    width:15%;
    padding: 4px 0px
  }

  .list-title p{
    font-size: 12px
  }

  img{
    width:18px !important;
    height: auto !important;
  }
 
  .icon {
    width:23px !important;
    height: auto !important
  }
   .icon-small {
    width:15px !important;
    height:auto !important
  }
  .span-holder {
    padding-left:5px;
  }

  .list li{
    font-size: 14px;
    line-height: 10px;
  }
  .line {
    top:20%
  }
  span:before, span:after {

  top: 40%;
}
.tips{
  display: none
}

.first-half {
      grid-template-columns: 1fr;
      overflow: auto;
      height:96%
}

.one-list{
  max-height: 300px
}
input[type=text]::-webkit-input-placeholder {
  font-size:14px
}
input[type=text]:nth-last-of-type(1) {
  padding:20px !important;
  width:80%;
  margin-top:5px
}


}
@media (max-width: 480px) {
.main-shop-holder {
    height:92%
  }
  .main-shopping {
    width:calc(99% - 1px);
    display: flex;
    flex-direction: column;
    width:100%
  }
  .shop-half {
    width:100%;
  }
  .shop-half:nth-of-type(1) {
    border-bottom: 2px solid black
  }
   .shop-half:nth-of-type(2) {
    border-left: none
  }
  button {
    padding: 5px;
    margin-top: 5px;
    font-size: 14px;
    width:40%
  }
  .half-quarter button {
    width:30px;
    height:30px;
    padding:7px
  }
  h2 {
    font-size: 14px;
    margin-top:5%
  }
  h3 {
    font-size: 10px
  }
  .list-names {
    width:90%;
    grid-template-columns: repeat(1, 1fr);
  }
  .list-name {
    font-size:10px;
    padding:4px
  }
  .empty-btn {
    font-size: 12px;
    position: absolute;
    bottom:2px;
    right: 15%;
    width:30%;
    padding: 4px 0px
  }

  .list-title p{
    font-size: 12px
  }

  img{
    width:18px !important;
    height: auto !important;
  }
 
  .icon {
    width:23px !important;
    height: auto !important
  }
   .icon-small {
    width:15px !important;
    height:auto !important
  }
  .span-holder {
    padding-left:5px;
  }

  .list li{
    font-size: 14px;
    line-height: 10px;
  }
  .line {
    top:20%
  }
  span:before, span:after {

  top: 40%;
}
.tips{
  display: none
}

.first-half {
      grid-template-columns: 1fr;
      overflow: auto;
      height:96%
}

.one-list{
  max-height: 300px
}
input[type=text]::-webkit-input-placeholder {
  font-size:14px
}
input[type=text]:nth-last-of-type(1) {
  padding:20px !important;
  width:80%;
  margin-top:5px
}

}
    </style>
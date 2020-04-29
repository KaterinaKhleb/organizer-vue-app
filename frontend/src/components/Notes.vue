<template>

<div class="main-notes-holder">

  <div class="bird-container ">
		<div class="bird "></div>
	</div>


 <div  class="main-notes">
        <div  class="form-holder">
            <h2>Add a note to yourself and choose a color:</h2>

            <form method="post" name="notes-form"  action="" v-on:submit.prevent="newNote"  >
                <input placeholder="" v-model="addNoteInput" name="add-note" type='text'/>
                            <br>

                  <div class="check-holder"> 
                  <input type="radio" id="yellow" v-model="addNoteColor"  name="color" value="yellow">
                  <label for="yellow"> Yellow</label>
                  <input type="radio" id="green" v-model="addNoteColor"  name="color" value="green">
                  <label for="green"> Green</label>
                  <input type="radio" id="pink" v-model="addNoteColor"  name="color" value="pink">
                  <label for="pink"> Pink</label>
                  <input type="radio" id="blue" v-model="addNoteColor"  name="color" value="blue">
                  <label for="blue"> Blue</label>
                            </div>


                <button  type="submit"> Add </button>
            </form>

          
            
        </div>
        <div>

        <div class="notes-lists" >
        
            <div  v-for="note in allNotes" :key="note._id">
              <div  v-bind:class="note.color" class="note">
                <button v-if="note.pinned===false" v-on:click="pinNote(note)"  > 
                  <img src="../assets/pin.png">
                   <!-- <span class="mouseover-span" >Pin to "Home"</span> -->
                </button>
                 <button v-if="note.pinned===true"  v-on:click="pinNote(note)" > 
                  <img src="../assets/unpin.png">
                   <!-- <span class="mouseover-span">Unpin from "Home"</span> -->
                </button>
                <h2>
                  Note #{{allNotes.indexOf(note)+1}}
                </h2>
                <h4 >{{note.name}}</h4>
                  <img class="img-cross" v-on:click="removeNote(note)" src="../assets/cross.png">

                  <div class="date">
                    <p>Created on {{getDate(note.createdAt)}}</p>
                  </div>
              </div>
            </div>
     
        </div>


        </div>

            <div class="tips">  
              <span > <img src="../assets/pin.png"> Pins a note to the Home page.</span>
              <span ><img src="../assets/unpin.png"> Unpins a note from the Home page.</span>
              <span > <img src="../assets/cross.png"> Deletes a note</span>
            </div>
    </div>

</div>

   
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

    export default {
        name: 'Notes',
        computed: mapGetters(['allNotes']),
        data () {
            return {
                msg: '',
                addNoteInput:"",
                addNoteColor:'',
                
            }
        },
        created(){
          this.fetchNotes()
        },
        updated() {
          this.fetchNotes()
        
        },
          methods:{
            ...mapActions(['fetchNotes', 'addNote', 'editNote']),
           removeNote: function (note) {
             let payload = {
               _id:note._id,
               name: note.name,
              color: note.color
            };
              this.$store.dispatch("removeNote", payload);

              },
              newNote: function(){
                let payload = {
               name: this.addNoteInput,
              color: this.addNoteColor,
              pinned: false
            };
              this.$store.dispatch("addNote", payload);
    
            this.addNoteInput = '';
            this.addNoteColor ="";
              },

          findColor: function (color) {
              return {
                'red': color=="red",
                'green': color == "green",
                "pink": color == "pink",
                "blue": color == "blue"
              }
            },

            pinNote: function(note) {
              if(note.pinned==true) {
                note.pinned = false
              } else {
                note.pinned=true
              }
              this.$store.dispatch("editNote", note);

            },
            getDate: function(date) {
              let datevar = new Date(date);
              let day = datevar.getUTCDate();
              let month = datevar.getUTCMonth();
              return `${day}.${month}`
            }
              
        },
           
    }
</script>

<style scoped>

.main-notes-holder {
    overflow: hidden;
  height:80%;
  display: flex;
  position:relative;
}
   .main-notes {
        width:94%;
        margin: 0 auto !important;
        border-left: 2px solid black;
        border-right: 2px solid black;
        border-bottom: 2px solid black;
        border-collapse: collapse;
        /* height:80%; */
        position: relative;
        z-index: 13 !important;
        overflow: scroll

    }
    .form-holder{
      display: flex;
      flex-direction: column
    }
    .form-holder h2{
      margin-top: 2%
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
   margin-top:1%;
   font-size: 26px
  }

input:focus{
  padding: 40px;
   transition: 0.4s;
   border:2px solid black
   }

.check-holder {
  display: flex;
  width: 50%;
  margin: 30px auto
}
[type="radio"]:checked,
[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label
{
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: black;
    margin:auto;
    padding-bottom:5px;
    
}
#pink + label {
    border-bottom: 2px solid #ffccff
}
#green + label {
border-bottom: 2px solid #cfc
}

#yellow + label {
  border-bottom: 2px solid #feffcc
}
#blue + label{
  border-bottom: 2px solid #ccecff
}
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
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
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

[type="radio"]:not(:checked) + label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}
[type="radio"]:checked + label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}

button {
  background: none;
  padding: 7px;
  font-family: 'Space Mono', monospace;
  font-size: 20px;
  width: 10%;
  margin: 10px auto;
  border: 2px solid black;
  /* text-transform: uppercase; */
	transition: all 300ms cubic-bezier(0.77, 0, 0.175, 1);	
	cursor: pointer;
	user-select: none;
  outline: none
}

button:hover{
  background: black;
  color:lightgray
}
.notes-lists {
  display:grid;
  width: 80%;
  margin: 30px auto 0px auto;
  grid-template-columns: repeat(6, 1fr);
  
}
::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
}
.note {
text-decoration:none;
  color:#000;
  background:#ffc;
  display:block;
  height:15em;
  width:13em;
  padding: 2em 1em;
  margin: 1em;
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
  display:flex
}
.note button span {
  text-align:left
}
.note button:hover {
  color:black
}
.note button img {
  width:20px;
  position: relative;
  height:auto;
  margin: 0px 3px 0px 5px
}
.note button:hover > .mouseover-span {
opacity: 1;
}
.img-cross {
  position: absolute;
  top:2%;
  right:2%;
  width:30px;
  height:auto;
  transition: all 300ms linear
}
img:hover{
  transform: rotate(8deg) scale(1.1)
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
.mouseover-span{
  opacity: 0;
}
.tips{
  position: fixed;
  bottom:5em;
  right:6em;
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
	top: 30%;
	left: -10%;
	animation-delay: 0s;

}



/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px)  { 
.main-notes-holder{
  width:calc(96% - 1px);
  margin: auto;
  height:85vh
}
.main-notes{
  width:100%
}
.notes-lists{
  width:90%;
  grid-template-columns: repeat(4, 1fr);
}
.note {
  height:13em;
  width:11em
}
}


/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {

.main-notes-holder{
  width:calc(96% - 1px);
  margin: auto;
  height:87vh
}
.main-notes{
  width:100%
}
.notes-lists{
  width:90%;
  grid-template-columns: repeat(3, 1fr);
}
.note {
  height:13em;
  width:11em
}

}


/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {

.main-notes-holder{
  width:calc(98% - 1px);
  margin: auto;
  height:84vh
}
.main-notes{
  width:100%
}
h2{
  font-size: 16px;
}
input[type=text] {
  padding:18px !important;
}
input:focus{
  padding: 25px
}
.check-holder{
  width:80%
}
.notes-lists{
  width:90%;
  grid-template-columns: repeat(3, 1fr);
}
.note {
  height:10em;
  width:8em
}
button {
  width: 25%;
  padding:3px
}
.tips{
  display: none
}
h4{
  font-size: 10px
}
.date p{
  font-size:10px
}

}
@media (max-width: 480px) {
.main-notes-holder{
  width:calc(99% - 1px);
  margin: auto;
  height:92vh
}
.main-notes{
  width:100%
}
.note h2{
  font-size: 14px
}
.form-holder h2{
  font-size: 14px;
  width:60%;
  margin-top:5%;
  margin:5% auto
}
input {
  padding:18px
}
input:focus{
  padding: 25px;
}
.check-holder{
  width:90%
}
label {
  font-size: 12px
}
.notes-lists{
  width:90%;
  grid-template-columns: repeat(2, 1fr);
}
.note {
  height:9.5em;
  width:7.5em
}
button {
  width: 25%;
  padding:3px
}
.tips{
  display: none
}
h4{
  font-size: 10px
}
.date p{
  font-size:9px;
  padding:2px 0px !important
}
.date{
  left:10px;
  bottom:8px
}
img {
  width:18px !important;
  height: auto !important
}
}

    </style>
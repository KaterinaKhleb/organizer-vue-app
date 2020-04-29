<template>
  <div class="main-nav">
    <a v-bind:class="classAktiv('/home')" class="link" v-on:click="navigate('Home')" > Home</a>
    <a v-bind:class="classAktiv('/todo')"  class="link" v-on:click="navigate('Todo')" > Todo list</a>
    <a v-bind:class="classAktiv('/shopping')"  class="link" v-on:click="navigate('Shopping')" > Shopping list</a>
    <a  v-bind:class="classAktiv('/notes')"  class="link" v-on:click="navigate('Notes')" > Notes</a>

  </div>
  
</template>

<script>


import router from '../router'


export default {
  name: 'Navigation',
 data: function () {
    return {
      clicked: ""
    }
  },
 
     methods: {
            navigate(page) {
                this.clicked = page.toLowerCase()
                router.push({ name: page});
            },
              classAktiv: function (item) {
            return {
              "aktiv": this.$route.path == item

    }
  }
        },

}
</script>

<style>
.main-nav {
  display: inline-table;
  justify-content:space-evenly;
  z-index:10 !important;
  table-layout: fixed;
  position: relative;
  margin: 2.8em auto 0em auto;
  width:94%;
  border-collapse: collapse;

}
.link {
    padding: 30px 0px;
  font-family: 'Space Mono', monospace;
    font-size: 18px;
    border: 2px solid black;
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    border-collapse: collapse;
    display: table-cell;
    width: 25%;
    cursor: pointer
}
.aktiv{
  background: black;
  color: lightgray;
}


/* Tablet horiz to desktop
===============================*/
@media (min-width: 1024px) and (max-width: 1280px)  { 
.main-nav {
  width:96%;
  margin: 1.5em auto 0em auto
}

.link {
  font-size: 16px;
  padding: 20px 0px 
}

}


/* Horiz Tablet to vertical
===============================*/
@media (min-width: 768px) and (max-width: 1023px) {
.main-nav {
  width:96%;
  margin: 1.5em auto 0em auto
}

}


/* Mobile to Tablet Portrait
===============================*/
@media (min-width: 480px) and (max-width: 767px) {

.main-nav {
  width:98%;
  margin: 0.5em auto 0em auto
}
.link {
  font-size: 12px;
  padding: 10px 0px 
}

}
@media (max-width: 480px) {
.main-nav {
  width:99%;
  margin: 0.5em auto 0em auto
}
.link {
  font-size: 10px;
  padding: 6px 0px 
}
}

</style>

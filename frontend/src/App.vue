<template>
  <div id="app">
    <Enter v-if="this.$route.path == '/'" />
  <Navigation />
  <router-view></router-view>
  </div>
  
</template>

<script>
import Enter from './components/Enter.vue'
import Navigation from './components/Navigation.vue'
// import router from './router'


export default {
  name: 'App',
  components: {
    Enter,
    Navigation
  },
      
}
</script>

<style>
#app {
  font-family: 'Space Mono', monospace;
  text-align: center;
  color: black;
  height: 100vh;
  background:	#F3F3F3;
  overflow: hidden;
}
#app:after {
  animation: grain 8s steps(10) infinite;
  background-image: url(./assets/grain1.jpg);
  content: "";
  height: 300%;
  left: -50%;
  opacity: 0.1;
  position: fixed;
  top: -110%;
  width: 300%;
  z-index: 1
}



@keyframes grain {
  0%, 100% { transform:translate(0, 0) }
  10% { transform:translate(-5%, -10%) }
  20% { transform:translate(-15%, 5%) }
  30% { transform:translate(7%, -25%) }
  40% { transform:translate(-5%, 25%) }
  50% { transform:translate(-15%, 10%) }
  60% { transform:translate(15%, 0%) }
  70% { transform:translate(0%, 15%) }
  80% { transform:translate(3%, 35%) }
  90% { transform:translate(-10%, 10%) }
}





@keyframes fly-cycle {
	
	100% {
		background-position: -900px 0;
	}
	
}


@keyframes fly-left-one {
	
	0% {
		transform: translateY(-2vh) translateX(110vw) scale(0.5);
	}
	
	10% {
		transform: translateY(0vh) translateX(90vw) scale(0.4);
	}
	
	20% {
		transform: translateY(-4vh) translateX(70vw) scale(0.6);
	}
	
	30% {
		transform: translateY(1vh) translateX(50vw) scale(0.45);
	}
	
	40% {
		transform: translateY(-2.5vh) translateX(30vw) scale(0.5);
	}
	
	50% {
		transform: translateY(0vh) translateX(10vw) scale(0.45);
	}
	
	60% {
		transform: translateY(0vh) translateX(-10vw) scale(0.45);
	}
	
	100% {
		transform: translateY(0vh) translateX(-10vw) scale(0.45);
	}
}

@keyframes fly-right-one {
	
	0% {
		transform: scale(0.3) translateX(-10vw);
	}
	
	10% {
		transform: translateY(2vh) translateX(10vw) scale(0.4);
	}
	
	20% {
		transform: translateY(0vh) translateX(30vw) scale(0.5);
	}
	
	30% {
		transform: translateY(4vh) translateX(50vw) scale(0.6);
	}
	
	40% {
		transform: translateY(2vh) translateX(70vw) scale(0.6);
	}
	
	50% {
		transform: translateY(0vh) translateX(90vw) scale(0.6);
	}
	
	60% {
		transform: translateY(0vh) translateX(110vw) scale(0.6);
	}
	
	100% {
		transform: translateY(0vh) translateX(110vw) scale(0.6);
	}
	
}

</style>

<template>
  <div class="frame-bg">
		<img class="bg-color album-artwork" src="../assets/bg-img.png"/>
		<img class="bg-black album-artwork" src="../assets/bg-img.png"/>
	</div>	
</template>
<script>
export default {
  
}
</script>
<style lang="scss">
  //-----Background
	.frame-bg{
		position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: 0; z-index: -1; overflow: hidden;
		.bg-color,
		.bg-black{
			width: 200%; position: absolute; border-radius: 100em;
			animation: rotate 35s linear infinite;
		}
		.bg-color{
			right: 0; top: 0; filter: blur(30px); z-index: 10; mix-blend-mode: luminosity;
		}
		.bg-black{
			left: 0; bottom: 0; filter: blur(30px); z-index: 1;
			animation-direction: reverse; animation-delay: 10s;
		}
	}

@keyframes rotate{
	0% {transform: rotate(0deg);}
	100% {transform: rotate(360deg);}
}
</style>
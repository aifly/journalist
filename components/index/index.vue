<template>
	<div @touchmove='touchmove($event)' @touchend='touchend($event)' class="zmiti-index-main-ui lt-full" >
		<div class="zmiti-index-title">
			<img :src="imgs.title" alt="">
		</div>
			
		<div class="zmiti-index-camera">
			<img :src='imgs.camera1' class="zmiti-camera-top" />
			<img :src='imgs.camera'/>

			<div :style="{WebkitTransform:'rotate('+rotation+'deg)'}" @touchend='touchend($event)' @touchstart='touchstart($event)' class="zmiti-wheel">
				<img :src='imgs.wheel'/>
			</div>
		</div>		

		<div class="zmiti-index-bottom">
			<img :src='imgs.bottom'/>
		</div>
		<audio  ref='wheel' :src='wheelMusic'></audio>
	</div>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				progress:0,
				imgs,
				loaded:false,//资源是否加载完成
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				canMove:false,//默认不能移动
				rotation:0,
				i:0,
				wheelMusic:'./assets/music/wheel.mp3',
				direction:-1,//方向 0:水平，1垂直
				
			}
		},
		methods:{
			touchstart(e){

				this.canMove = true;
				var e = e.changedTouches[0];
				this.startX = e.clientX;
				this.startY = e.clientY;
			},	
			touchmove(e){
				if(!this.canMove){return};
				var e = e.changedTouches[0];
				this.endX = e.clientX;
				this.endY = e.clientY;
				
				if(this.i === 0){
					this.i++;
					var disX = Math.abs(this.startX - this.endX);
					var disY = Math.abs(this.startY - this.endY);
					if(disX>disY){
						this.direction = 0;
					}else{
						this.direction = 1;
					}
				}
				var disX1 = this.endX-this.startX ;
				var disY1 = this.endY-this.startY;
				if(this.direction===1){//垂直
					this.rotation+=disY1/10|0;

				}else{//水平
					this.rotation+=disX1/10|0;
				}

				this.wheelAduio.play();
				this.rotation%=360;


				/*this.startX = this.endX;
				this.startY = this.endY*/



			},
			touchend(e){
				this.canMove = false;
				this.i = 0
			}
		},
		mounted(){
			this.wheelAduio = this.$refs['wheel']
		}
	}
</script>
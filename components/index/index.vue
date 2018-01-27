<template>
	<div :class="{'scale':isSure,'show':show}" @touchmove='touchmove($event)' @touchend='touchend($event)' class="zmiti-index-main-ui lt-full" >
		<div class="zmiti-index-title">
			<img :src="imgs.title" alt="">
		</div>
			
		<div class="zmiti-index-camera">
			<img :src='imgs.camera1' class="zmiti-camera-top" />
			<img :src='imgs.camera'/>

			<div v-tap='entryDetail' v-if='i===index' v-for='(detail,i) in detailList' class="zmiti-camera-img" :style="detailList[index].indexStyle">
				
			</div>

			<div :style="{WebkitTransform:'rotate('+rotation+'deg)'}" @touchend='touchend($event)' @touchstart='touchstart($event)' class="zmiti-wheel">
				<img :src='imgs.wheel'/>
			</div>

			<div v-tap='entryDetail' class="zmiti-sure">
				<img :src="imgs.sure" alt="">
			</div>

			<div class="zmiti-img-C1">
				<div class="zmiti-img" @touchstart='setJIndex(0)'>
					<img v-if='index === 0' :src="imgs.imgBg1" class='zmiti-img-bg' alt="">
					<img v-if='index !== 0' :src="imgs.imgBg" class='zmiti-img-bg' alt="">
					<img :src='imgs.img1'/>
				</div>

				<div class="zmiti-img" @touchstart='setJIndex(1)'>
					<img v-if='index === 1' :src="imgs.imgBg1" class='zmiti-img-bg' alt="">
					<img v-if='index !== 1' :src="imgs.imgBg" class='zmiti-img-bg' alt="">
					<img :src='imgs.img2'/>
				</div>
				<div class="zmiti-img" @touchstart='setJIndex(2)'>
					<img v-if='index === 2' :src="imgs.imgBg1" class='zmiti-img-bg' alt="">
					<img v-if='index !== 2' :src="imgs.imgBg" class='zmiti-img-bg' alt="">
					<img :src='imgs.img3'/>
				</div>
			</div>
			<div class="zmiti-img-C2">
				
				<div class="zmiti-img" @touchstart='setJIndex(6)'>
					<img v-if='index === 6' :src="imgs.imgBg1" class='zmiti-img-bg' alt="">
					<img v-if='index !== 6' :src="imgs.imgBg" class='zmiti-img-bg' alt="">
					<img :src='imgs.img7'/>
				</div>	
				<div class="zmiti-img" @touchstart='setJIndex(5)'>
					<img v-if='index === 5' :src="imgs.imgBg1" class='zmiti-img-bg' alt="">
					<img v-if='index !== 5' :src="imgs.imgBg" class='zmiti-img-bg' alt="">
					<img :src='imgs.img6'/>
				</div>
				<div class="zmiti-img" @touchstart='setJIndex(4)'>
					<img v-if='index === 4' :src="imgs.imgBg1" class='zmiti-img-bg' alt="">
					<img v-if='index !== 4' :src="imgs.imgBg" class='zmiti-img-bg' alt="">
					<img :src='imgs.img5'/>
				</div>
				<div class="zmiti-img" @touchstart='setJIndex(3)'>
					<img v-if='index === 3' :src="imgs.imgBg1" class='zmiti-img-bg' alt="">
					<img v-if='index !== 3' :src="imgs.imgBg" class='zmiti-img-bg' alt="">
					<img :src='imgs.img4'/>
				</div>
			</div>
			
		</div>		

		<div class="zmiti-index-bottom">
			<img :src='imgs.bottom'/>
		</div>
		<audio  ref='wheel' :src='wheelMusic'></audio>
		<audio  ref='change' :src='changeMusic'></audio>

	</div>
</template>

<script>
	import './index.css';
	import imgs from '../lib/assets.js';
	import detailList from '../lib/data.js';
	import zmitiUtil from '../lib/util'
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				progress:0,
				imgs,
				detailList,
				show:false,
				loaded:false,//资源是否加载完成
				viewW:window.innerWidth,
				viewH:window.innerHeight,
				canMove:false,//默认不能移动
				rotation:0,
				i:0,
				index:0,
				lastX:0,
				lastY:0,
				lastIndex:0,
				isSure:false,
				wheelMusic:'./assets/music/wheel.mp3',
				changeMusic:'./assets/music/change.mp3',
				direction:-1,//方向 0:水平，1垂直
				
			}
		},
		methods:{

			autoChange(){
				this.timer = setInterval(()=>{
					if(this.index > 5){
						this.index = 0;
					}
					else{
						this.index += 1;
					}

					this.rotation = 360/7*this.index;

					this.$refs['change'].play();

				},3000);
			},

			setJIndex(index){

				this.rotation = 360/7*index;
				this.index = index;

				this.$refs['change'].play();
			},
			entryDetail(){
				this.isSure = true;
				clearInterval(this.timer);
				var {obserable} = this;
				obserable.trigger({
					type:'togglePage',
					data:true
				})
			},
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
				
				var disX = this.startX - this.endX;
				var disY = this.startY - this.endY;
				if(this.i === 0){
					this.i++;
					if(Math.abs(disX)>Math.abs(disY)){
						this.direction = 0;
					}else{
						this.direction = 1;
					}
				}
				if(this.direction===1){//垂直
					this.rotation+=-disY/10|0;

				}else{//水平
					this.rotation+=disX/10|0;
				}

				this.wheelAduio.play();
				this.rotation%=360;

				///console.log(this.rotation/(360/7)|0);

				var index = (this.rotation/(360/7))|0;
				if(index <0){
					index = 7+index;
				}
				this.index = index;

				if(this.index !== this.lastIndex){
					
					this.$refs['change'].play();
				}



				this.lastIndex = index;


				/*this.startX = this.endX;
				this.startY = this.endY*/



			},
			touchend(e){
				this.canMove = false;
				this.i = 0
			}
		},
		mounted(){

			this.wheelAduio = this.$refs['wheel'];

			this.autoChange();

			var {obserable} = this;

			obserable.on('getIndex',()=>{
				return this.index;
			});

			obserable.on('showIndex',()=>{
				this.isSure = false;
				this.autoChange();
			})

			zmitiUtil.wxConfig(document.title,document.title);

			setTimeout(()=>{
				this.show = true;
			},100)
		}
	}
</script>
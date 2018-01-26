<template>
	<div class="zmiti-page1-main-ui lt-full" ref='page'>
		<section>
			<div class="zmiti-video-main-ui">
				<img :src="imgs.j1" />
				<div class="zmiti-video-C">
					<div v-if='!play' @touchstart='playVideo' :style='{background:"url("+imgs.hhhPoster+") no-repeat center center ",backgroundSize:"cover"}'></div>
					<video @ended='ended' @puase='play=false' @touchstart='pauseVideo' @play='play=true' ref='video' src='./assets/video/hhh.mp4'></video>
				</div>
			</div>
			<div class="zmiti-item ">
				<img :src='imgs.microphone' class="zmiti-microphone" />
				<div class="zmiti-j-content">
					<h2>身体和灵魂，同在路上</h2>
					<div class="zmiti-j-sub-title">----新疆分社记者 胡虎虎</div>
					<div class="zmiti-j-text">
						这一年间，我参与到新华社客户端“现场新闻”共16场。繁华的城市、边远的乡村、浩瀚的沙海、茫茫的雪原，我随同分社同事一道，足迹遍布天山南北，用多媒体融合报道的形式，将“大美新疆”呈现给受众。有人告诉我，在新疆做摄影记者是幸福的，这片约占我国国土陆地面积1/6的土地上，我用镜头记录了新疆发生的变化，也感受了浓郁的民族风情和炙热的情感。
					</div>
				</div>
				<img class="zmiti-bg" :src="imgs.jbg1" />
			</div>
			<div class="zmiti-item zmiti-item2">
				<div class="zmiti-j-content">
					<div class="zmiti-j-text">
						“直击春运——2017回家路上有我陪伴”，是我2017年参与的第一场“现场新闻”。除夕前一天那趟由乌鲁木齐开往克拉玛依的城际列车上，乘务员们为旅客们准备了别开生面的“春晚”，歌舞、快板、游戏，行驶在戈壁滩上的列车传出阵阵欢声笑语。当乘务员们集体表演的《常回家看看》响起，我分明看到了她们眼中的泪花，而我，何尝不是呢；透过贴在列车玻璃上的“福”字窗花向外望去，雪花飞舞，茫茫戈壁已被大雪覆盖。毋庸赘言，这是一种最普通最深沉的情感共鸣——团圆。这是我在外过的第一个春节，每每念及至此，我都感激万分，记者这份工作给了我体验人生百态的机会，同时也教会我，只有拉近心与心的距离，才能挖掘出打动人心的故事。
					</div>
				</div>
				<img class="" :src="imgs.jbg21" />
				<img class="zmiti-bg2" :src="imgs.jbg2" />
				<img class="" :src="imgs.jbg22" />
			</div>
			<div class="zmiti-item">
				<img :src='imgs.hhh' />
			</div>

			<div class="zmiti-item zmiti-item4">
				<div class="zmiti-j-content">
					<div class="zmiti-j-text">
						边境高原牧业点、赛里木湖畔的转场服务站、葡萄沟里的民居、精河地震震中的村委会，都留下了我和同事们夜宿采访的身影。时常在想，这是我初做记者时的风发意气，更应当是我成熟练达后的常态。专注和热情，这不是两个简单的词语，身体力行，何其难也！
					</div>
				</div>
				<img :src='imgs.jbg3' class="zmiti-bg" />
				<img :src="imgs.camera2" class="zmiti-camera2" alt="">
			</div>

			<div class="zmiti-item zmiti-item5">
				<div class="zmiti-j-content">
					<div class="zmiti-j-text">
						<div>
							“天空之眼瞰祖国”的第15、16站是我2017年参与的“现场新闻”系列的岁末“收官战”。从脚本写作到内容采集，我个人收获良多。在“飞阅帕米尔高原”时，为近距离拍摄慕士塔格冰川，我们在牧民的引导下，通过摩托车和徒步，最终来到了海拔近5000米的冰川前。满身的器材给高原徒步带来极大负担，在穿越冰封路面时，由于脚底打滑，我意外摔倒。还好有惊无险，最终还是完成了采访拍摄。
						</div>
   						<div>
   							 “世之奇伟、瑰怪、非常之观，常在于险远”，“非有志者不能至也”。在新疆的农牧区采访，对此话的感受尤为深刻。地理上的距离，可以用脚力去克服；心理上的距离，则只有带着情感不断去磨砺技能，才可攻克。2017年是在匆忙中寻找从容的一年，也是身体和灵魂同时在路上的一年。
   						</div>
					</div>
				</div>
				<img :src='imgs.jbg4' class="zmiti-bg" />

			</div>

			<Footer></Footer>


		</section>
	</div>
</template>
<script>
	import './page.css';
	import imgs from '../lib/assets.js';
	import IScroll from 'iscroll';
	import Footer from '../footer/footer';
	export default {
		name:'zmitipage1',
		data(){
			return {
				imgs,
				play:false
			}
		},
		methods:{
			ended(){
				this.play = false;
			},
			playVideo(){
				this.$refs['video'].play()
			},
			pauseVideo(){
				this.$refs['video'].pause()	
				this.play = false
			}
		},
		components:{
			Footer
		},
		mounted(){
			this.scroll = new IScroll(this.$refs['page'],{

			});

			setTimeout(()=>{
				this.scroll.refresh();
			},100)
		}
	}
</script>
<template>
	<footer class="zmiti-footer-main-ui">
		<div class="zmiti-footer-btns">
			<div><img :src="imgs.back" alt=""></div>
			<div><img :src="imgs.share" alt=""></div>
		</div>

		<div class="zmiti-footer-line">
			<img :src="imgs.line" alt="">
		</div>

		<div class="zmiti-look-copyright">
			查看版权
		</div>
	</footer>
</template>
<script>
import imgs from '../lib/assets.js';
import './footer.css';
	export default {
		props:['obserable'],
		data(){
			return {
				imgs
			}
		},
		methods:{

		},
		mounted(){

		}
	}
</script>
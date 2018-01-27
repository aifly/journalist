import Vue from "vue";
import Index from './components/index/index';
import Page1 from './components/page1/page1'
import Copyright from './components/copyright/copyright'
import Obserable from './components/lib/obserable';
import imgs from './components/lib/assets'
import $ from 'jquery';
import './components/lib/touch.js';
var obserable = new Obserable();


//Vue.config.productionTip = false

/* eslint-disable no-new */

new Vue({
	data: {
		obserable,
		rotate: false,
		imgs,
		showMask: false,
		bg: './assets/music/bg.mp3',
		viewH: document.documentElement.clientHeight

	},
	el: '#app',
	template: `<div>
		<Index :obserable='obserable'></Index>
		<Page1 :obserable='obserable'></Page1>
		<Copyright :obserable='obserable'></Copyright>
		<div @click='toggleMusic' class='zmiti-play' :class='{"rotate":rotate}'>
			<img :src='imgs.play'/>
		</div>

		<audio ref='audio' :src='bg' loop autoplay></audio>

		<div :style="{height:viewH+'px'}"  class="zmiti-mask" v-if='showMask' @touchstart='showMask = false'>
			<img :src="imgs.arrow" alt="">
		</div>
	</div>`,
	methods: {

		loading: function(arr, fn, fnEnd) {
			var len = arr.length;
			var count = 0;
			var i = 0;

			function loadimg() {
				if (i === len) {
					return;
				}
				var img = new Image();
				img.onload = img.onerror = function() {
					count++;
					if (i < len - 1) {
						i++;
						loadimg();
						fn && fn(i / (len - 1), img.src);
					} else {
						fnEnd && fnEnd(img.src);
					}
				};
				img.src = arr[i];
			}
			loadimg();
		},
		toggleMusic() {
			var music = this.$refs['audio'];
			music[music.paused ? 'play' : 'pause']()
		},
		updatePv() {
			$.ajax({
				url: window.protocol + '//api.zmiti.com/v2/custom/update_pvnum/',
				type: 'post',
				data: {
					//isrand: 0,
					customid: 36
				}
			});
		}
	},
	components: {
		Index,
		Page1,
		Copyright
	},
	mounted() {

		/*this.loading(arr, (s) => {
			obserable.trigger({
				type: 'loading',
				data: s * 100 | 0
			})
		}, () => {
			obserable.trigger({
				type: 'loaded'
			})
		})*/

		obserable.on('showShare', () => {
			this.showMask = true;
		})


		$(this.$refs['audio']).on('play', () => {
			this.rotate = true;
		}).on('pause', () => {
			this.rotate = false;
		});

		this.$refs['audio'].volume = .3;
		this.$refs['audio'].play();
		var s = this;
		document.addEventListener("WeixinJSBridgeReady", function() {
			WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
				s.$refs['audio'].play();
			});
		}, false)

		obserable.on('toggleBgMusic', (data) => {
			this.$refs['audio'][data ? 'play' : 'pause']();
		});

		this.updatePv();
	}
})
<template>
	<div class="container">
		<div class="header">
			<zl-title :data="'成就值(' + user.score + ')'" />
			<span class="iconfont" 
				style="display: inline-block;padding: 0 10px;cursor: pointer;"
				@click="DialogVisible = true">
				&#xe682;
			</span>
			<el-dialog :visible.sync="DialogVisible" width="700px" top="75px">
				<template v-slot:title>
					<zl-title data="成就值说明" />
				</template>
				<div class="explain">
					<p>一、成就值是什么？</p>
					成就值记录了你泡猪客的日子里所取得的成绩，分为：学习成就&贡献成就，两个类别
					<p>二、成就值怎么计算的？</p>
					<p>学习成就值</p>
					<img src="https://uploadfiles.nowcoder.com/images/20190506/392538858_1557126488997_6C9DDE7930D3029072D4F6DCAC8ED4BD"/>
					<p>贡献成就值</p>
					<img src="https://uploadfiles.nowcoder.com/images/20190506/392538858_1557126495857_B6C1E94BA3711E8B62F69C6065E258F0"/>
					<p>三、如何一眼识别大佬？</p>
					不同成就值的猪友们名字颜色是不一样的！按照彩虹色从高到低排序~
					<img src="https://uploadfiles.nowcoder.com/images/20190506/392538858_1557127580564_96F58599215673F93B13F2776F581741"/>
				</div>
			</el-dialog>
		</div>
		<hr>
		<div class="body">
			<div class="level">
				<div v-for="(item, i) in level" :key="i" :style="{color: item.color}">
					<p>{{item.name}}</p>
					<p>{{'LV.' + i}}</p>
				</div>
			</div>
			<div style="padding: 20px 0;">
				<el-progress :show-text="false" :stroke-width="27" :percentage="progress" :color="level[user.userLevel].color"></el-progress>
			</div>
			
		</div>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue'
	import {
		mapGetters
	} from 'vuex'
	
	export default {
		name: 'artDetail',
		components: {
			zlTitle,
		},
		computed: {
			...mapGetters([
				'badges',
				'level'
			]),
		},
		watch: {

		},
		provide() {},
		mounted() {
			this.progress= Math.floor((100 / 7) * (this.user.userLevel + 0.5));
			if(this.progress > 100) {
				this.progress = 100;
			}
		},
		inject: ['oneself'],
		data() {
			return {
				DialogVisible: false,
				user: {
					score:6901,
					uId: 992973331,
					introduction: '我是一个保安，爱吃小熊饼干',
					education: '本科',
					// todo: 以上是个人页新增字段,到时候要修改到其他地方
					base: '杭州',
					sex: 0,
					belikes: 1100,
					becollects: 1001,
					codePass: 30,
					problemPass: 37,
					highquiltyOutput: 100,
					nickName: '今天也是没有收到offer的一天',
					school: '华侨大学',
					graduationYear: 2021,
					direction: 'java工程师',
					identity: {
						name: '字节跳动_Data_后端开发工程师',
						type: 'trainee',
					},
					userLevel: 6,
					profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
				},
				progress: 0,
			}
		},
		methods: {
			onSubmit() {

			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100%;
	}
	
	.explain {
		position: relative;
		> p {
			font-weight:bold;
		}
		> img {
			position: relative;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	
	.header {
		width: 100%;
		height: 50px;
		font-size: 15px;
		color: #6f6f6f;
	}

	hr {
		border: none;
		width: 100%;
		transform: scale(1.06);
		border-top: 1px dashed #cfcfcf;
	}
	
	.level {
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		> div {
			display: inline-block;
			text-align: center;
			> p {
				padding: 0;
				margin: 0;
			}
		}
	}
</style>

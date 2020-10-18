<template>
	<div class="container">
		<div class="header">
			<zl-title data="基本信息" />
			{{'ID: (' + user.id + ')'}}
			<el-button type="success" style="float: right;" @click.native="readonly=false" v-if="oneself">编辑</el-button>
		</div>
		<hr>
		<el-form ref="form" :model="form" label-width="80px" size="small" :disabled="readonly">
			<el-form-item label="我的昵称">
				<el-input v-model="form.userName" style="max-width: 250px;"></el-input>
			</el-form-item>
			<el-form-item label="我的性别">
				<el-radio-group v-model="form.sex">
					<el-radio :label="0">
						<svg class="icon" aria-hidden="true" font-size="15px">
							<use xlink:href="#el-icon-zlnv"></use>
						</svg>
					</el-radio>
					<el-radio :label="1">
						<svg class="icon" aria-hidden="true" font-size="15px">
							<use xlink:href="#el-icon-zlnan"></use>
						</svg>
					</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="我的简介">
				<el-input v-model="form.introduction" style="max-width: 250px;"></el-input>
			</el-form-item>
			<el-form-item label="身份认证">
				<el-col :span="11">
					<el-input v-model="form.badgeList[0].name" style="width: 100%;"></el-input>
				</el-col>
				<el-col style="text-align: center;" :span="2">类型</el-col>
				<el-col :span="11">
					<el-select v-model="form.badgeList[0].type" style="width: 100%;" placeholder="请选择">
						<el-option value="trainer">
						</el-option>
						<el-option value="admission">
						</el-option>
						<el-option value="formal">
						</el-option>
					</el-select>
				</el-col>
			</el-form-item>
			<el-form-item label="我居住地">
				<el-input v-model="form.base" style="max-width: 250px;"></el-input>
			</el-form-item>
			<el-form-item label="毕业年份">
				<el-select v-model="form.graduationYear" placeholder="请选择毕业年份">
					<el-option :value="item" v-for="(item, i) in dateData" :key="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="学历">
				<el-select v-model="form.education" placeholder="请选择最高学历">
					<el-option :value="item" v-for="(item, i) in educationData" :key="i"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="我的学校">
				<el-input v-model="form.school" style="max-width: 250px;"></el-input>
			</el-form-item>
			<el-form-item v-if="!readonly">
			    <el-button type="primary" @click="onSubmit">立即创建</el-button>
			    <el-button>取消</el-button>
			  </el-form-item>
		</el-form>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue'

	export default {
		name: 'artDetail',
		components: {
			zlTitle,
		},
		computed: {},
		watch: {

		},
		provide() {},
		created() {
			//console.log(new Date().getFullYear())
			for (let i = new Date().getFullYear() + 4; i >= 1970; i--) {
				this.dateData.push(i);
			}
		},
		inject: ['oneself'],
		data() {
			return {
				dateData: [],
				readonly: true,
				educationData: [
					'博士后',
					'博士',
					'硕士',
					'本科',
					'专科',
					'高中',
					'其他'
				],
				form: {
					id: 992973331,
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
					userName: '今天也是没有收到offer的一天',
					school: '华侨大学',
					graduationYear: 2021,
					direction: 'java工程师',
					badgeList: [{
						name: '字节跳动_Data_后端开发工程师',
						type: 'trainee',
					}, ],
					userLevel: 6,
					profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
				},
				user: {
					id: 992973331,
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
					userName: '今天也是没有收到offer的一天',
					school: '华侨大学',
					graduationYear: 2021,
					direction: 'java工程师',
					badgeList: [{
						name: '字节跳动_Data_后端开发工程师',
						type: 'trainee',
					}, ],
					userLevel: 6,
					profile: 'https://images.nowcoder.com/images/20200630/785377050_1593485967382_32C2759010B286BB3B7CC509E4721490?x-oss-process=image/resize,m_mfit,h_200,w_200',
				},
			}
		},
		methods: {
			onSubmit() {

			}
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
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
</style>

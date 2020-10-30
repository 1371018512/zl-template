<template>
	<div class="container" v-if="user.nickName">
		<div class="header">
			<zl-title data="基本信息" />
			{{'ID: (' + user.uId + ')'}}
			<el-button type="success" style="float: right;" @click.native="readonly=false" v-if="oneself">编辑</el-button>
		</div>
		<hr>
		<el-form ref="form" :model="form" label-width="80px" size="small" :disabled="readonly">
			<el-form-item label="我的昵称">
				<el-input v-model="form.nickName" style="max-width: 250px;"></el-input>
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
				<el-col :span="11" v-if="form.identity">
					<el-input v-model="form.identity.name" style="width: 100%;"></el-input>
				</el-col>
				<el-col style="text-align: center;" :span="2">类型</el-col>
				<el-col :span="11">
					<el-select v-if="form.identity" v-model="form.identity.type" style="width: 100%;" placeholder="请选择">
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
		components: {
			zlTitle,
		},
		computed: {
			// 初次计算之前不可避免的会报错
			user() {
				return this.ReactiveUser();
			},
		},
		watch: {
			data: function (val) {   
				this.form = val;
			}
		},
		provide() {
		},
		created() {
			for (let i = new Date().getFullYear() + 4; i >= 1970; i--) {
				this.dateData.push(i);
			}
			
		},
		mounted() {
			this.$store.dispatch('user/getInfo', this.$route.params.u_id).then((data) => {
				this.form = data;
			}).catch(error => {
				console.log(error)
			})
		},
		inject: ['oneself', 'ReactiveUser'],
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
					name: '',
				},
			}
		},
		props: {
			data: {
			},
		},
		methods: {
			onSubmit() {
				this.$store.dispatch('user/modifyInfo', this.form)
					.then((data) => {
						this.$store.commit('user/SET_DETAIL', data.data)
						this.$message({
							message: '成功修改个人信息',
							type: 'success',
							customClass:'mzindex'
						});
						this.readonly = true;
					})
					.catch((e) => {
						console.log(e)
					})
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

<template>
	<div class="container">
		<el-tabs v-model="activeName">
			<el-tab-pane label="发帖子" name="art">
				<el-form ref="artForm" :model="artForm" label-width="40px" size="small" class="form">
					<el-form-item label="标题">
						<el-input v-model="artForm.title" placeholder="请输入标题"></el-input>
					</el-form-item>
					<el-form-item label="内容">
						<el-input type="textarea" v-model="artForm.content" placeholder="请输入内容" style="font-size: 13px;"></el-input>
					</el-form-item>
					<el-form-item label="话题">
						<el-select style="width: 100%;" v-model="artForm.topic" multiple filterable allow-create default-first-option
						 placeholder="最多可输入 7 个话题，方便帖子检索">
							<el-option v-for="item in topicOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="标签">
						<el-select style="width: 100%;" v-model="artForm.tag" multiple filterable allow-create default-first-option
						 placeholder="最多可输入 7 个标签，方便帖子检索">
							<el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click.native="submitArt">立即创建</el-button>
						<el-button>取消</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="发动态" name="blink">
				<el-form ref="blinkForm" label-width="40px" size="small" class="form" :model="blinkForm">
					<el-input style="font-size: 13px;" type="textarea" v-model="blinkForm.content" placeholder="请输入内容,动态长度不超过200字"
					 :maxlength="200">
					</el-input>
					<div class="buttons">
						<el-button type="primary" size="small" @click.native="submitBlink">发布</el-button>
					</div>
				</el-form>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue';
	import {
		validUsername
	} from '@/utils/validate'

	export default {
		components: {
			zlTitle
		},
		data() {
			/* const validateContent = (rule, value, callback) => {
			  if (!validUsername(value)) {
			    callback(new Error('Please enter the correct user name'))
			  } else {
			    callback()
			  }
			} */
			return {
				topicOptions: [{
					value: '站内公告',
					label: '站内公告'
				}, {
					value: '笔经面经',
					label: '笔经面经'
				}, {
					value: '我要提问',
					label: '我要提问'
				}, {
					value: '技术交流',
					label: '技术交流'
				}, {
					value: '招聘信息',
					label: '招聘信息'
				}],
				tagOptions: [{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
				}],
				artForm: {
					title: '',
					content: '',
					tag: [],
					topic: [],
				},
				blinkForm: {
					content: '',
				},
				activeName: 'art',
				loginRules: {},
			}
		},
		methods: {
			submitBlink() {
				this.$store.dispatch('art/submitBlink', {
						uId: this.$store.getters['user/uId'],
						content: this.blinkForm.content,
					})
					.then((data) => {
						this.$message({
							message: '成功发布动态',
							type: 'success',
							customClass:'mzindex'
						});
						console.log(data)
						this.blinkForm.content = ''
					})
					.catch((e) => {
						console.log(e)
					})
			},
			submitArt() {
				this.artForm.uId = this.$store.getters['user/uId'];
				this.$store.dispatch('art/submitArt', this.artForm)
					.then((data) => {
						this.$message({
							message: '成功发布讨论帖',
							type: 'success',
							customClass:'mzindex'
						});
						console.log(data)
						this.artForm = {
							title: '',
							content: '',
							tag: [],
							topic: [],
						};
					})
					.catch((e) => {
						console.log(e)
					})
			},
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		background-color: #fafafa;
		border: 1px solid #dddddd;
		border-radius: 2px;
		margin-top: 13px;
		box-shadow: 0 0 5px #eeeeee;
		padding: 10px 20px 10px 10px;
	}

	.form {
		margin-top: 10px;
	}

	.buttons {
		margin-top: 10px;
		float: right;
	}
</style>

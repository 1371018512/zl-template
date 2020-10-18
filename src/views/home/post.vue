<template>
	<div class="container">
		<zl-title data="发布帖子"/>
		<el-form ref="form" :model="form" label-width="40px" size="small" class="form">
			<el-form-item label="标题">
				<el-input v-model="form.title" placeholder="请输入标题"></el-input>
			</el-form-item>
			<el-form-item label="内容">
				<el-input type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
			</el-form-item>
			<el-form-item label="话题">
				<el-select style="width: 100%;" v-model="form.topic" multiple filterable allow-create default-first-option
				 placeholder="最多可输入 7 个话题，方便帖子检索">
					<el-option v-for="item in topicOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="标签">
				<el-select style="width: 100%;" v-model="form.tag" multiple filterable allow-create default-first-option
				 placeholder="最多可输入 7 个标签，方便帖子检索">
					<el-option v-for="item in tagOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">立即创建</el-button>
				<el-button>取消</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import zlTitle from '@/components/common/title.vue';
	
	export default {
		components: {
			zlTitle
		},
		data() {
			return {
				topicOptions: [{
					value: 'HTML',
					label: 'HTML'
				}, {
					value: 'CSS',
					label: 'CSS'
				}, {
					value: 'JavaScript',
					label: 'JavaScript'
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
				form: {
					title: '',
					content: '',
					tag: [],
					topic: [],
				}
			}
		},
		methods: {
			onSubmit() {
				console.log(this.form);
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
</style>

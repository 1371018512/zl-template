<template>
	<div>
		<div class="tName">
			<div>
				与
				<zl-name :data="target" :onlyName="true" v-if="target.uId" /> 的对话
			</div>
		</div>
		<div class="chatWindow" ref="chatWindow">
			<zl-chat 
			:data="item" 
			:key="item.date + ''" 
			:target="target"
			v-for="(item, i) in messages" :left="$store.getters['user/uId'] != item.uId"/>
		</div>

		<div>
			<div class="buttons"></div>
			<div>
				<el-form :rules="Rules" ref="Form" :model="form" label-width="0">
					<el-form-item prop="content">
						<el-input type="textarea" v-model="form.content" placeholder="请输入..."></el-input>
					</el-form-item>
					<div class="submit">
						<el-button type="primary" size="small" @click.native="submitMessage">发送</el-button>
					</div>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import zlName from '@/components/name/index.vue'
	import zlProfile from '@/components/Profile/profile2.vue'
	import {
		formatTime
	} from '../../utils/index.js'
	import zlChat from '@/components/chat/index.vue'
	import {
		scrollTo
	} from '../../utils/scroll-to.js'

	export default {
		components: {
			zlName,
			zlProfile,
			zlChat
		},
		computed: {},
		watch: {
			$route() {
				this.Refresh();
			}
		},
		provide() {
		},
		destroyed() {
			this.ws.close();
		},
		async mounted() {
			this.Refresh();
			//console.log(this.$store.getters['user/uId'], this.$route.params.t_id)
			this.ws = new WebSocket('ws://localhost:8085/' + this.$store.getters['user/uId']);
			// 客户端接收消息
			this.ws.onmessage = (event) =>{
				console.log(event.data)
				this.messages.push(JSON.parse(event.data))
				scrollTo(9999, 1000, () => {}, this.$refs.chatWindow)
			}
			// 出错
			this.ws.onerror = (error) =>{
			  console.log(error);
			}
			// 关闭
			this.ws.onclose = ()=>{
			  console.log('webSocket断开连接')
			}
		},
		data() {
			var validateContent = (rule, value, callback) => {
				if (!value) {
					return callback(new Error('不能为空'));
				} else {
					callback();
				}
			};
			return {
				ws: {},
				Rules: {
					content: [{
						validator: validateContent,
						trigger: 'blur'
					}],
				},
				form: {
					content: '',
				},
				formatTime: formatTime,
				target: {},
				messages: [],
				talk: {
					target: {
						uId: 992973332,
						introduction: '我是一个保安，爱吃小熊饼干',
						education: '本科',
						base: '杭州',
						sex: 1,
						belikes: 1100,
						becollects: 1001,
						codePass: 30,
						problemPass: 37,
						highquiltyOutput: 100,
						identity: {
							name: '字节跳动_Data_后端开发工程师',
							type: 'trainee',
						},
						profile: 'https://images.nowcoder.com/images/20200919/34603254_1600499186421_6EB5793282AABB100FAD68C33C19AFD0?x-oss-process=image/resize,m_mfit,h_200,w_200',
						userLevel: 2,
						nickName: 'shining4code',
						school: '浙江大学',
						graduationYear: 2021,
						direction: '产品',
					},
					talks: []
				}
			};
		},
		methods: {
			async Refresh() {
				await this.$store.dispatch('talk/getTalk', {
						uId: this.$store.getters['user/uId'],
						tId: this.$route.params.t_id,
						read: true
					})
					.then((data) => {
						this.$emit('readed');
						this.messages = data.data.messages;
					})
					.catch((err) => {
						console.log(err);
					});
				await this.$store.dispatch('user/getInfo', this.$route.params.t_id)
					.then((data) => {
						this.target = data;
					})
					.catch((err) => {
						console.log(err);
					});
				scrollTo(9999, 1000, () => {}, this.$refs.chatWindow)
			},
			submitMessage() {
				this.$refs.Form.validate(async valid => {
					if (valid) {
						//console.log(this.form.content)
						await this.$store.dispatch('talk/submitTalk', {
							uId: this.$store.getters['user/uId'],
							tId: this.$route.params.t_id,
							content: this.form.content,
						})
							.then((data) => {
								this.messages.push({
									uId: this.$store.getters['user/uId'],
									content: this.form.content,
									date: new Date(),
									refused: data.data
								})
								this.form.content = '';
								if(data.data) {
									this.$message({
										message: '你已被拉黑，对方无法收到你的消息',
										type: 'warning',
										customClass: 'mzindex',
									});
								}else {
									this.$message({
										message: '成功发送',
										type: 'success',
										customClass: 'mzindex',
									});
								}
								
								scrollTo(9999, 1000, () => {}, this.$refs.chatWindow)
							})
					} else {
						console.log('error submit!!')
						return false
					}
				})
			},
		}
	}
</script>

<style scoped>
	.chatWindow {
		overflow: auto;
		height: 450px;
		padding: 10px;
		background-color: #fafafa;
	}

	.tName {
		display: flex;
		justify-content: center;
	}

	.buttons {
		padding: 10px 5px;
	}

	.con {}

	.submit {
		margin-top: 10px;
		float: right;
	}
</style>

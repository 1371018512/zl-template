import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

const originalPush = Router.prototype.push

Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export const constantRoutes = [{
		// 登录路由
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		// 404处理路由
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
		// 主页路由，'/'重定向至'home'
		// todo:此页面只显示自己的动态和讨论帖 + 圈子动态讨论帖 + 关注的人动态讨论帖
		path: '/',
		component: Layout,
		redirect: '/home',
		children: [{
			path: 'home',
			component: () => import('@/views/home/index'),
			name: 'Home',
		}]
	},
	{
		// 讨论区，只有讨论帖
		path: '/discussion',
		component: Layout,
		redirect: '/home',
		children: [{
			path: '',
			component: () => import('@/views/discussion/index'),
		}]
	},
	{
		// 消息管理路由
		path: '/information',
		component: Layout,
		children: [{
			// 聊天室
			path: '/information/talk',
			component: () => import('@/views/information/index'),
			children: [{
				path: '/information/talk/:t_id',
				component: () => import('@/views/information/chatRoom'),
			}, ]
		}, {
			// 通知、赞、回复等
			path: '/information',
			component: () => import('@/views/information/index'),
			children: [{
				path: '/information',
				component: () => import('@/views/information/rightContainer'),
			}, ]
		}]
	},
	{
		// 个人管理路由
		path: '/person',
		component: Layout,
		children: [{
			path: '/person/index/:u_id',
			component: () => import('@/views/person/index'),
			children: [{
				// 个人资料
				path: '/person/index/:u_id',
				component: () => import('@/views/person/baseInfo'),
			}, ]
		}, {
			path: '/person/post/:u_id',
			name: 'Person',
			component: () => import('@/views/person/index'),
			children: [{
				// 讨论帖
				path: '/person/post/:u_id',
				component: () => import('@/views/person/post'),
			}, ]
		}, {
			path: '/person/achievement/:u_id',
			component: () => import('@/views/person/index'),
			children: [{
				// 个人成就
				path: '/person/achievement/:u_id',
				component: () => import('@/views/person/achievement'),
			}, ]
		}, {
			path: '/person',
			redirect: '/404',
			hidden: true
		}, {
			path: '/*',
			redirect: '/404',
			hidden: true
		}]
	},
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
	// 404 page must be placed at the end !!!
	{
		path: '*',
		redirect: '/404',
		hidden: true
	}
]

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
	const newRouter = createRouter()
	router.matcher = newRouter.matcher // reset router
}

export default router

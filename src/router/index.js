import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [{
		path: '/login',
		component: () => import('@/views/login/index'),
		hidden: true
	},
	{
		path: '/404',
		component: () => import('@/views/error-page/404'),
		hidden: true
	},
	{
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
		path: '/person',
		component: Layout,
		children: [{
			path: '/person/index/:u_id',
			component: () => import('@/views/person/index'),
			children: [{
				path: '/person/index/:u_id',
				component: () => import('@/views/person/baseInfo'),
			}, ]
		}, {
			path: '/person/post/:u_id',
			name: 'Person',
			component: () => import('@/views/person/index'),
			children: [{
				path: '/person/post/:u_id',
				component: () => import('@/views/person/post'),
			}, ]
		}, {
			path: '/person/achievement/:u_id',
			component: () => import('@/views/person/index'),
			children: [{
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

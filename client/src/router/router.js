import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from "../service/token";
import ApiService from "../service/api"

// Components
import LoginComponent from "../components/auth/LoginComponent";

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [
		{
			path: '/login',
			component: LoginComponent,
			meta: {
				public: true,
				loginPage: true
			}
		},
		{
			beforeEnter: (to, from, next) => {
				TokenService.removeToken();
				ApiService.removeHeader();

				next();
			},
			path: '/register',
			component: () => import("../components/auth/RegisterComponent"),
			meta: {
				public: true
			},
		},
		{
			path: '/home',
			component: () => import("../components/home/HomeMain"),
			children: [
				{
					path: '',
					component: () => import("../components/todo/DashboardList"),
				},
				{
					path: 'edit-account',
					component: () => import("../components/edit-account/EditAccount"),
				},
				{
					path: 'list-:type',
					component: () => import("../components/todo/ViewList"),
				},
			]
		},
		{
			path: '*',
			redirect: '/home',
		}
	]
})

router.beforeEach((to, from, next) => {
	const isPrivate = !to.matched.some(record => record.meta.public);
	const isLoginPage = to.matched.some(record => record.meta.loginPage);
	const tokenFound = TokenService.getToken();

	if (tokenFound) {
		if (isLoginPage) {
			return next({
				path: '/home',
			});
		}
	} else {
		if (isPrivate) {
			return next({
				path: '/login',
			});
		}
	}

	next();
})

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from "../service/token";
import ApiService from "../service/api";
import store from "../store/store"

// Components
import LoginComponent from "../components/auth/LoginComponent.vue";

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
			component: () => import("../components/auth/RegisterComponent.vue"),
			meta: {
				public: true
			},
		},
		{
			path: '/home',
			component: () => import("../components/home/HomeMain.vue"),
			children: [
				{
					path: '',
					component: () => import("../components/todo/DashboardList.vue"),
				},
				{
					path: 'edit-account',
					component: () => import("../components/edit-account/EditAccount.vue"),
				},
				{
					path: 'list-:type',
					component: () => import("../components/todo/ViewList.vue"),
				},
				{
					beforeEnter: (to, from, next) => {
						if(!store.getters.returnListDataState) { // redirect to home in case the path is accessed from history and the data is not yet loaded.
							next({
								path: '/home',
							});
						}
						next();
					},
					path: 'list-:type/:id',
					component: () => import("../components/todo/ViewList.vue")
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

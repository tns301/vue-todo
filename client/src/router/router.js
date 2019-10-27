import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from "../service/token";
import ApiService from "../service/api"

// Components
import LoginComponent from "../components/user/LoginComponent";

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
			component: () => import("../components/user/RegisterComponent"),
			meta: {
				public: true
			},
		},
		{
			path: '/home',
			component: () => import("../components/home/HomeMain"),
		},
		{
			path: '*',
			redirect: '/home',
		}
	]
})

router.beforeEach((to, from, next) => {
	const isPublic = to.matched.some(record => record.meta.public);
	const isLoginPage = to.matched.some(record => record.meta.loginPage);
	const isLoggedIn = TokenService.getToken();

	if (!isPublic && !isLoggedIn) {
		return next({
			path: '/login',
		});
	}

	if (isLoggedIn && isLoginPage) {
		return next({
			path: '/home',
		});
	}

	next();
})

export default router;

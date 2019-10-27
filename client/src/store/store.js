import Vue from "vue";
import Vuex from "vuex";
import TokenService from "../service/token";
import ApiService from "../service/api";
import router from '../router/router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		
	},
	mutations: {

	},
	actions: {
		registerUserAccount(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.post('/api/register', payload)
					.then((response) => {
						router.push({ path: '/login' })
						resolve(response.data);
					})
					.catch((error) => {
						reject(error);
					})
			});
		},
		logInUserAccount(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.post('/api/login', payload)
					.then((response) => {
						TokenService.saveToken(response.headers['auth-token'])
						router.push({ path: '/home' })
						resolve(response.data);
					})
					.catch((error) => {
						reject(error);
					})
			});
		},
		getUserInfo(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.get('/api/todo/get', payload)
					.then((response) => {
						resolve(response.data);
					})
					.catch((error) => {
						reject(error);
					})
			});
		},
		logOutUser() {
			TokenService.removeToken();
			router.push({ path: '/login' })
		},
	},
	getters: {

	},
})

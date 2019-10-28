import Vue from "vue";
import Vuex from "vuex";
import TokenService from "../service/token";
import ApiService from "../service/api";
import router from '../router/router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			name: 'User',
			email: ''
		}
	},
	mutations: {
		setUserInfo(state, paylaod) {
			state.userInfo = paylaod;
		}
	},
	actions: {
		registerUserAccount(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.post('/api/register', payload)
					.then(() => {
						router.push({ path: '/login' })
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			});
		},
		logInUserAccount(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.post('/api/login', payload)
					.then((response) => {
						TokenService.saveToken(response.headers['auth-token'])
						router.push({ path: '/home' })
						resolve()
					})
					.catch((error) => {
						reject(error);
					})
			});
		},
		getUserInfo(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.get('/api/user/get', payload)
					.then((response) => {
						context.commit('setUserInfo', response.data.response)
						resolve(response.data)
					})
					.catch((error) => {
						reject(error);
					})
			});
		},
		logOutUser() {
			TokenService.removeToken()
			router.push({ path: '/login' })
		},
	},
	getters: {
		returnUserInfo(state) {
			return state.userInfo
		}
	},
})

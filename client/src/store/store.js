import Vue from "vue";
import Vuex from "vuex";
import TokenService from "../service/token";
import ApiService from "../service/api";
import router from "../router/router";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			firstName: "First",
			lastName: "Last",
			email: "",
			avatar: "0"
		},
		listData: null
	},
	mutations: {
		setUserInfo(state, paylaod) {
			state.userInfo = paylaod
		},
		setListData(state, payload) {
			state.listData = payload
		}
	},
	actions: {
		registerUserAccount(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.post("/api/register", payload)
					.then(() => {
						router.push({ path: "/login" })
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			});
		},
		editUserAccount(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.put("/api/user/edit", payload)
					.then(() => {
						router.push({ path: "/" })
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			});
		},
		logInUserAccount(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.post("/api/login", payload)
					.then((response) => {
						TokenService.saveToken(response.headers["auth-token"])
						router.push({ path: "/home" })
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			});
		},
		getUserInfo(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.get("/api/user/get", payload)
					.then((response) => {
						context.commit("setUserInfo", response.data.response)
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			});
		},
		logOutUser() {
			TokenService.removeToken()
			ApiService.removeHeader()
			
			router.push({ path: "/login" })
		},
		addListData(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.put("/api/todo/put", payload)
					.then(() => {
						router.push({ path: "/home" })
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			});
		},
		getListData(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.get("/api/todo/get", payload)
					.then((response) => {
						context.commit("setListData", response.data.response)
						resolve()
					})
					.catch((error) => {
						reject(error)
					})
			});
		},
	},
	getters: {
		returnUserInfo(state) {
			return state.userInfo
		},
		returnListNames(state) {
			if (state.listData === null) return {}

			return Object.keys(state.listData)
		},
		returnListData(state) {
			return state.lists
		}
	},
})

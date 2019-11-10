import Vue from "vue";
import Vuex from "vuex";
import TokenService from "../service/token";
import ApiService from "../service/api";
import router from "../router/router";
import { avatar } from "../components/common/user-avatar";
import { listTypes } from "../components/common/list-type";

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		userInfo: {
			firstName: "First",
			lastName: "Last",
			email: "",
			avatar: ""
		},
		avatar: avatar,
		listTypes: listTypes,
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
		postRegisterUser(context, payload) {
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
		putEditUser(context, payload) {
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
		postLoginUser(context, payload) {
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
		putListData(context, payload) {
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
		returnUserInfoMenu(state, getters) {
			const tempData = state.userInfo
			
			return {
				avatarSrc: getters.returnIcon(tempData.avatar),
				fullName: `${tempData.firstName} ${tempData.lastName}`
			}
		},
		returnListNamesMenu(state, getters) {
			if (state.listData === null) return
			
			let obj = {}

			for (const eachList in state.listData) {
				Object.assign(obj, {
					[eachList]: {
						name: state.listData[eachList].name,
						typeSrc: getters.returnListType(state.listData[eachList].type)
					}
				})
			}

			return obj
		},
		returnListData(state) {
			if (state.listData === null) return

			return state.listData
		},
		returnAllIcons(state) {
			return state.avatar
		},
		returnIcon: state => avatarId => {
			return state.avatar[avatarId]
		},
		returnAllListTypes(state) {
			return state.listTypes
		},
		returnListType: state => typeId => {
			if (!state.listTypes[typeId]) return

			return state.listTypes[typeId].icon
		}
	},
})

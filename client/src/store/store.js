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
		updateListData(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.put("/api/todo/update", payload)
					.then(() => {
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
		deleteListData(context, payload) {
			return new Promise((resolve, reject) => {
				ApiService.delete("/api/todo/delete", payload)
					.then(() => {
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

			for (const eachListIndex in state.listData) {
				let eachList = state.listData[eachListIndex]

				Object.assign(obj, {
					[eachList._id]: {
						name: eachList.name,
						typeSrc: getters.returnListType(eachList.type),
					}
				})
			}

			return obj
		},
		returnListData(state) {
			if (state.listData === null) return

			return state.listData
		},
		returnListDataState(state) {
			return state.listData !== null
		},
		returnList: state => listName => {
			let index = 0, currentListName;

			for (const listIndex in state.listData) {
				currentListName = state.listData[listIndex]._id

				if (currentListName === listName) {
					index = listIndex
					break
				}
			}

			return state.listData[index]
		},
		returnTodayList(state, getters) {
			if (state.listData === null) return

			let date = new Date();

			let obj = [], filteredArray = state.listData.filter(list => {
				if (new Date(list.date) > date.setDate(date.getDate() - 1)) {
					return list
				}
			})

			for (const eachListIndex in filteredArray) {
				let eachList = filteredArray[eachListIndex]

				obj.push({
					name: `${getters.returnListType(eachList.type)} ${eachList.name}`,
					date: eachList.date,
					_id: eachList._id
				})
			}

			return obj
		},
		returnOverdueList(state, getters) {
			if (state.listData === null) return

			let date = new Date();

			let obj = [], filteredArray = state.listData.filter(list => {
				if (new Date(list.date) < date.setDate(date.getDate() - 1)) {
					return list
				}
			})

			for (const eachListIndex in filteredArray) {
				let eachList = filteredArray[eachListIndex]

				obj.push({
					name: `${getters.returnListType(eachList.type)} ${eachList.name}`,
					date: eachList.date,
					_id: eachList._id
				})
			}

			return obj
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

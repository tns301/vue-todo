import axios from "axios";
import store from "../store/store";
import Element from "element-ui"

export const interceptor = axios.interceptors.response.use(response => {
	if (response.data.message !== undefined) {
		Element.Message({
			message: `Success: ${response.data.message}.`,
			type: "success"
		})
	}

	return response;
}, error => {
	if (error.response.status === 401 || error.response.status === 400) {
		Element.Message({
			message: `Error: ${error.response.data.message}.`,
			type: "error"
		})
		if (error.response.data.status === "token expired" || error.response.data.status === "denied") {
			store.dispatch('logOutUser');
		}
		
		return Promise.reject(error);
	} else {
		return Promise.reject(error);
	}
});
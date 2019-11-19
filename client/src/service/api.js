import axios from "axios"
import TokenService from "./token"
import { interceptor } from "../interceptors/interceptors"

axios.interceptors.response.use(interceptor);

const ApiService = {
	setHeader() {
		axios.defaults.headers.common["Auth-Token"] = TokenService.getToken();
	},

	removeHeader() {
		axios.defaults.headers.common = {};
	},

	get(resource) {
		return axios.get(resource);
	},

	post(resource, data) {
		return axios.post(resource, data);
	},

	put(resource, data) {
		return axios.put(resource, data);
	},

	delete(resource, data) {
		return axios.delete(resource, { data });
	},

	/**
	 * Perform a custom Axios request.
	 *
	 * data is an object containing the following properties:
	 *  - method
	 *  - url
	 *  - data ... request payload
	 *  - auth (optional)
	 *    - username
	 *    - password
	**/
	customRequest(data) {
		return axios(data)
	}
}

export default ApiService
const TOKEN_KEY = 'jwt'

const TokenService = {
	getToken() {
		return localStorage.getItem(TOKEN_KEY)
	},

	saveToken(token) {
		localStorage.setItem(TOKEN_KEY, token)
	},

	removeToken() {
		localStorage.removeItem(TOKEN_KEY)
	},

}

export default TokenService
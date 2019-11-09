export const goToPath = {
	methods: {
		goToPath(path) {
			this.$router.push({ path: path }).catch(() => {})
		},
	}
}
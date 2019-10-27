<template>
	<el-main>
		<h1>home</h1>
	</el-main>
</template>

<script>
import { mapActions } from "vuex";
import TokenService from "../../service/token";
import ApiService from "../../service/api";

export default {
	name: "HomeMain",
	created() {
		ApiService.setHeader(TokenService.getToken());

		this.getUserInfo();
	},
	methods: {
		...mapActions(["getUserInfo"])
	}
};
</script>
<template>
	<el-container>
		<el-main>
			<el-row :gutter="20">
				<UserCard />
				<el-col :span="18">
					<el-card>Todo</el-card>
				</el-col>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>

import TokenService from "../../service/token";
import ApiService from "../../service/api";

// Components
import UserCard from "../user/UserCard";

export default {
	name: "HomeMain",
	created() {
		ApiService.setHeader(TokenService.getToken());
	},
	components: {
		UserCard
	}
};
</script>
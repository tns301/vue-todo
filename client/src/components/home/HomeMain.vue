<template>
	<el-container>
		<el-main>
			<el-row :gutter="20">
				<UserCard />
				<transition name="el-zoom-in-center" mode="out-in">
					<router-view></router-view>
				</transition>
			</el-row>
		</el-main>
	</el-container>
</template>

<script>
import ApiService from "../../service/api";

// Components
import UserCard from "../user/UserCard";

export default {
	name: "HomeMain",
	created() {
		ApiService.setHeader();
	},
	components: {
		UserCard
	}
};
</script>
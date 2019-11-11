<template>
	<div class="container">
		<div class="row">
			<div class="user-menu align-app">
				<UserCard />
			</div>
			<div class="col align-app">
				<transition name="el-zoom-in-center" mode="out-in">
					<router-view></router-view>
				</transition>
			</div>
		</div>
	</div>
</template>

<script>
import ApiService from "../../service/api";

// Components
import UserCard from "../user/UserCard.vue";

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
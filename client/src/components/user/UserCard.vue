<template>
	<el-col :span="6">
		<el-card>
			<el-row :gutter="20">
				<el-col :span="4">
					<el-avatar :src="defaultImage"></el-avatar>
				</el-col>
				<el-col :span="20">
					<el-row :gutter="20">
					<span class="name">{{ returnUserInfo.name }}</span>
					</el-row>
					<el-row :gutter="20">
					<span class="email">{{ returnUserInfo.email }}</span>
					</el-row>
				</el-col>
			</el-row>
			<el-divider></el-divider>
		</el-card>
	</el-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

// images
import defaultUser from "../../../public/assets/img/default-user.png";

export default {
	name: "UserCard",
	data() {
		return {
			defaultImage: defaultUser
		};
	},
	created() {
		this.getUserInfo();
	},
	methods: {
		...mapActions(["getUserInfo"])
	},
	computed: {
		...mapGetters(["returnUserInfo"])
	}
};
</script>
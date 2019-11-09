<template>
	<el-card>
		<el-menu>
			<el-submenu index="1">
				<template slot="title">
					<el-avatar :src="logo[returnUserInfo.avatar]"></el-avatar>
					<span class="name">{{ returnUserInfo.firstName }} {{ returnUserInfo.lastName }}</span>
				</template>
				<el-menu-item-group>
					<el-menu-item index="1-1" @click="goToPath('/home/edit-account')">
						<i class="el-icon-edit-outline"></i>Edit account
					</el-menu-item>
				</el-menu-item-group>
				<el-menu-item-group>
					<el-menu-item index="1-2" @click="signOut">
						<i class="el-icon-switch-button"></i>Logout
					</el-menu-item>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
		<el-divider></el-divider>
		<el-button type="success" class="full" @click="goToPath('/home/list-add')">
			<i class="el-icon-plus"></i> Add List
		</el-button>
	</el-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { goToPath } from "../common/router-navigation";
import { avatar } from "../common/user-avatar";

export default {
	name: "UserCard",
	mixins: [goToPath, avatar],
	created() {
		this.getUserInfo();
	},
	methods: {
		signOut() {
			this.$confirm("Are you sure you want to logout?", "Warning", {
				confirmButtonText: "Yes",
				cancelButtonText: "Cancel",
				type: "warning"
			})
				.then(() => {
					this.logOutUser();
				})
				.catch(() => {});
		},
		...mapActions(["getUserInfo", "logOutUser"])
	},
	computed: {
		...mapGetters(["returnUserInfo"])
	}
};
</script>
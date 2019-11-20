<template>
	<el-card>
		<el-menu>
			<el-submenu index="1">
				<template slot="title">
					<el-avatar :src="returnUserInfoMenu.avatarSrc"></el-avatar>
					<span class="name">{{ returnUserInfoMenu.fullName }}</span>
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
		<ul class="list mb-4">
			<transition-group name="bounce-li">
				<li
					class="p-2 mb-1"
					v-for="(list, key, index) in returnListNamesMenu"
					:key="key"
					:index="index"
					@click="goToPath(`/home/list-edit/${key}`)"
				>
					{{list.typeSrc}} {{list.name}}
					<el-button
						type="danger"
						icon="el-icon-delete"
						class="delete-button"
						circle
						@click="deleteList(key)"
					></el-button>
				</li>
			</transition-group>
		</ul>
		<el-divider></el-divider>
		<el-button type="success" class="full" @click="goToPath('/home/list-add')">
			<i class="el-icon-plus"></i> Add a List
		</el-button>
	</el-card>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { goToPath } from "../common/router-navigation";

export default {
	name: "UserCard",
	mixins: [goToPath],
	created() {
		this.getUserInfo();
		this.getListData();
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
		deleteList(id) {
			this.deleteListData({
				id: id
			}).then(() => {
				this.getListData();
			});
		},
		...mapActions([
			"getUserInfo",
			"logOutUser",
			"getListData",
			"deleteListData"
		])
	},
	computed: {
		...mapGetters(["returnUserInfoMenu", "returnListNamesMenu"])
	}
};
</script>
<template>
	<el-card>
		<el-page-header @back="goToPath('/')" content="Edit account"></el-page-header>
		<el-form ref="form" :model="form" :rules="rules">
			<p>User info</p>
			<div class="row">
				<div class="col-6">
					<el-form-item prop="firstName">
						<el-input placeholder="First Name" v-model="form.firstName" prefix-icon="el-icon-user" />
					</el-form-item>
				</div>
				<div class="col-6">
					<el-form-item prop="lastName">
						<el-input placeholder="Last Name" v-model="form.lastName" prefix-icon="el-icon-user" />
					</el-form-item>
				</div>
				<div class="col-12">
					<el-form-item prop="email">
						<el-input placeholder="Email" v-model="form.email" prefix-icon="el-icon-message" />
					</el-form-item>
				</div>
				<div class="col-6">
					<el-form-item prop="password">
						<el-input
							placeholder="Password"
							type="password"
							autocomplete="off"
							v-model="form.password"
							prefix-icon="el-icon-lock"
						/>
					</el-form-item>
				</div>
				<div class="col-6">
					<el-form-item prop="passwordConfirm">
						<el-input
							placeholder="Confirm password"
							type="password"
							autocomplete="off"
							v-model="form.passwordConfirm"
							prefix-icon="el-icon-lock"
						/>
					</el-form-item>
				</div>
			</div>
			<p>Select avatar</p>
			<div class="row">
				<div class="col-12">
					<el-form-item>
						<el-radio
							v-model="form.avatar"
							v-for="(eachAvatar, key) in returnAllIcons"
							:key="eachAvatar"
							:label="key"
						>
							<el-avatar :size="70" :src="eachAvatar"></el-avatar>
						</el-radio>
					</el-form-item>
				</div>
			</div>
			<el-divider></el-divider>
		</el-form>
		<div class="row">
			<div class="col-12">
				<el-button type="primary" class="float-right" @click="submitForm('form')">Update</el-button>
			</div>
		</div>
	</el-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { rules } from "../common/rules";
import { validation } from "../common/validation";
import { goToPath } from "../common/router-navigation";

export default {
	name: "EditAccount",
	mixins: [rules, validation, goToPath],
	data() {
		return {
			form: {
				firstName: "",
				lastName: "",
				email: "",
				avatar: "",
				password: "",
				passwordConfirm: ""
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.putEditUser(this.form)
					.then(() => {
						this.getUserInfo();
					})
					.catch(err => {
						console.error(err);
					});
				}
			});
		},
		...mapActions(["putEditUser", "getUserInfo"])
	},
	computed: {
		...mapGetters(["returnUserInfo", "returnAllIcons"])
	},
	watch: {
		returnUserInfo: {
			immediate: true,
			handler() {
				const userData = this.returnUserInfo;

				this.form.firstName = userData.firstName;
				this.form.lastName = userData.lastName;
				this.form.email = userData.email;
				this.form.avatar = userData.avatar;
			}
		}
	}
};
</script>
<template>
	<div class="card-space main">
		<el-card>
			<el-page-header @back="goToPath('/')" content="Edit account"></el-page-header>
			<el-form ref="form" :model="form" :rules="rules">
				<p>User info</p>
				<el-row :gutter="20">
					<el-col :span="12">
						<el-form-item prop="firstName">
							<el-input placeholder="First Name" v-model="form.firstName" prefix-icon="el-icon-user" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="lastName">
							<el-input placeholder="Last Name" v-model="form.lastName" prefix-icon="el-icon-user" />
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item prop="email">
							<el-input placeholder="Email" v-model="form.email" prefix-icon="el-icon-message" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="passwordRegisterFirst">
							<el-input
								placeholder="Password"
								type="password"
								autocomplete="off"
								v-model="form.passwordRegisterFirst"
								prefix-icon="el-icon-lock"
							/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item prop="passwordRegisterSecond">
							<el-input
								placeholder="Confirm password"
								type="password"
								autocomplete="off"
								v-model="form.passwordRegisterSecond"
								prefix-icon="el-icon-lock"
							/>
						</el-form-item>
					</el-col>
				</el-row>
				<p>Select avatar</p>
				<el-row :gutter="20">
					<el-col :span="24">
						<el-form-item>
							<el-radio v-model="form.avatar" v-for="(eachAvatar, key) in logo" :key="eachAvatar" :label="key">
								<el-avatar :size="70" :src="eachAvatar"></el-avatar>
							</el-radio>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<el-button @click="goToPath('/')">Cancel</el-button>
			<el-button type="primary" @click="submitForm('form')">Update</el-button>
		</el-card>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { rules } from "../common/rules";
import { validation } from "../common/validation";
import { goToPath } from "../common/router-navigation";
import { avatar } from "../common/user-avatar";

export default {
	name: "EditAccount",
	mixins: [rules, validation, goToPath, avatar],
	data() {
		return {
			form: {
				firstName: "",
				lastName: "",
				email: "",
				avatar: "",
				passwordRegisterFirst: "",
				passwordRegisterSecond: ""
			},
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.editUserAccount({
						firstName: this.form.firstName,
						lastName: this.form.lastName,
						email: this.form.email,
						password: this.form.passwordRegisterFirst,
						passwordConfirm: this.form.passwordRegisterSecond,
						avatar: this.form.avatar
					})
						.then(() => {
							this.getUserInfo();
						})
						.catch(err => {
							console.error(err);
						});
				}
			});
		},
		...mapActions(["editUserAccount", "getUserInfo"])
	},
	computed: {
		...mapGetters(["returnUserInfo"])
	},
	watch: {
		returnUserInfo: {
			immediate: true,
			handler() {
				const userData = this.returnUserInfo

				this.form.firstName = userData.firstName
				this.form.lastName = userData.lastName
				this.form.email = userData.email
				this.form.avatar = userData.avatar
			}
		}
	}
};
</script>
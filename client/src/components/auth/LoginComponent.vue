<template>
	<el-container>
		<el-main>
			<el-card class="box-card login">
				<div class="bear-align">
					<div class="bear body bodySlant">
						<div class="face"></div>
						<div class="features"></div>
					</div>
				</div>
				<p class="login-register-text">Login</p>
				<el-form ref="form" :model="form" :rules="rules">
					<el-form-item prop="email">
						<el-input placeholder="Email" v-model="form.email" prefix-icon="el-icon-message" />
					</el-form-item>
					<el-form-item prop="password">
						<el-input
							placeholder="Password"
							type="password"
							autocomplete="off"
							v-model="form.password"
							prefix-icon="el-icon-lock"
						/>
					</el-form-item>
				</el-form>
				<el-button type="primary" class="login-button" @click="submitForm('form')">Login</el-button>
			</el-card>
			<div class="register-login-info-text">
				<p>
					Don't have an account?
					<span class="button-text" @click="goToPath('/register')">Click here to register!</span>
				</p>
			</div>
		</el-main>
	</el-container>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "./common/rules";
import { validation } from "./common/validation";
import { goToPath } from "./common/routerNavigation";

export default {
	name: "LoginComponent",
	mixins: [rules, validation, goToPath],
	data() {
		return {
			form: {
				email: "",
				password: ""
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.logInUserAccount({
						email: this.form.email,
						password: this.form.password
					}).catch(err => {
						console.error(err);
					});
				}
			});
		},
		...mapActions(["logInUserAccount"])
	}
};
</script>
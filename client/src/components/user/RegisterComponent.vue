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
				<p class="login-register-text">Register</p>
				<el-form ref="form" :model="form" :rules="rules">
					<el-form-item prop="name">
						<el-input placeholder="Name" v-model="form.name" prefix-icon="el-icon-user" />
					</el-form-item>
					<el-form-item prop="email">
						<el-input placeholder="Email" v-model="form.email" prefix-icon="el-icon-message" />
					</el-form-item>
					<el-form-item prop="passwordRegisterFirst">
						<el-input
							placeholder="Password"
							type="password"
							autocomplete="off"
							v-model="form.passwordRegisterFirst"
							prefix-icon="el-icon-lock"
						/>
					</el-form-item>
					<el-form-item prop="passwordRegisterSecond">
						<el-input
							placeholder="Confirm password"
							type="password"
							autocomplete="off"
							v-model="form.passwordRegisterSecond"
							prefix-icon="el-icon-lock"
						/>
					</el-form-item>
				</el-form>
				<el-button type="primary" class="login-button" @click="submitForm('form')">Register</el-button>
			</el-card>
			<div class="register-login-info-text">
				<p>
					Need to login?
					<span class="button-text" @click="goToPath('/login')">Click here to register!</span>
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
	name: "RegisterComponent",
	mixins: [rules, validation, goToPath],
	data() {
		return {
			form: {
				name: "",
				email: "",
				passwordRegisterFirst: "",
				passwordRegisterSecond: ""
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.registerUserAccount({
						name: this.form.name,
						email: this.form.email,
						password: this.form.passwordRegisterFirst
					}).catch(err => {
						console.error(err);
					});
				}
			});
		},
		...mapActions(["registerUserAccount"])
	}
};
</script>
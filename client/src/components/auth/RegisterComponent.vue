<template>
	<div class="container-fluid">
		<el-card class="box-card login">
			<div class="bear-align">
				<div class="bear body bodySlant">
					<div class="face"></div>
					<div class="features"></div>
				</div>
			</div>
			<p class="login-register-text">Register</p>
			<el-form ref="form" :model="form" :rules="rules">
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
			</el-form>
			<el-button type="primary" class="login-button" @click="submitForm('form')">Register</el-button>
		</el-card>
		<div class="register-login-info-text">
			<p>
				Need to login?
				<span class="button-text" @click="goToPath('/login')">Click here to login!</span>
			</p>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import { rules } from "../common/rules";
import { validation } from "../common/validation";
import { goToPath } from "../common/router-navigation";

export default {
	name: "RegisterComponent",
	mixins: [rules, validation, goToPath],
	data() {
		return {
			form: {
				firstName: "",
				lastName: "",
				email: "",
				password: "",
				passwordConfirm: ""
			}
		};
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					this.postRegisterUser(this.form)
					.catch(err => {
						console.error(err);
					});
				}
			});
		},
		...mapActions(["postRegisterUser"])
	}
};
</script>
<template>
	<el-card>
		<el-page-header @back="goToPath('/')" :content="labels[type].header"></el-page-header>
		<el-form ref="form" :model="form">
			<p>List Info</p>
			<div class="row">
				<div class="col-12">
					<el-form-item>
						<el-input placeholder="List name" v-model="form.name" prefix-icon="el-icon-collection-tag" />
					</el-form-item>
				</div>
				<div class="col-lg-3 mt-2">
					<el-select v-model="form.type" class="el-form-item" clearable placeholder="Type">
						<el-option
							v-for="(item, key) in returnAllListTypes"
							:key="key"
							:label="`${item.icon} ${item.label}`"
							:value="key"
						></el-option>
					</el-select>
				</div>
				<div class="col-lg-3 mt-2">
					<el-date-picker class="el-form-item" v-model="form.date" type="date" placeholder="Due day"></el-date-picker>
				</div>
			</div>
			<p>Tasks</p>
			<div class="row">
				<div class="col-12">
					<ul class="todo">
						<transition-group name="bounce">
							<li v-for="(todo, key, index) in form.items" :key="key">
								<transition name="el-zoom-in-center">
									<el-button
										:type="form.items[key].done ? 'success':'default'"
										:icon="form.items[key].done ? 'el-icon-check': 'el-icon-close'"
										circle
										size="mini"
										@click="markTask(key)"
									></el-button>
								</transition>
								<el-input
									clearable
									v-model="form.items[key].text"
									:class="{ 'done': form.items[key].done }"
									:placeholder="`Fill in Task ${index + 1}...`"
									:disabled="form.items[key].done"
								></el-input>
								<el-button type="danger" icon="el-icon-delete" circle size="mini" @click="deleteItem(key)"></el-button>
							</li>
						</transition-group>
					</ul>
				</div>
			</div>
			<el-divider></el-divider>
		</el-form>
		<div class="row">
			<div class="col-12">
				<el-button
					type="primary"
					class="float-right"
					@click="submitForm('form')"
				>{{ labels[type].button }}</el-button>
				<el-button type="success" icon="el-icon-plus" @click="pushItems">Add a Task</el-button>
			</div>
		</div>
	</el-card>
</template>


<script>
import { goToPath } from "../common/router-navigation";
import { listTypes } from "../common/list-type";
import { mapActions, mapGetters } from "vuex";

export default {
	name: "ViewList",
	mixins: [goToPath, listTypes],
	data() {
		return {
			type: "add",
			form: {
				name: null,
				type: null,
				date: null,
				items: {}
			},
			labels: {
				add: {
					header: "Add list",
					button: "Save"
				},
				edit: {
					header: "Edit list",
					button: "Update"
				}
			}
		};
	},
	created() {
		this.type = this.$route.params.type;

		if (this.type === "edit") {
			this.form = JSON.parse(
				JSON.stringify(this.returnList(this.$route.params.id))
			); // get rid of getters and setters
		}
	},
	methods: {
		pushItems() {
			this.$set(this.form.items, this.getUniqueId("task"), {
				done: false,
				text: ""
			});
		},
		markTask(key) {
			this.form.items[key].done = !this.form.items[key].done;
		},
		deleteItem(key) {
			this.$delete(this.form.items, key);
		},
		getUniqueId(value) {
			return `${value}-${~~Date.now()}`;
		},
		submitForm(formName) {
			this.$refs[formName].validate(valid => {
				if (valid) {
					let data = this.form;

					Object.assign(data, {
						_id: this.$route.params.id || this.getUniqueId("list")
					});

					this.putListData(data)
						.then(() => {
							this.getListData();
						})
						.catch(err => {
							console.error(err);
						});
				}
			});
		},
		...mapActions(["putListData", "getListData"])
	},
	computed: {
		...mapGetters(["returnAllListTypes", "returnList"])
	}
};
</script>
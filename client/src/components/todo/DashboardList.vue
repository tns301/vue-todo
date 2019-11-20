<template>
	<el-card>
		<div class="el-page-header__content ml-2">
			<i class="el-icon-s-data"></i> Dashboard
		</div>
		<div class="tables">
			<p class="mt-4">
				<i class="el-icon-date"></i> Today &amp; upcoming tasks
			</p>
			<el-table :data="returnTodayList" :default-sort="{ prop: 'date', order: 'ascending' }" >
				<el-table-column prop="date" label="Date" sortable></el-table-column>
				<el-table-column prop="name" label="Name"></el-table-column>
			</el-table>
			<p class="mt-5">
				<i class="el-icon-alarm-clock"></i> Overdue tasks
			</p>
			<el-table :data="returnOverdueList" class="overdue">
				<el-table-column prop="date" label="Date"></el-table-column>
				<el-table-column prop="name" label="Name"></el-table-column>
			</el-table>
		</div>
	</el-card>
</template>


<script>
import { mapGetters } from "vuex";
export default {
	name: "DashboardList",
	computed: {
		...mapGetters(["returnTodayList", "returnOverdueList"])
	}
};
</script>
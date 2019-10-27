// Vue
import Vue from "vue";
import App from "./App.vue";

// UI libs
import "./plugins/element-ui/element.js";

// Vuex
import store from "./store/store.js";

// Router
import router from "./router/router"

Vue.config.productionTip = false

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount("#app")

import CsTimeAgo from "./CsTimeAgo.vue";

export default {
	install(Vue, options) {
		// Let's register our component globally
		// https://vuejs.org/v2/guide/components-registration.html
		Vue.component("cs-time-ago", CsTimeAgo);
	},
};

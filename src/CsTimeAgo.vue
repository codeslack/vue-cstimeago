<template>
	<div id="v-cstimeago">
		<slot name="prepend" />

		<span v-text="time_ago" />

		<slot name="append" />
	</div>
</template>

<script>
import eventTimer from "../src/lib/index";
export default {
	name: "CsTimeAgo",
	props: {
		datetime: {
			type: [String, Date, Number],
			default: function () {
				return new Date();
			},
		},
	},

	data() {
		return {
			time_ago: "",
		};
	},
	methods: {
		loadTimer() {
			let time = eventTimer(this.datetime);
			this.time_ago = time;
		},
	},
	mounted() {
		this.$nextTick(() => {
			this.loadTimer();
		});
	},
};
</script>

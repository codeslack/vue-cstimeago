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
		refresher: {
			type: [Number, Boolean],
			default: true,
		},
	},

	data() {
		return {
			time_ago: "",
			intVal: null,
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
			if (this.refresher) {
				this.refresher === true ? 60 : this.refresher;
				this.intVal = setInterval(
					this.loadTimer,
					this.refresher * 1000
				);
			}
		});
	},
	destroyed() {
		if (this.intVal) clearInterval(this.intVal);
	},
};
</script>

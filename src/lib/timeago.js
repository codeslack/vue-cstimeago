class TimeAgo {
	constructor(dateTime) {
		this.dateTime = dateTime;
	}

	time_ago() {
		let time = this.dateTime;
		switch (typeof time) {
			case "number":
				break;
			case "string":
				time = +new Date(time);
				break;
			case "object":
				if (time.constructor === Date) time = time.getTime();
				break;
			default:
				time = +new Date();
		}
		var time_indexs = [
			[60, "seconds", 1],
			[120, "1 minute ago", "1 minute from now"],
			[3600, "minutes", 60],
			[7200, "1 hour ago", "1 hour from now"],
			[86400, "hours", 3600],
			[172800, "Yesterday", "Tomorrow"],
			[604800, "days", 86400],
			[1209600, "Last week", "Next week"],
			[2419200, "weeks", 604800],
			[4838400, "Last month", "Next month"],
			[29030400, "months", 2419200],
			[58060800, "Last year", "Next year"],
			[2903040000, "years", 29030400],
			[5806080000, "Last century", "Next century"],
			[58060800000, "centuries", 2903040000],
		];
		var seconds = (+new Date() - time) / 1000,
			message = "ago",
			pickup = 1;

		if (seconds == 0) {
			return "Just now";
		}
		if (seconds < 0) {
			seconds = Math.abs(seconds);
			message = "from now";
			pickup = 2;
		}
		var i = 0,
			index;
		while ((index = time_indexs[i++]))
			if (seconds < index[0]) {
				if (typeof index[2] == "string") return index[pickup];
				else
					return (
						Math.floor(seconds / index[2]) +
						" " +
						index[1] +
						" " +
						message
					);
			}
		return time;
	}
}

export default TimeAgo;

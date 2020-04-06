import TimeAgo from "./timeago";

const factory = (eventTime) => new TimeAgo(eventTime).time_ago();

export default factory;

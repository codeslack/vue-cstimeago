# vue-cstimeago

vue js time ago

## Installation

Get from npm / yarn:

```js
npm i vue-cstimeago
```

```js
yarn add vue-cstimeago
```

## Usage

Use this inside your app:

```html
<template>
	<cs-time-ago :datetime="new Date()">
		<template slot="prepend">
			<i fas-fa-time></i>
		</template>
	</cs-time-ago>
</template>

<script>
	import CsTimeAgo from "vue-cstimeago";

	export default {
		name: "app",
		components: {
			CsTimeAgo,
		},
	};
</script>
```

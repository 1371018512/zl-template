<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
	export default {
		name: 'App',
		components: {}
	}
</script>

<style>
	body {
		margin: 0;
	}

	.icon {
		width: 1em;
		height: 1em;
		vertical-align: -0.15em;
		fill: currentColor;
		overflow: hidden;
	}
	
	pre {
		white-space: pre-wrap;
		white-space: -moz-pre-wrap;
		white-space: -pre-wrap;
		white-space: -o-pre-wrap;
		*word-wrap: break-word;
		*white-space : normal ;  
		font-family: "Microsoft YaHei";
		margin: 0;
		color: #4f4f4f;
	}
	
	* {
	}
</style>

<template>
	<view >

	</view>
</template>
<script lang="uts">
	import View from 'android.view.View'

	export default {
		name: "xxx-view",

		data() {
			return {}
		},

		NVLoad(): View {
			//必须实现，注意：容器组件需要返回ViewGroup或其子类
			return new View(this.$androidContext)
		}
	}
</script>


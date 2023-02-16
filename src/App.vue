<script setup>
	import Header from '../src/components/Header.vue';
	import Footer from '../src/components/Footer.vue';
</script>

<template>
	<header class="header__container content">
		<Header />
	</header>
	<main>
		<router-view />
	</main>
	<footer>
		<Footer />
	</footer>
	
</template>

<style lang="scss"></style>
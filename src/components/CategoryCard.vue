<script setup>
    const props = defineProps({
        src: String,
        alt: String,
        title: String,
    });
</script>

<template>
    <img :src="src" :alt="alt" />
    <h4>{{ title }}</h4>
</template>
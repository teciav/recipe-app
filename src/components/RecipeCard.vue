<script setup>
    const props = defineProps({
        src: String,
        alt: String,
        title: String,
        category: String
    });
</script>

<template>
    <img :src="src" :alt="alt" class="recipe-card__image"/>
    <h4 class="recipe-card__title">{{ title }}</h4>
    <p class="recipe__category" v-if="category">{{ category }}</p>
</template>
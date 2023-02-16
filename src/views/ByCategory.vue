<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import axiosClient from '../axiosClient.js'
    import RecipeCard from '../components/RecipeCard.vue';

    const route = useRoute();
    const recipes = ref({});
    const category = route.params.category;

    onMounted(() => {
        axiosClient.get(`filter.php?c=${route.params.category}`)
            .then(({ data }) =>  {
                recipes.value = data.meals;
            })
    })
</script>

<template>
    <div class="recipe-by-category__container">
        <div class="content">
            <h2 class="title"> {{ category }} recipes</h2>

            <div class="grid">
                <div v-for="recipe of recipes" :key="recipe.idMeal" class="recipe-card__container">
                    <router-link :to="{name: 'recipeDetails', params: {id: recipe.idMeal}}">
                        <RecipeCard
                            :src="recipe.strMealThumb"
                            :alt="recipe.strMeal"
                            :title="recipe.strMeal"
                        />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
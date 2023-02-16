<script setup>
    import { onMounted, ref } from 'vue';
    import axiosClient from '../axiosClient.js'
    import RecipeCard from '../components/RecipeCard.vue';
    import CategoryCard from '../components/CategoryCard.vue';

    // onload, categories, random:
    let categories = ref([]);
    let randomRecipes = ref([]);

    async function getCategories() {
        const responseCategories = await axiosClient.get('categories.php');
        categories.value = responseCategories.data.categories;
    }

    async function getRandomRecipes() {
        const responseRandomRecipes = await axiosClient.get('filter.php?c=Miscellaneous');
        const randomRecipesAll = responseRandomRecipes.data.meals;
        randomRecipes.value = randomRecipesAll.sort(() => Math.random() - Math.random()).slice(0, 6);
    }

    onMounted(() => {
        getRandomRecipes();
        getCategories();
    })

    // search:
    const keyword = ref('');
    let recipes = ref([]);

    async function searchRecipes() {
        const response = await axiosClient.get(`search.php?s=${keyword.value}`);
        recipes.value = response.data.meals;
    }
</script>

<template>
    <div class="search__container content">
        <input 
            type="text" 
            class="search__input" 
            placeholder="Search for recipes" 
            v-model="keyword"
            @change="searchRecipes"
        />
        <button class="search-button button">Search</button>    
    </div>

    <div class="search-results__container" v-if="recipes.length > 0">
        <div class="content">
            <h2 class="title">Search results for "{{ keyword }}":</h2>
            <div class="grid">
                <div v-for="recipe of recipes" :key="recipe.idMeal" class="recipe-card__container">
                    <router-link :to="{name: 'recipeDetails', params: {id: recipe.idMeal}}">
                        <RecipeCard
                            :src="recipe.strMealThumb"
                            :alt="recipe.strMeal"
                            :title="recipe.strMeal"
                            :category="recipe.strCategory"
                        />
                    </router-link>
                </div>
            </div>
        </div>
    </div>

    <div class="home-container">
        <div class="content">
            <h2 class="title">Most popular recipes this week</h2>
            <div class="grid">
                <div v-for="randomRecipe of randomRecipes" :key="randomRecipe.idMeal" class="recipe-card__container">
                    <router-link :to="{name: 'recipeDetails', params: {id: randomRecipe.idMeal}}">
                        <RecipeCard
                            :src="randomRecipe.strMealThumb"
                            :alt="randomRecipe.strMeal"
                            :title="randomRecipe.strMeal"
                            :category="randomRecipe.strCategory"
                        />
                    </router-link>
                </div>
            </div>

            <div class="home__categories-section">
                <h2 class="title">Browse by category</h2>
                <div class="home__section-grid">
                    <div v-for="category of categories" :key="category.idCategory">
                        <router-link :to="{name: 'byCategory', params: {category: category.strCategory}}" class="category__card">
                            <CategoryCard
                                :src="category.strCategoryThumb"
                                :alt="category.strCategory"
                                :title="category.strCategory"
                            />
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
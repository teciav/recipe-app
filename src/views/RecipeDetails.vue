<script setup>
    import { onMounted, ref } from 'vue';
    import { useRoute } from 'vue-router';
    import axiosClient from '../axiosClient.js'

    const route = useRoute();
    const recipe = ref({});

    onMounted(() => {
        axiosClient.get(`lookup.php?i=${route.params.id}`)
            .then(({ data }) =>  {
                recipe.value = data.meals[0];
            })
    })
</script>

<template>
    <div class="recipe-details__container content">
        <div class="recipe-details__box">
            <img :src="recipe.strMealThumb" :alt="recipe.strMeal" class="recipe-details__image"/>
            <div class="recipe-details__info">
                <h1 class="recipe-details__title title">{{ recipe.strMeal }}</h1>
                <router-link :to="{name: 'byCategory', params: {category: recipe.strCategory}}">
                    <div class="recipe__category">{{ recipe.strCategory }}</div>
                </router-link>
            </div>
        </div>  
        <div class="recipe-details__ingredients-measures">
            <h3 class="title recipe-details__ingredients-title">Ingredients:</h3>
            <div class="recipe-details__ingredients">
                
                <ul>
                    <template v-for="(el, i) of new Array(20)">
                        <li v-if="recipe[`strIngredient${i + 1}`]">
                            {{ recipe[`strIngredient${i + 1}`] }}:
                        </li>
                    </template>
                </ul>
            </div>
            <div class="recipe-details__measures">
                <ul>
                    <template v-for="(el, i) of new Array(20)">
                        <li v-if="recipe[`strMeasure${i + 1}`]">
                            {{ recipe[`strMeasure${i + 1}`] }}
                        </li>
                    </template>
                </ul>
            </div>
        </div>
        
        <div class="recipe-details_instructions-box">
            <h3 class="title recipe-details_instructions-title">Instructions:</h3>
            <div> {{ recipe.strInstructions }} </div>
            <a :href="recipe.strYoutube" target="_blank" class="recipe__video-link">Watch recipe video</a>
        </div>
    </div>
</template>
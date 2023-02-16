import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ByCategory from '../views/ByCategory.vue';
import RecipeDetails from '../views/RecipeDetails.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/categories/:category?',
		name: 'byCategory',
		component: ByCategory
	},
	{
		path: '/recipe/:id?',
		name: 'recipeDetails',
		component: RecipeDetails
	}
]
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
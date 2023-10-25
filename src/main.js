import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';
import CurrentWeather from './components/CurrentWeather.vue';

const app = createApp(App);

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/currentWeather/:city',
            component: CurrentWeather,
            props: true,
        },
    ],
});

app.use(router);
app.mount('#app');

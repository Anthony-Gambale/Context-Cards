import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import { createApp } from 'vue';
import { inject } from '@vercel/analytics';
import { createRouter, createWebHistory } from 'vue-router'; // Updated import

inject();

// Import your component(s) here
import App from './App.vue';

// Use VueRouter by installing it into your app instance
const app = createApp(App);
app.use(createRouter({
  history: createWebHistory(),
  routes: [] // Add your routes here
})); 

app.mount('#app');

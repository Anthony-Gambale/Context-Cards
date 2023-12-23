import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createApp } from 'vue'
import { inject } from '@vercel/analytics';
import App from './App.vue'

console.log('about to run inject')
inject();
console.log('just ran inject')
createApp(App).mount('#app')
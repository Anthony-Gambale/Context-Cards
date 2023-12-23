import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import { createApp } from 'vue'
import { inject } from '@vercel/analytics';
import App from './App.vue'

createApp(App).mount('#app')
inject();
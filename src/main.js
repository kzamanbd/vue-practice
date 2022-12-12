import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import helpers from './helpers';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/main.css';

const app = createApp(App).use(store).use(router).use(helpers);
app.mount('#app');

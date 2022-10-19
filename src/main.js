import { createApp } from "vue";
import "./registerServiceWorker";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "bootstrap";
import './styles.scss';

const app = createApp(App).use(store).use(router);

// axios default configuration
import axios from "./plugins/axios";
app.config.globalProperties.$axios = axios;

app.mount("#app");

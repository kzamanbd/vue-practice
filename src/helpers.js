// vue global components

import TopHeader from '@/components/TopHeader.vue';
// axios default configuration
import axios from './plugins/axios';
export default {
    install(app) {
        app.config.globalProperties.$axios = axios;
        app.component('TopHeader', TopHeader);
    },
};

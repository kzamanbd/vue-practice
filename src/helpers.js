//! vue global config
import TopHeader from '@/components/TopHeader.vue';
import axios from './plugins/axios';

export default {
    install(app) {
        app.config.globalProperties.$axios = axios;
        app.component('TopHeader', TopHeader);
    },
};

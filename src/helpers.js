// vue global components

import TopHeader from '@/components/TopHeader';
export default {
    install(app) {
        app.component('TopHeader', TopHeader);
    }
};
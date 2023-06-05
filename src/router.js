import store from '@/store';
import { createRouter, createWebHistory } from 'vue-router';

import HomeView from '@/views/HomeView.vue';
import NotFound from '@/views/NotFound.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Vue App',
            component: HomeView,
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },

        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/UserLogin.vue'),
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },

        {
            path: '/blog',
            name: 'Blog',
            component: () => import('@/views/BlogPage.vue'),
            meta: {
                requiresAuth: false,
                layout: 'default',
            },
        },

        {
            path: '/profile',
            name: 'Profile',
            component: () => import('@/views/UserProfile.vue'),
            meta: {
                requiresAuth: true,
                layout: 'default',
            },
        },

        {
            path: '/image-crop',
            name: 'Crop Image',
            component: () => import('@/views/ImageCrop.vue'),
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },

        {
            path: '/select-checkbox',
            name: 'Select Checkbox',
            component: () => import('@/views/SelectCheckbox.vue'),
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },

        {
            path: '/flatpickr',
            name: 'FlatPicker',
            component: () => import('@/views/FlatPicker.vue'),
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },
        {
            path: '/test-report',
            name: 'TestReport',
            component: () => import('@/views/TestReport/TestReport.vue'),
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },
        {
            path: '/swiper-slider',
            name: 'SwiperSlide',
            component: () => import('@/views/SwiperSlide.vue'),
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },
        {
            path: '/apex-chart',
            name: 'ApexChart',
            component: () => import('@/views/ApexChart.vue'),
            meta: {
                requiresAuth: false,
                layout: 'blank',
            },
        },

        {
            path: '/:pathMatch(.*)*',
            name: 'Not found',
            component: NotFound,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const currentUser = store.getters.loggedIn;
    document.title = to.name + ' | Simple Vue CLI Experimental Project';
    if (requiresAuth && !currentUser) {
        next('/login');
    } else if (to.path == '/login' && currentUser) {
        next('/');
    } else {
        next();
    }
});

export default router;

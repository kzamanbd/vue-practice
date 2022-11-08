import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Vue App",
            component: () => import("@/pages/IndexPage.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/login",
            name: "Login",
            component: () => import("@/pages/UserLogin.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/blog",
            name: "Blog",
            component: () => import("@/pages/BlogPage.vue"),
            meta: {
                requiresAuth: false,
                layout: "default",
            },
        },

        {
            path: "/profile",
            name: "Profile",
            component: () => import("@/pages/UserProfile.vue"),
            meta: {
                requiresAuth: true,
                layout: "default",
            },
        },

        {
            path: "/image-crop",
            name: "Crop Image",
            component: () => import("@/pages/ImageCrop.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/select-checkbox",
            name: "Select Checkbox",
            component: () => import("@/pages/SelectCheckbox.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/flatpickr",
            name: "FlatPicker",
            component: () => import("@/pages/FlatPicker.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/:pathMatch(.*)*",
            name: "Not found",
            component: () => import("@/pages/NotFound.vue"),
        },
    ],
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    const currentUser = store.getters.loggedIn;
    document.title = to.name + " | Simple Vue CLI Experimental Project";
    if (requiresAuth && !currentUser) {
        next("/login");
    } else if (to.path == "/login" && currentUser) {
        next("/");
    } else {
        next();
    }
});

export default router;

import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";


const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Vue App",
            component: () => import("@/views/IndexPage.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/login",
            name: "Login",
            component: () => import("@/views/UserLogin.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/blog",
            name: "Blog",
            component: () => import("@/views/BlogPage.vue"),
            meta: {
                requiresAuth: false,
                layout: "default",
            },
        },

        {
            path: "/profile",
            name: "Profile",
            component: () => import("@/views/UserProfile.vue"),
            meta: {
                requiresAuth: true,
                layout: "default",
            },
        },

        {
            path: "/image-crop",
            name: "Crop Image",
            component: () => import("@/views/ImageCrop.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/select-checkbox",
            name: "Select Checkbox",
            component: () => import("@/views/SelectCheckbox.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/flatpickr",
            name: "FlatPicker",
            component: () => import("@/views/FlatPicker.vue"),
            meta: {
                requiresAuth: false,
                layout: "blank",
            },
        },

        {
            path: "/:pathMatch(.*)*",
            name: "Not found",
            component: () => import("@/views/NotFound.vue"),
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

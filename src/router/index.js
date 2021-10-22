import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

const routes = [
    {
        path: "/login",
        name: "Login",
        component: () => import(/* webpackChunkName: "login" */ "@/views/Login"),
    },

    {
        path: "/",
        name: "Home",
        component: () => import(/* webpackChunkName: "base-home" */ "@/views/Home"),
    },

    {
        path: "/profile",
        name: "Profile",
        component: () => import(/* webpackChunkName: "profile" */ "@/views/Profile"),
        meta: {
            requiresAuth: true,
        },
    },
    {
        path: "/home",
        name: "Home !",
        component: () => import(/* webpackChunkName: "home" */ "@/views/Home"),
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: "/image-crop",
        name: "Crop Image",
        component: () => import(/* webpackChunkName: "image-crop" */ "@/views/ImageCrop"),
        meta: {
            requiresAuth: false,
        },
    },

    {
        path: "/logout",
        name: "Logout",
        component: () => import(/* webpackChunkName: "logout" */ "@/views/Logout"),
        meta: {
            requiresAuth: true,
        },
    },

    {
        path: "/select-checkbox",
        name: "Select Checkbox",
        component: () => import(/* webpackChunkName: "select-checkbox" */ "@/views/SelectCheckbox"),
        meta: {
            requiresAuth: false,
        },
    },

    {
        path: "*",
        name: "Not found",
        component: () => import("@/views/errors/404"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
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

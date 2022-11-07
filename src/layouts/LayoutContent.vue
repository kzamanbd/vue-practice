<template>
    <TopHeader />
    <slot />
</template>

<script setup>
    import { useStore } from 'vuex';
    const store = useStore();
    store.dispatch('user');
    store.dispatch('serverInit');
</script>

<style>
    a.router-link-exact-active {
        color: #42b983;
    }
    @media screen and (min-width: 992px) {
        .container-fluid {
            padding-left: 50px !important;
            padding-right: 50px !important;
        }
    }
</style>

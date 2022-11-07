<template>
    <component :is="resolveLayout">
        <router-view />
    </component>
</template>

<script>
    import LayoutBlank from '@/layouts/LayoutBlank.vue';
    import LayoutContent from '@/layouts/LayoutContent.vue';
    export default {
        name: 'App',
        components: {
            LayoutBlank,
            LayoutContent,
        },
        computed: {
            resolveLayout() {
                console.log(this.$route.meta.layout);
                if (this.$route.meta.layout === 'blank') {
                    return 'layout-blank';
                } else {
                    return 'layout-content';
                }
            },
        },
    };
</script>

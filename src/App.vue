<template>
    <component :is="resolveLayout">
        <router-view />
    </component>
</template>

<script setup>
    import { computed } from 'vue';
    import LayoutBlank from '@/layouts/LayoutBlank.vue';
    import LayoutContent from '@/layouts/LayoutContent.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const resolveLayout = computed(() => {
        if (route.meta.layout === 'default') {
            return LayoutContent;
        } else {
            return LayoutBlank;
        }
    });
</script>

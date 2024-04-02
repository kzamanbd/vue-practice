<template>
    <progress-bar />
    <component :is="resolveLayout">
        <router-view />
    </component>
</template>

<script setup>
    import { computed } from 'vue';
    import LayoutBlank from '@/layouts/LayoutBlank.vue';
    import LayoutContent from '@/layouts/LayoutContent.vue';
    import { useRoute } from 'vue-router';
    import ProgressBar from '@/components/ProgressBar.vue';

    const route = useRoute();
    const resolveLayout = computed(() => {
        if (route.meta.layout === 'default') {
            return LayoutContent;
        } else {
            return LayoutBlank;
        }
    });
</script>

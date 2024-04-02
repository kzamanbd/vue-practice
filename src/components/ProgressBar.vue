<template>
    <div v-show="isLoading" class="progress loading-container w-100">
        <div
            class="progress-bar"
            role="progressbar"
            :style="{ width: progress + '%' }"
            :aria-valuenow="progress"
            aria-valuemin="0"
            aria-valuemax="100"></div>
    </div>
</template>
<script setup>
    import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router';
    import { ref } from 'vue';

    const progress = ref(50);
    const isLoading = ref(false);
    console.log('ProgressBar', progress.value);
    // same as beforeRouteLeave option but with no access to `this`
    onBeforeRouteLeave((to, from) => {
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!');
        console.log('beforeRouteLeave', to, from);
        // cancel the navigation and stay on the same page
        if (!answer) return false;
    });

    // same as beforeRouteUpdate option but with no access to `this`
    onBeforeRouteUpdate(async (to, from) => {
        // only fetch the user if the id changed as maybe only the query or the hash changed
        console.log('beforeRouteUpdate', to, from);
    });
</script>
<style>
    .loading-container {
        position: absolute;
        top: 0;
        left: 0;
        height: 2px;
        z-index: 100;
    }
    .bg-primary {
        background-color: var(--blue) !important;
    }
</style>

<template>
    <swiper :slides-per-view="3" :space-between="50" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide v-for="item in 10" :key="item">
            <div class="swiper-slide-item">Slide {{ item }}</div>
        </swiper-slide>
    </swiper>
</template>
<script>
    // Import Swiper Vue.js components
    import { Swiper, SwiperSlide } from 'swiper/vue';
    // Import Swiper styles
    import 'swiper/css';

    export default {
        components: {
            Swiper,
            SwiperSlide,
        },
        setup() {
            const onSwiper = swiper => {
                console.log(swiper);
            };
            const onSlideChange = () => {
                console.log('slide change');
            };
            return {
                onSwiper,
                onSlideChange,
            };
        },
    };
</script>
<style scoped>
    .swiper-slide-item {
        min-height: 300px;
        background: #ddd;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>

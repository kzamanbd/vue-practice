<script setup>
    import { ref } from 'vue';
    import HelloWorld from '@/components/HelloWorld.vue';
    import TheWelcome from '@/components/TheWelcome.vue';
    import ContextMenu from '@/components/ContextMenu/ContextMenu.vue';
    import ContextMenuItem from '@/components/ContextMenu/ContextMenuItem.vue';

    const menu = ref(null);
    const closeMenu = () => {
        menu.value.close();
    };
</script>

<template>
    <div id="homeView" @contextmenu.prevent="$refs.menu.open($event, 'Payload')">
        <header>
            <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

            <div class="wrapper">
                <HelloWorld msg="You did it!" />
                <p>Right click to know more features</p>
            </div>
        </header>
        <main>
            <TheWelcome />
        </main>
        <ContextMenu ref="menu">
            <template v-slot="{ contextData }">
                <ContextMenuItem @click="closeMenu"> <a href="/blog" target="_blank">Blog</a> </ContextMenuItem>
                <ContextMenuItem @click="closeMenu">
                    <a href="/flatpickr" target="_blank">Date Time</a>
                </ContextMenuItem>
                <ContextMenuItem @click="closeMenu">
                    <a href="/select-checkbox" target="_blank">Select Checkbox</a>
                </ContextMenuItem>
                <ContextMenuItem @click="closeMenu">
                    <a href="/test-report" class="border-0" target="_blank">Test Report</a>
                </ContextMenuItem>
                <ContextMenuItem @click="closeMenu">
                    <a href="/swiper-slider" class="border-0" target="_blank">Swiper Slider</a>
                </ContextMenuItem>
                <ContextMenuItem @click="closeMenu"> Action 4 {{ contextData }} </ContextMenuItem>
                <ContextMenuItem @click="closeMenu"> Cancel </ContextMenuItem>
            </template>
        </ContextMenu>
    </div>
</template>

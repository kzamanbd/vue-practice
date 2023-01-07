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
                <ContextMenuItem @click="$router.push('/blog')"> Blog </ContextMenuItem>
                <ContextMenuItem @click="$router.push('/flatpickr')"> Date Time </ContextMenuItem>
                <ContextMenuItem @click="$router.push('/select-checkbox')"> Select Checkbox </ContextMenuItem>
                <ContextMenuItem @click="$router.push('/test-report')"> Test Report </ContextMenuItem>
                <ContextMenuItem @click="$router.push('/swiper-slider')"> Swiper Slider </ContextMenuItem>
                <ContextMenuItem @click="closeMenu"> Action 4 {{ contextData }} </ContextMenuItem>
                <ContextMenuItem @click="closeMenu"> Cancel </ContextMenuItem>
            </template>
        </ContextMenu>
    </div>
</template>
<style scoped>
    @media (min-width: 1024px) {
        #homeView {
            display: flex;
            place-items: center;
        }

        #homeView {
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 0 2rem;
        }
    }
    header {
        line-height: 1.5;
        max-height: 100vh;
    }

    .logo {
        display: block;
        margin: 0 auto 2rem;
    }

    nav {
        width: 100%;
        font-size: 12px;
        text-align: center;
    }

    nav a.router-link-exact-active {
        color: var(--color-text);
    }

    nav a.router-link-exact-active:hover {
        background-color: transparent;
    }

    nav a {
        display: inline-block;
        padding: 0 1rem;
        border-left: 1px solid var(--color-border);
    }

    nav a:first-of-type {
        border: 0;
    }

    @media (min-width: 1024px) {
        header {
            display: flex;
            place-items: center;
            padding-right: calc(var(--section-gap) / 2);
        }

        .logo {
            margin: 0 2rem 0 0;
        }

        header .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }

        nav {
            text-align: left;
            margin-left: -1rem;
            font-size: 1rem;
        }
    }
</style>

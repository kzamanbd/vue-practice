<template>
    <div class="container">
        <div class="justify-content-center d-flex align-items-center vh-100">
            <div class="hello h-100v">
                <h3>Features</h3>
                <ul>
                    <li>
                        <router-link to="/blog"> Blog </router-link>
                    </li>
                    <li>
                        <router-link to="/flatpickr"> Flatpickr </router-link>
                    </li>
                </ul>
                <h3>Essential Links</h3>
                <ul>
                    <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
                    <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
                    <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
                    <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
                    <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
                </ul>
                <h3>Ecosystem</h3>
                <ul>
                    <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
                    <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
                    <li>
                        <a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">
                            vue-devtools
                        </a>
                    </li>
                    <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
                    <li>
                        <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    li:first-child {
        margin-left: 0;
    }
    a {
        color: #42b983;
    }
</style>

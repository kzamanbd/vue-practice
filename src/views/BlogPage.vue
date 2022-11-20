<template>
    <div class="container-fluid">
        <div class="row d-flex justify-content-center align-items-center py-3 mb-3 banner">
            <div class="col-md-6">
                <div class="text-end px-3 d-flex justify-content-end">
                    <img src="@/assets/images/banner.svg" alt />
                </div>
            </div>
            <div class="col-md-6">
                <div class="content px-3">
                    <h2>বাংলার প্রোগ্রামিং নেটওয়ার্ক</h2>
                    <p class="my-2 text-dark-secondary">
                        <span># ব্লগ</span>
                        <span># টিউটোরিয়াল</span>
                        <span># চ্যালেঞ্জ</span>
                        <span># আলোচনা</span>
                        <span># CI/DC</span>
                    </p>

                    <button
                        v-if="!authUser"
                        class="btn btn-secondary d-flex align-items-center hover:bg-green-400 focus:outline-none hover:border-green-400"
                        @click="login">
                        <svg
                            stroke="currentColor"
                            fill="none"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            height="1em"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                            class="text-dark-secondary">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                            <circle cx="8.5" cy="7" r="4" />
                            <line x1="20" y1="8" x2="20" y2="14" />
                            <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                        <span class="ms-1">যুক্ত হোন</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-3">
                <LeftSideBar />
            </div>

            <div class="col-md-6">
                <div class="card bg-transparent border-0 mb-3">
                    <div class="card-body p-0">
                        <div v-if="authUser">
                            <textarea id name rows="3" class="form-control"></textarea>
                        </div>
                        <div v-else>
                            <p>Login</p>
                        </div>
                    </div>
                </div>
                <div class="post__list">
                    <div ref="postList">
                        <div v-for="post in posts" :key="post.id" class="card h-100 border-0 mb-3 bg-transparent post">
                            <div class="card-header d-flex justify-content-between p-0 mb-2 border-0 bg-transparent">
                                <a class="avatar d-flex align-items-center" href="#">
                                    <img
                                        :src="`https://ui-avatars.com/api/?background=random&name=${post.user.name}`"
                                        class="img-circle"
                                        alt="Profile Image" />
                                    <span class="ms-3">{{ post.user.name }}</span>
                                </a>
                                <ul class="nav navbar">
                                    <li class="px-1">
                                        <a href="#" class="d-flex align-items-center">
                                            <img src="@/assets/images/heart.svg" alt />
                                            <span class="ms-2">
                                                {{ post.comments.length }}
                                            </span>
                                        </a>
                                    </li>

                                    <li class="px-1">
                                        <a href="#" class="d-flex align-items-center">
                                            <img src="@/assets/images/bookmark.svg" alt />
                                            <span class="ms-2">20</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body p-0">
                                <router-link :to="`/${post.slug}`">
                                    <img
                                        v-if="post.image"
                                        :src="post.image"
                                        class="card-img-top img-rounded"
                                        alt="Blog Image"
                                        loading="lazy" />

                                    <h4 class="title my-3">{{ post.title }}</h4>
                                </router-link>

                                <p>Time: {{ post.posted }}</p>
                                <ul class="nav mb-2">
                                    <li v-for="(tag, index) in post.tags" :key="index" class="mx-1">
                                        <router-link :to="`/tags/${tag.slug}`">#{{ tag.name }}</router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="d-flex justify-content-center align-items-center col-md-12">
                            <div v-if="isLoading" class="spinner-border text-success" role="status"></div>
                        </div>
                    </div>

                    <div v-if="!isLoading" class="d-flex justify-content-center align-items-center py-2">
                        <a class="btn btn-success" href="#" @click.prevent="loadMore">
                            <b>LOAD MORE</b>
                        </a>
                    </div>
                </div>
            </div>

            <div class="col-md-3">
                <RightSideBar />
            </div>
        </div>
    </div>
    <!-- container -->
</template>

<script>
    import LeftSideBar from '@/components/LeftSideBar.vue';
    import RightSideBar from '@/components/RightSideBar.vue';

    export default {
        name: 'HomePage',
        components: {
            LeftSideBar,
            RightSideBar,
        },
        data() {
            return {
                posts: [],
                next_page: 1,
                isLoading: false,
            };
        },
        computed: {
            authUser() {
                return this.$store.getters.authUser;
            },
        },
        async created() {
            const response = await this.$axios.get('/posts');
            this.posts = await response.data.posts.data;
        },
        mounted() {
            window.addEventListener('scroll', this.getNextPosts);
        },
        unmounted() {
            window.removeEventListener('scroll', this.getNextPosts);
        },
        methods: {
            getNextPosts() {
                let bottomOfWindow =
                    document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
                if (bottomOfWindow) {
                    this.isLoading = true;
                    let page = this.next_page++;
                    this.$axios.get(`posts?page=${page}`).then(response => {
                        this.posts.push(...response.data.posts.data);
                        this.isLoading = false;
                    });
                }
            },

            loadMore() {
                this.isLoading = true;
                let page = this.next_page++;
                this.$axios.get(`posts?page=${page}`).then(response => {
                    this.posts.push(...response.data.posts.data);
                    this.isLoading = false;
                });
            },
        },
    };
</script>

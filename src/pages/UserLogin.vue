<template>
    <div class="container">
        <div class="row justify-content-center d-flex align-items-center vh-100">
            <div class="col-sm-6">
                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg text-center my-4">Sign in to start your session</p>

                        <form @submit.prevent="login">
                            <div class="input-group mb-3">
                                <input
                                    id="email"
                                    v-model="username"
                                    type="email"
                                    class="form-control"
                                    placeholder="Email Address"
                                    required />
                            </div>

                            <div class="input-group mb-3">
                                <input
                                    id="password"
                                    v-model="password"
                                    type="password"
                                    class="form-control"
                                    placeholder="Password"
                                    autocomplete="current-password"
                                    required />
                            </div>
                            <div class="row">
                                <!-- /.col -->
                                <div class="col-sm-12">
                                    <button type="submit" class="btn btn-success btn-block">
                                        <span>Sign In</span>
                                        <div
                                            v-if="isLoading"
                                            class="spinner-border spinner-border-sm ms-3"
                                            role="status">
                                            <span class="visually-hidden">Loading...</span>
                                        </div>
                                    </button>
                                </div>
                                <!-- /.col -->
                            </div>
                        </form>
                    </div>
                    <!-- /.login-card-body -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: 'zaman7u@gmail.com',
                password: '123456',
                isLoading: false,
            };
        },
        methods: {
            async login() {
                this.isLoading = true;
                try {
                    const response = await this.$axios.post('auth/login', {
                        email: this.username,
                        password: this.password,
                        device_name: 'Insomnia',
                    });
                    this.$store.commit('token', response.data.token);
                    localStorage.setItem('token', response.data.token);
                    this.$store.dispatch('user');
                    this.$router.push('/');
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                    console.log(error);
                }
            },
        },
    };
</script>

<style lang="scss" scoped></style>

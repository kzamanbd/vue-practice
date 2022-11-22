<template>
    <div class="container vh-100 overflow-hidden">
        <div class="card mt-3">
            <div class="card-body">
                <h4>User</h4>
                <div>
                    <table class="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">
                                    <div class="form-check" @click="selectAll">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            v-model="allSelected"
                                            id="flexCheckDefault" />
                                        <label class="form-check-label" for="flexCheckDefault">SL</label>
                                    </div>
                                </th>
                                <th scope="col">Name</th>
                                <th scope="col">Username</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in users" :key="item.id">
                                <td>
                                    <div class="form-check">
                                        <input
                                            :id="`flexCheckDefault${index}`"
                                            class="form-check-input"
                                            type="checkbox"
                                            @click="select(item)"
                                            :checked="item.selected" />
                                        <label class="form-check-label" :for="`flexCheckDefault${index}`">
                                            {{ index + 1 }}
                                        </label>
                                    </div>
                                </td>
                                <td>{{ item.name }}</td>
                                <td>{{ item.username }}</td>
                                <td>{{ item.email }}</td>
                                <td>{{ item.phone }}</td>
                                <td>{{ item.company?.name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <span
                    >Selected Ids:
                    {{
                        users
                            .filter(item => item.selected)
                            .map(item => item.name)
                            .join(',')
                    }}</span
                >
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SelectCheckbox',
        data() {
            return {
                users: [],
                allSelected: false,
            };
        },
        async created() {
            const response = await this.$axios.get('https://jsonplaceholder.typicode.com/users');
            this.users = response.data.map(item => {
                return {
                    ...item,
                    selected: false,
                };
            });
        },
        methods: {
            selectAll() {
                this.allSelected = !this.allSelected;
                this.users = this.users.map(item => {
                    return {
                        ...item,
                        selected: this.allSelected,
                    };
                });
            },
            select(user) {
                user.selected = !user.selected;
                if (this.users.filter(item => item.selected).length == this.users.length) {
                    this.allSelected = true;
                } else {
                    this.allSelected = false;
                }
            },
        },
    };
</script>

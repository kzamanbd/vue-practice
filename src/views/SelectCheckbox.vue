<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h4>User</h4>
                <div>
                    <table class="table table-striped">
                        <tr>
                            <th><input v-model="allSelected" type="checkbox" @click="selectAll" />SL</th>
                            <th>Name</th>
                        </tr>
                        <tr v-for="(user, index) in users" :key="user.id">
                            <td>
                                <input v-model="userIds" type="checkbox" :value="user.id" @click="select" />
                                {{ index + 1 }}
                            </td>
                            <td>{{ user.name }}</td>
                        </tr>
                    </table>
                </div>

                <span>Selected Ids: {{ userIds }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'SelectCheckbox',
        data() {
            return {
                users: [
                    { id: 'Shad', name: 'Shad' },
                    { id: 'Duane', name: 'Duane' },
                    { id: 'Myah', name: 'Myah' },
                    { id: 'Kamron', name: 'Kamron' },
                    { id: 'Brendon', name: 'Brendon' },
                ],
                allSelected: false,
                userIds: [],
            };
        },
        methods: {
            selectAll() {
                this.userIds = [];
                if (this.allSelected) {
                    this.allSelected = false;
                } else {
                    this.users.forEach(user => {
                        this.userIds.push(user.id.toString());
                    });
                }
            },
            select() {
                this.allSelected = false;
            },
        },
    };
</script>

<style scoped></style>

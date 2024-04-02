<script setup>
    import menus from '@/assets/menus.json';

    const filterMenus = menus.parents
        .map(m => {
            return {
                id: m.id,
                feature_name: m.group_name,
                description: m.description,
                for: null,
                icon: null,
                group_id: null,
                url: null,
                children: menus.children.filter(c => c.module_id === m.id),
            };
        })
        .filter(m => m.children.length);
    console.log([...filterMenus]);
</script>

<template>
    <div class="container">
        <div v-for="(menu, index) in filterMenus" :key="index" class="accordion" id="accordionExample">
            <div class="accordion-item">
                <h2 class="accordion-header" :id="`headingOne${index}`">
                    <button
                        class="accordion-button"
                        :class="index && 'collapsed'"
                        type="button"
                        data-bs-toggle="collapse"
                        :data-bs-target="`#collapseOne${index}`"
                        aria-expanded="false"
                        aria-controls="collapseOne">
                        {{ menu.feature_name }}
                    </button>
                </h2>
                <div
                    :id="`collapseOne${index}`"
                    class="accordion-collapse collapse"
                    :class="!index && 'show'"
                    data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                        <table class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Feature Name</th>
                                    <th>Description</th>
                                    <th>For</th>
                                    <th>Icon</th>
                                    <th>Group ID</th>
                                    <th>URL</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="child in menu.children" :key="child.id">
                                    <td>{{ child.feature_name }}</td>
                                    <td>{{ child.description }}</td>
                                    <td>{{ child.for }}</td>
                                    <td>{{ child.icon }}</td>
                                    <td>{{ child.group_id }}</td>
                                    <td>{{ child.url }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<template>
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh">
        <button
            type="button"
            class="btn btn-primary"
            @click="printReport"
            :disabled="loading"
            :class="{ disabled: loading }">
            Print Report
        </button>
    </div>
</template>
<script setup>
    import { ref } from 'vue';
    import template from './template';
    import token from './token';

    const loading = ref(false);
    const reportData = ref(null);

    const printReport = async () => {
        loading.value = true;
        const response = await fetch('http://api.jerpbd.com:8885/api/web/get-sales-evaluation-sdr-062i', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                depot_id: '218',
                area_id: 0,
                mio_spo: 0,
                target_type: 0,
                disc_exclude: 1,
                date_from: '15-12-2022',
                date_to: '16-12-2022',
            }),
        });
        reportData.value = await response.json();
        loading.value = false;
        console.log('reportData', reportData.value.data);
        const html = template(reportData.value.data);
        const myWindow = window.open('', '_blank');
        myWindow.document.write(html);
        myWindow.document.close();
        myWindow.print();
    };
</script>

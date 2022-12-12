<template>
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh">
        <button type="button" class="btn btn-primary" @click="printReport">Print Report</button>
    </div>
</template>
<script setup>
    import report from '@/static/report.json';
    import template from './template';

    const printReport = () => {
        console.log('print report', report);
        const html = template(report.data);
        const myWindow = window.open('', '_blank');
        myWindow.document.write(html);
        myWindow.document.close();
        myWindow.print();
    };
</script>

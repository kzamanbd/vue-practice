<script setup>
    import ApexCharts from 'vue3-apexcharts';
    const salesData = {
        series: [
            {
                name: 'Sales Q1',
                group: 'sales',
                type: 'column',
                data: [70889, 75249, 81859, 79929, 84160, 11707, null, null, null, null, null, null],
            },
            {
                name: 'Sales Q2',
                group: 'sales',
                type: 'column',
                data: [57088, 57524, 58185, 57999, 58410, 11107, null, null, null, null, null, null],
            },

            {
                name: 'Collection Q1',
                group: 'collection',
                type: 'column',
                data: [82834, 87715, 94499, 90876, 82978, 28318, null, null, null, null, null, null],
            },
            {
                name: 'Collection Q2',
                group: 'collection',
                type: 'column',
                data: [38234, 48715, 94499, 29076, 28278, 32838, null, null, null, null, null, null],
            },
            {
                name: 'Target Q1',
                type: 'line',
                data: [78834, 58715, 84499, 50276, 82978, 8318, null, null, null, null, null, null],
            },
        ],
    };

    var options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true,
            },
        },
        title: {
            text: 'Target vs Sales & Collection',
            style: {
                fontSize: '20px',
                fontWeight: '600',
                fontFamily: undefined,
                color: '#36454F',
            },
        },

        stroke: {
            width: 5,
            curve: 'smooth',
        },
        dataLabels: {
            formatter: val => {
                return Math.round(val / 1000) + 'K';
            },
            style: {
                fontSize: '10px',
                colors: ['#fff'],
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '100%',
            },
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        fill: {
            opacity: 1,
        },
        // colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
        yaxis: {
            labels: {
                formatter: val => {
                    return Math.round(val / 1000) + 'K';
                },
            },
        },
        markers: {
            size: 5,
            colors: ['#80c7fd', '#008FFB', '#80f1cb', '#00E396'],
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: y => {
                    if (typeof y !== 'undefined') {
                        try {
                            return y.toFixed(0);
                        } catch (e) {
                            console.log('y', y);
                            return y;
                        }
                    } else {
                        return y;
                    }
                },
            },
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
        },
    };
</script>

<template>
    <div class="row col-8">
        <ApexCharts :series="salesData.series" :options="options" />
    </div>
</template>

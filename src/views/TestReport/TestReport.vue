<template>
    <div class="print-button text-center">
        <button
            type="button"
            class="btn btn-link"
            @click="printReport"
            :disabled="loading"
            :class="{ disabled: loading }">
            Print Report
        </button>
    </div>
    <div ref="printableDom">
        <div class="table-scroll">
            <table>
                <thead>
                    <tr style="background: #f9f7f6">
                        <th rowspan="2">SL</th>
                        <th colspan="2">Territory Details</th>
                        <th colspan="3">Employee</th>
                        <th rowspan="2">Opening</th>
                        <th rowspan="2">Target</th>
                        <th rowspan="2">No of Inv</th>
                        <th colspan="5">Current Month Sales Status In MTP</th>
                        <th rowspan="2">VAT</th>
                        <th rowspan="2">Net Sales</th>
                        <th colspan="4">Collection</th>
                        <th rowspan="2">Replacement</th>
                        <th rowspan="2">Outstanding</th>
                        <th colspan="2">Achievement</th>
                    </tr>
                    <tr style="background: #f9f7f6">
                        <th>Code</th>
                        <th style="border: 1px solid #dedede; width: 160px">Name</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Desig.</th>
                        <th>Dispatch</th>
                        <th>Return</th>
                        <th>Ret. %</th>
                        <th>Discount</th>
                        <th>Actual Sales</th>
                        <th>Previous</th>
                        <th>Current</th>
                        <th>Total</th>
                        <th>In Transit</th>
                        <th>Sale %</th>
                        <th>Col %</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="(BU, index) in reportData?.data?.bu_data" :key="index">
                        <tr>
                            <td colspan="24" class="bold left">{{ BU.bu_name }}</td>
                        </tr>
                        <template v-for="(RSM, rsmIndex) in BU.rsm_info" :key="rsmIndex">
                            <!-- am data -->
                            <template v-for="(AM, amDtlIndex) in RSM.am_data" :key="amDtlIndex">
                                <!-- mio data -->
                                <template v-for="(MIO, mioIndex) in AM.mio_data" :key="mioIndex">
                                    <tr>
                                        <td>{{ MIO_SERIAL++ }}</td>
                                        <td>{{ MIO.mio_area_code }}</td>
                                        <td class="left width-160">{{ MIO.mio_area_name }}</td>
                                        <td>{{ MIO.mio_code }}</td>
                                        <td class="left">${{ MIO.mio_name }}</td>
                                        <td>{{ MIO.mio_desig }}</td>
                                        <td class="right">{{ numberFormat(MIO.mio_opening_dues) }}</td>
                                        <td class="right">{{ numberFormat(MIO.mio_target) }}</td>
                                        <td class="right">{{ MIO.no_of_inv }}</td>
                                        <td class="right">{{ numberFormat(MIO.dispatch) }}</td>
                                        <td class="right">{{ numberFormat(MIO.return_total) }}</td>
                                        <td class="right">{{ MIO.return_percent }}</td>
                                        <td class="right">{{ numberFormat(MIO.discount) }}</td>
                                        <td class="right">{{ numberFormat(MIO.actual_sales) }}</td>
                                        <td class="right">{{ numberFormat(MIO.inv_vat) }}</td>
                                        <td class="right">{{ numberFormat(MIO.net_sales) }}</td>
                                        <td class="right">{{ numberFormat(MIO.prev_coll) }}</td>
                                        <td class="right">{{ numberFormat(MIO.curr_coll) }}</td>
                                        <td class="right">{{ numberFormat(MIO.total_coll) }}</td>
                                        <td class="right">{{ numberFormat(MIO.in_transit_coll) }}</td>
                                        <td class="right">{{ MIO.credit_note }}</td>
                                        <td class="right">{{ numberFormat(MIO.total_outstandings) }}</td>
                                        <td class="right">{{ MIO.sales_achvmnt }}</td>
                                        <td class="right">{{ MIO.coll_achvmnt }}</td>
                                    </tr>
                                </template>
                                <!-- am detail -->
                                <template v-for="(amDtl, amDtlIndex) in RSM.am_dinfo" :key="amDtlIndex">
                                    <tr style="background: #f9f7f6">
                                        <td class="py-10 bold">{{ AM_SERIAL++ }}</td>
                                        <td class="py-10 bold">{{ am_area_code }}</td>
                                        <td class="py-10 bold left width-160">{{ am_area_name }}</td>
                                        <td class="py-10 bold">{{ amDtl.am_code }}</td>
                                        <td class="py-10 bold left">{{ amDtl.am_name }}</td>
                                        <td class="py-10 bold">{{ amDtl.am_desig }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_opening_dues) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_target) }}</td>
                                        <td class="py-10 bold right">{{ amDtl.am_no_of_inv }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_dispatch) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_return_total) }}</td>
                                        <td class="py-10 bold right">{{ amDtl.am_return_percent }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_discount) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_actual_sales) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_inv_vat) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_net_sales) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_prev_coll) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_curr_coll) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_total_coll) }}</td>
                                        <td class="py-10 bold right">{{ numberFormat(amDtl.am_in_transit_coll) }}</td>
                                        <td class="py-10 bold right">{{ amDtl.am_credit_note }}</td>
                                        <td class="py-10 bold right">
                                            {{ numberFormat(amDtl.am_total_outstandings) }}
                                        </td>
                                        <td class="py-10 bold right">{{ amDtl.am_sales_achvmnt }}</td>
                                        <td class="py-10 bold right">{{ amDtl.am_coll_achvmnt }}</td>
                                    </tr>
                                    <tr style="height: 5px"></tr>
                                </template>
                            </template>
                            <template v-for="(rsmDtl, rsmDtlIndex) in RSM.rsm_dinfo" :key="rsmDtlIndex">
                                <tr style="background: #f9f7f6">
                                    <td class="py-10 bold">{{ RSM_SERIAL++ }}</td>
                                    <td class="py-10 bold">{{ RSM.rsm_area_code }}</td>
                                    <td class="py-10 bold left width-160">{{ RSM.rsm_area_name }}</td>
                                    <td class="py-10 bold">{{ rsmDtl.rsm_code }}</td>
                                    <td class="py-10 bold left">{{ rsmDtl.rsm_name }}</td>
                                    <td class="py-10 bold">{{ rsmDtl.rsm_desig }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_opening_dues) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_target) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_no_of_inv) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_dispatch) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_return_total) }}</td>
                                    <td class="py-10 bold right">{{ rsmDtl.rsm_return_percent }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_discount) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_actual_sales) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_inv_vat) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_net_sales) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_prev_coll) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_curr_coll) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_total_coll) }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_in_transit_coll) }}</td>
                                    <td class="py-10 bold right">{{ rsmDtl.rsm_credit_note }}</td>
                                    <td class="py-10 bold right">{{ numberFormat(rsmDtl.rsm_total_outstandings) }}</td>
                                    <td class="py-10 bold right">{{ rsmDtl.rsm_sales_achvmnt }}</td>
                                    <td class="py-10 bold right">{{ rsmDtl.rsm_coll_achvmnt }}</td>
                                </tr>
                                <tr style="height: 5px"></tr>
                            </template>
                        </template>

                        <tr style="background: #f9f7f6">
                            <td colspan="5"></td>
                            <td class="py-10 bold">Total of {{ BU.bu_name }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_opening_dues) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_target) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_no_of_inv) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_dispatch) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_return_total) }}</td>
                            <td class="py-10 bold right">{{ BU.bu_return_percent }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_discount) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_actual_sales) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_inv_vat) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_net_sales) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_prev_coll) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_curr_coll) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_total_coll) }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_in_transit_coll) }}</td>
                            <td class="py-10 bold right">{{ BU.bu_credit_note }}</td>
                            <td class="py-10 bold right">{{ numberFormat(BU.bu_total_outstandings) }}</td>
                            <td class="py-10 bold right">{{ BU.bu_sales_achvmnt }}</td>
                            <td class="py-10 bold right">{{ BU.bu_coll_achvmnt }}</td>
                        </tr>
                        <tr style="height: 5px"></tr>
                    </template>
                    <tr style="background: #f9f7f6">
                        <td colspan="5"></td>
                        <td class="py-10 bold">DEPOT TOTAL</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_opening_dues) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_target) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_no_of_inv) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_dispatch) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_return_total) }}</td>
                        <td class="py-10 bold right">{{ reportData?.data?.wh_return_percent }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_discount) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_actual_sales) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_inv_vat) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_net_sales) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_prev_coll) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_curr_coll) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_total_coll) }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_in_transit_coll) }}</td>
                        <td class="py-10 bold right">{{ reportData?.data?.wh_credit_note }}</td>
                        <td class="py-10 bold right">{{ numberFormat(reportData?.data?.wh_total_outstandings) }}</td>
                        <td class="py-10 bold right">{{ reportData?.data?.wh_sales_achvmnt }}</td>
                        <td class="py-10 bold right">{{ reportData?.data?.wh_coll_achvmnt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
    import { ref, onUpdated } from 'vue';
    import template from './template';
    import token from './token';

    const loading = ref(false);
    const reportData = ref(null);
    const printableDom = ref(null);
    const RSM_SERIAL = ref(1);
    const MIO_SERIAL = ref(1);
    const AM_SERIAL = ref(1);

    const numberFormat = value => {
        if (isNaN(value)) {
            return 0;
        }
        return new Intl.NumberFormat('en-IN', {
            style: 'decimal',
            maximumFractionDigits: 2,
            minimumFractionDigits: 2,
        }).format(value);
    };
    onUpdated(function () {
        console.log(printableDom.value.innerHTML);
    });

    const printReport = async () => {
        reportData.value = null;
        RSM_SERIAL.value = 1;
        MIO_SERIAL.value = 1;
        AM_SERIAL.value = 1;
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
        console.log('reportData', printableDom.value.innerHTML);
        const html = template(reportData.value.data);
        const myWindow = window.open('', '_blank');
        myWindow.document.write(html);
        myWindow.document.close();
        myWindow.print();
    };
</script>
<style>
    @media print {
        .d-none {
            display: block !important;
        }
        .print-button {
            display: none !important;
        }
    }
    p,
    body {
        margin: 0;
    }
    table {
        color: #000;
        font-size: 12px;
        width: 100%;
        border-collapse: collapse;
        text-align: center;
        page-break-inside: auto;
    }
    table tr th,
    table tr td {
        font-family: 'Arial Narrow';
        border: 1px solid #dedede;
        padding-right: 2px !important;
    }
    thead p {
        font-size: 13px;
        line-height: 1;
        font-family: Calibri !important;
    }
    thead tr th {
        font-weight: bold;
    }
    .bold {
        font-weight: bold;
    }
    .left {
        text-align: left;
    }
    .right {
        text-align: right;
    }
    .center {
        text-align: center;
    }
    .py-10 {
        padding: 10px 0;
    }
    .width-160 {
        width: 160px;
    }
    .bg-gray {
        background-color: #f9f7f6;
    }
    .no-border {
        border: none;
        border-color: transparent;
    }
    @media only screen {
        .table-scroll {
            position: relative;
            width: 100%;
            z-index: 1;
            margin: auto;
            overflow: auto;
            height: 100vh;
        }
        .table-scroll table {
            width: 100%;
            min-width: 1280px;
        }
        .table-scroll thead {
            background: #ffffff;
            color: #000;
            position: -webkit-sticky;
            position: sticky;
            top: -1;
            z-index: 10;
        }
        .table-scroll table tbody:nth-of-type(1) tr:nth-of-type(1) td {
            border-top: none !important;
        }
        .table-scroll table thead th {
            border-top: none !important;
            border-bottom: none !important;
            box-shadow: inset 0 1px 0 #dedede, inset 0 -1px 0 #dedede;
            padding: 2px 0;
        }
        /* and one small fix for weird FF behavior, described in https://stackoverflow.com/questions/7517127/ */
        .table-scroll table thead th {
            background-clip: padding-box;
        }
    }
    @page {
        size: 17in 11in;
        margin: 1in 0.5in 0.5in 1in;
        border: 1px solid #dedede;
    }
</style>

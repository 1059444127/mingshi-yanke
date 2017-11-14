<template>
    <div class="">

    </div>
</template>

<script>
    import http from "../../lib/http"
    import weuijs from "weui.js"
    import {debug} from "../../lib/util"

    export default {
        data() {
            return {};
        },
        computed: {},
        components: {},
        created() {
            this.getData()
        },
        mounted() {


        },
        beforeDestroy() {

        },
        methods: {
            async getData(pageNum, pageSize = 10) {
                let loading = weuijs.loading("加载中..."), token = "18268256860";
                let ret = await http("smarthos.consult.pic.list.page", {pageSize, pageNum, token})
                loading.hide();
                debug("askdoc", ret)

            }
        }
    };
</script>

<style scoped lang="scss">

</style>

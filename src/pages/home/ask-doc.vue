<template>
    <div class="index-ask-doc">
        <scroll :pullup="pullup" @scrollToEnd="scrollToEnd" :listenScroll="listenScroll" :probeType="probeType"
                class="list"
                :height="scrollHeight"
                :data="list">
            <div>
                <consult-item v-for="(item ,index) in list" :item="item" :key="index"></consult-item>
            </div>
        </scroll>
        <router-link tag="div" to="/consult/add" class="add fixed">

        </router-link>
        <msg ref="msg"></msg>
    </div>
</template>

<script>
    import http from "../../lib/http"
    import weuijs from "weui.js"
    import {debug} from "../../lib/util"
    import {scrollHeightMixin} from "../../lib/mixin"
    import ConsultItem from "../../components/consult/item.vue"
    import Msg from "../../base/msg.vue"
    import Scroll from "../../base/scroll.vue"

    export default {
        data() {
            return {
                pullup: true,
                listenScroll: true,
                probeType: 2,
                pageNum: 1,
                hasNext: false,
                list: []
            };
        },
        computed: {
            bottomHeight() {
                return window.rem2px * (3.4 + 0.2 + 0.85) - 45
            }
        },
        mixins: [scrollHeightMixin],
        components: {Msg, ConsultItem, Scroll},
        created() {
            this.getData(this.pageNum);
        },
        mounted() {


        },
        beforeDestroy() {

        },
        methods: {
            scrollToEnd() {
                this.hasNext && this.getData(++this.pageNum);
            },

            async getData(pageNum = 1, pageSize = 10) {
                let loading = weuijs.loading("加载中..."), token = "18268256860";
                let ret = await http("smarthos.consult.pic.list.page", {pageSize, pageNum, token})
                loading.hide();
                if (ret.code == 0) {
                    this.list = this.list.concat(ret.list);
                    this.hasNext = false;
                    ret.page.pages != ret.page.pageNum && (this.hasNext = true)

                } else {
                    this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    .index-ask-doc {
        .add {
            $w: .3rem;
            @include w_h($w*4, $w*4);
            right: $commonSpace;
            bottom: $commonSpace;
            @include backgroundImageSet();
            background-image: url("../../../static/img/icon/icon.consult-add.fw.png");
        }
    }

    .list {
        overflow: hidden;
        > div {
            padding-bottom: .2rem;
        }
    }
</style>

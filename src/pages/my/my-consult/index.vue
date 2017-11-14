<template>
    <div class="page">
        <app-header title="我的咨询" class="noflex">
            <i slot="back"></i>
        </app-header>
        <div class="nav">
            <ul class="flex">
                <li class="flex0" v-for="item in nav">{{item.value}}</li>
            </ul>
        </div>
        <scroll class="wrapper list" :data="list" :height="scrollHeight">
            <div class="list">
                <consult-item v-for="(item ,index) in list" :key="index" :item="item"></consult-item>
            </div>
        </scroll>
    </div>
</template>

<script>
    import ConsultItem from "../../../components/consult/item.vue"
    import AppHeader from "../../../components/app-header.vue"
    import {scrollHeightMixin} from "../../../lib/mixin"
    import Scroll from "../../../base/scroll.vue"
    import config from "../../../lib/config"
    import {getConsultStatusText} from "../../../lib/util"
    import http from "../../../lib/http"

    export default {
        mixins: [scrollHeightMixin],
        data() {
            return {
                nav: config.consult_type_nav,
                list: []
            };
        },
        computed: {
            bottomHeight() {
                return window.rem2px * (0.9)
            }
        },
        components: {
            Scroll,
            AppHeader,
            ConsultItem
        },
        created() {
            this.postConsultList();
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            getConsultStatusText,
            postConsultList() {
                http("my.consult.list", {mock: true}).then((res) => {
                    this.list = res.data;
                })
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../../common/common";

    .wrapper {
        overflow: hidden;
    }

    .nav {
        ul {
            @include border();
            background-color: white;
        }
        li {
            &:nth-child(1) {
                @include border(right);
            }
            @include w_h(50%, 90px);
            line-height: 90px;
            text-align: center;
            font-size: 32px;
            background-image: url(../../../../static/img/icon/arrow-down.png);
            @include backgroundImageSet(22px, 22px, 750px/4 + 32px*2 + 10px, center)
        }
    }
</style>

<template>
    <div class="page index">
        <div class="wrapper" ref="main">
            <div class="banner swiper-container" ref="swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="ad in adsettings">
                        <img :src="ad.adUrl" alt="">
                    </div>
                </div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import config from "../lib/config"
    import http from "../lib/http"
    import {mainHeightMixin} from "../lib/mixin"
    export default {
        mixins: [mainHeightMixin],
        data() {
            return {
                adsettings: [],
                fastNav: config.index_fast_nav,
                nav: config.index_nav
            };
        },
        computed: {},
        components: {

        },
        created() {
            this.swiper = null;
        },
        mounted() {
            this.__initPage();
        },
        beforeDestroy() {

        },
        watch: {},
        methods: {
            __initPage() {
                this.swiperInit();
            },
            swiperInit() {
                setTimeout((res) => {
                    this.swiper = new Swiper(this.$refs.swiper, {
                        loop: true,
                        autoplay: 5000,
                        pagination: '.swiper-pagination',
                    });
                }, 20)
            },
        }
    };
</script>

<style lang="scss">
    @import "../common/common.scss";

    .index {
        $wrapperPadding: 12px;
        .wrapper {
        }

    }


</style>

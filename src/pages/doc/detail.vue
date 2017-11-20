<template>
    <div class="page flex doc">
        <app-header title="" class="flex0" ref="header">
            <i slot="back"></i>
        </app-header>
        <div class="main flex1 overflow-y-auto" ref="main">
            <div class="info">
                <ava-thumb class="ava" :src="doc.docAvatar|docAva"></ava-thumb>
                <div class="name center">
                    {{doc.docName}} <i>名医</i></div>
                <div class="dept center">{{doc.deptName}} {{doc.docTitle}}</div>
                <div class="hos center">{{doc.hosName}}</div>
            </div>
            <ul class="flex nav">
                <li v-for="nav in navs" @click="downloadApp" class="flex0 center" :class="[nav.name]">
                    <div class="icon"></div>
                    <div class="text">{{nav.value}}</div>
                </li>
            </ul>

            <div class="wrap">
                <div class="title">医生擅长</div>
                <div class="content" v-html="doc.docSkill||'暂无擅长'"></div>
            </div>
            <div class="wrap">
                <div class="title">医生介绍</div>
                <div class="content" v-html="doc.docResume||'暂无介绍'"></div>
            </div>
            <div class="wrap">
                <div class="title flex">
                    <span class="flex1">医生说</span>
                    <a @click="downloadApp" class="flex0">更多>></a>
                </div>
                <div class="content">
                    <doc-say v-for="(know,index) in knowlege" :key="index" :know="know"></doc-say>
                </div>
            </div>
        </div>
        <msg></msg>
    </div>
</template>

<script>
    import Msg from "../../base/msg.vue"
    import DocSay from "../../components/doc/doc-say.vue"
    import {mainHeightMixin, guideAppMixin} from "../../lib/mixin"
    import weuijs from "weui.js"
    import http from "../../lib/http"
    import {debug} from "../../lib/util"
    import config from "../../lib/config"
    import AppHeader from "../../components/app-header.vue"
    import {docAva} from "../../lib/filter"
    import AvaThumb from "../../base/ava-thumb.vue"

    export default {
        data() {
            return {
                id: "",
                doc: {},
                knowlege: [],
                navs: config.doc_nav
            };
        },
        computed: {},
        filters: {docAva},
        mixins: [mainHeightMixin, guideAppMixin],
        components: {AppHeader, DocSay, Msg, AvaThumb},
        created() {
            this.id = this.$route.params.id;
            this.init();
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            async init() {
                let docId = await this.getDetail();
                await this.getKnow(docId);
            },


            async getDetail() {
                let loading = weuijs.loading("加载中..."), docId = this.id;
                let ret = await http("smarthos.user.doc.card.get", {docId})
                loading.hide();
                if (ret.code == 0) {
                    this.doc = ret.obj.doc;
                } else {
                    this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
                }
                return docId;
            },

            async getKnow(docId) {
                let loading = weuijs.loading("加载中...");
                let ret = await http("smarthos.sns.knowledge.page", {docId})
                loading.hide();
                if (ret.code == 0) {
                    this.knowlege = ret.list;
                } else {
                    this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    .doc {
        .header {
            &::after {
                display: none;
            }
        }
        .info {
            background-color: white;
            .ava {
                $w: 160px;
                @include w_h($w, $w);
                margin: 0 auto;
            }
            .name, .dept, .hos {
                color: #666;
                margin-top: $commonSpace;
            }
            .name {
                font-size: 16px; /*no*/
                i {
                    font-size: 12px; /*no*/
                    border: 1px solid orange; /*no*/
                    border-radius: 5px;
                    font-style: normal;
                    color: orange;
                }
            }
        }
        .nav {
            padding-top: $commonSpace;
            background-color: white;
            li {
                padding-bottom: $commonSpace;
                width: (100% / 3);
            }
            @each $i in book, apply, baodao {
                li.#{$i} {
                    .icon {
                        height: 160px;
                        @include backgroundImageSet(50%, 0);
                        background-image: url("../../../static/img/index/#{$i}.png");
                    }
                }
            }

        }
        .wrap {
            background-color: white;
            margin-top: $commonSpace;
            .title {
                padding: 0 $commonSpace;
                @include h_lh(35px*$bili);
                @include border();
                font-size: 15px; /*no*/
                a {
                    font-size: 13px;
                    color: $mainColor;
                }
            }
            .content {
                padding: $commonSpace;
                color: #333333;
                line-height: 1.5;
            }
        }
    }
</style>

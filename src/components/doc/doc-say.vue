<template>
    <div class="flex zj-doc-say">
        <router-link :to="{path:'/doc/'+know.snsKnowledge.docId}" tag="div" class="ava flex0 center">
            <ava-thumb :src="know.docAvatar|docAva"></ava-thumb>
            <br>
            <span>{{know.docName}}</span>
        </router-link>
        <div class="info flex1" @click="downloadApp">
            <div class="desc">{{know.snsKnowledge.description}}</div>
            <div class="audio flex">
                <div class="icon flex0"></div>
                <div class="length flex1 right">
                    {{(know.snsKnowledge.duration * 1000) | timeFormat("%M'%S" + '"')}}
                </div>
            </div>
            <div class="detail flex">
                <div class="time flex0">{{know.snsKnowledge.createTime | timeFormat('%Y-%m-%d')}}</div>
                <div class="total flex0"> 收听{{know.snsKnowledge.readNum}}</div>
                <div class="zan flex0">{{know.snsKnowledge.likes}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {docAva, timeFormat} from "../../lib/filter"
    import {guideAppMixin} from "../../lib/mixin"
    import AvaThumb from "../../base/ava-thumb.vue"

    export default {
        props: ['know'],
        data() {
            return {};
        },
        computed: {},
        mixins: [guideAppMixin],
        filters: {docAva, timeFormat},
        components: {AvaThumb},
        created() {
            this.init()
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            init() {


            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    .zj-doc-say {
        padding: 10px*$bili 0;
        background-color: white;
        .ava {
            width: 80px*$bili;
            $avaW: 60px;
            font-size: 14px; /*no*/
            > div {
                display: inline-block;
                margin-bottom: 20px;
                @include w_h($avaW*$bili, $avaW*$bili);
            }
        }
        .info {
            margin-right: 10px*$bili;
            .desc {
                @include lineClamp(2);
            }
            .detail, .audio {
                margin-top: 8px*$bili;
            }
            .audio {
                $w: 304px;
                $h: 80px;
                padding: 0 $commonSpace;
                line-height: $h;
                color: white;
                @include w_h($w, $h);
                @include backgroundImageSet($w, $h);
                background-image: url("../../../static/img/bubble_off.png");
                .icon {
                    margin-right: 10px*$bili;
                    $iW: $h - 20px;
                    width: $iW;
                    @include backgroundImageSet($iW, $iW);
                    background-image: url("../../../static/img/icon/icon.audio.png");
                }
            }
            .detail {
                color: #999;
                .total, .zan {
                    margin-left: 10px*$bili;
                }
                .zan {
                    $w: 20px;
                    padding-left: ($w+5px)*$bili;
                    @include backgroundImageSet($w*$bili, $w*$bili);
                    background-image: url("../../../static/img/icon/icon.zan.png");
                }
            }
        }
    }

    .zj-doc-say + .zj-doc-say {
        @include border(top);
    }
</style>

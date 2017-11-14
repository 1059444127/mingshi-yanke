<template>
    <div class="zj-consult-item">
        <h3 class="flex">
            <div class="name flex1">团队咨询 {{item.price}}</div>
            <div :class="['status'+(Math.random()*100)%2==0?'status0':'']" class="status flex0">
                {{getConsultStatusText(Math.random()*100)}}
            </div>
        </h3>
        <div class="content">{{item.content}}</div>
        <div class="piclist">
            <dl class="overflow-hidden">
                <dd :class="['img','img'+item.imglist]" v-for="j in item.imglist" class="float-left">
                    <img
                            src="https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=3179544980,4261368179&fm=173&s=321014CD448AAD4D1C1A98220300501B&w=218&h=146&img.JPEG"
                            alt="">
                </dd>
            </dl>
        </div>
        <div class="b flex">
            <div class="replay flex1">暂无医生回答</div>
            <div class="time flex0">2小时前 | 3回复</div>
        </div>
    </div>
</template>

<script>
    import {getConsultStatusText} from "../../lib/util"
    export default {
        props: ['item'],
        data() {
            return {};
        },
        computed: {},
        components: {},
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            getConsultStatusText
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";
    .zj-consult-item + .zj-consult-item {
        margin-top: $commonSpace;
    }

    .zj-consult-item {
        background-color: white;
        padding: $commonSpace;
        h3 {
            font-size: 32px;
            line-height: 32px;
            .name {
                color: #333333;
            }
            .status {
                $statusColors: (
                        -1 #999,
                        0 orange,
                        1 $mainColor,
                        3 red,
                        5 blue,
                        7 green
                );
                @each $s, $c in $statusColors {
                    &.status#{$s} {
                        color: $c;
                    }
                }
            }
        }
        .content {
            margin-top: 20px;
            color: #666666;
            font-size: 28px;
            line-height: 1.5;
        }
        .piclist {
            dd {
                margin-top: $commonSpace;
                $wid: (750px - $commonSpace*4);
                $wid3: $wid/3;
                $wid1-2: ($wid/4*3, $wid/5*4/2);
                &.img {
                    @include thumb($wid3, $wid3);
                }

                @each $w in $wid1-2 {
                    &.img#{index($wid1-2,$w)} {
                        @include thumb($w, $w);
                    }
                }

                &:nth-child(3n+2), &:nth-child(3n+3) {
                    margin-left: $commonSpace;
                }

            }
        }
        .b {
            margin-top: 20px;
            color: #999999;
            font-size: 28px;
        }
    }

</style>

<template>
    <div class="consult-add page flex">
        <app-header title="立即咨询" ref="header" class="flex0">
            <i slot="back"></i>
            <div class="right absolute" slot="right">
                提交
            </div>
        </app-header>
        <div class="main" ref="main">
            <dl>
                <dt>
                    就诊人信息
                </dt>
                <dd class="flex">
                    <div class="label flex0">
                        就诊人
                    </div>
                    <div class="input flex1 right" @click="selectCompat">
                        {{currentCompat}}
                    </div>
                    <div class="icon"><img src="../../../static/img/icon/arrow-right-grow.png" alt=""></div>
                </dd>
            </dl>
            <dl>
                <dt>
                    病情资料
                </dt>
                <dd class="flex">
                    <textarea placeholder="请详细描述患者的主要症状、持续时间、已经确诊的疾病和接诊医生的意见。(如有症状照片、病历、检查单，可在下方上传)"
                              class="flex1"></textarea>
                </dd>

                <dd>
                    <pic-list></pic-list>
                </dd>

            </dl>
        </div>
    </div>
</template>

<script>
    import {mainHeightMixin} from "../../lib/mixin"
    import weuijs from "weui.js"
    import http from "../../lib/http"
    import Msg from "../../base/msg.vue"
    import PicList from "../../components/pic-list.vue"
    import AppHeader from "../../components/app-header.vue"
    import {getGender, getAgeFromCard} from "../../lib/filter"
    import {debug} from '../../lib/util'

    export default {
        data() {
            return {
                compatIndex: 0,
                compatList: []
            };
        },
        computed: {
            currentCompat() {
                let cpt = this.compatList[this.compatIndex];
                if (cpt) {
                    return cpt.commpatName + " " + getGender(cpt.commpatGender) + " " + getAgeFromCard(cpt.commpatIdcard);
                }
            },
            actionSheetMenus() {
                let compatList = this.compatList.slice(0);
                return compatList.map((compat) => {
                    return {
                        label: compat.commpatName,
                        onClick: () => {
                            this.changeCompat(compat.patId);
                        }
                    }
                })
                /*.concat([{
                                    label: "添加就诊人",
                                    onClick: () => {
                                        this.changeCompat("add");
                                    }
                                }])*/
            }
        },
        mixins: [mainHeightMixin],
        components: {
            AppHeader,
            Msg,
            PicList
        },
        created() {
            this.getCompat();
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            changeCompat(id) {
                this.compatIndex = this.compatList.findIndex((compat) => {
                    return compat.patId = id;
                })
            },
            selectCompat() {
                weuijs.actionSheet(this.actionSheetMenus, [
                    {label: "取消"}
                ])
            },
            async getCompat() {
                let loading = weuijs.loading("加载中...");
                let ret = await http("smarthos.user.commpat.list");
                loading.hide();
                if (ret.code == 0) {
                    this.compatList = ret.list;
                } else {
                    this.$refs.msg.show(ret.msg || "错误代码" + ret.code);
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../common/common";

    .consult-add {
        dl {
            dt {
                padding: 0 $commonSpace;
                @include h_lh(30px*$bili);
            }
            dd {
                font-size: 16px*$bili;
                padding: 10px $commonSpace;
                background-color: white;
                align-items: center;
                .input, .label {
                    @include h_lh(30px*$bili);
                }
                .input {
                    color: #999999;
                }
                .icon {
                    margin-left: 10px;
                    img {
                        width: 18px;
                    }
                }
                textarea {
                    font-size: 14px*$bili;
                    height: 200px;
                }
            }
        }
    }
</style>

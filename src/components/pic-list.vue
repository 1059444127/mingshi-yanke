<template>
    <div class="zj-pic-list">
        <ul class="overflow-hidden">
            <li class="float-left" v-for="pic in pics">
                <img :src="pic.url" alt="">
            </li>
            <li class="float-left" @click="selectImage">
                <img src="../../static/img/icon/icon-upload.png" alt="">
            </li>
        </ul>
        <input-file ref="file" @thumb="thumb" @status="status" @uploaded="uploaded"></input-file>
    </div>
</template>

<script>
    import {debug} from "../lib/util"
    import InputFile from "./input-file.vue"

    export default {
        data() {
            return {
                pics: []
            };
        },
        computed: {
            picsTotal() {
                return this.pics.length;
            }
        },
        components: {
            InputFile
        },
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {
            selectImage() {
                this.$refs.file.$el.click();
            },
            thumb(index, res) {
                this.pics.push({
                    url: res
                })
            },
            status(index, res) {
                let rIndex = this.picsTotal + index - 1,
                    pic = this.pics[rIndex],
                    nPic = Object.assign({}, pic, {
                        status: res
                    });
                this.pics.splice(rIndex, 1, nPic)
            },
            uploaded(index, res) {
                let rIndex = this.picsTotal + index - 1,
                    pic = this.pics[rIndex];
                if (res.code == 0) {
                    let nPic = Object.assign({}, pic, {
                        url: res.obj.attaFileUrl,
                        id: res.obj.id
                    })
                    this.pics.splice(rIndex, 1, nPic)
                }
            }
        }
    };
</script>

<style scoped lang="scss">
    .zj-pic-list {
        ul {
            li + li + li + li {
                margin-top: 0.2429rem;
            }
            li {
                height: 2.1514rem;
                width: 2.1514rem;
                overflow: hidden;
                margin-left: 0.2429rem;
                img {
                    width: 100%;
                }
            }
            li:nth-child(3n+1) {
                margin-left: 0;
            }
        }
    }
</style>

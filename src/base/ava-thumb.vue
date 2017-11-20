<template>
    <div ref="dom" class="ava-thumb overflow-hidden">
        <img :src="src" alt="">
    </div>
</template>
<script>
    import {debug} from "../lib/util"

    export default {
        props: ['src'],
        data() {
            return {
                domStyle: {}
            };
        },
        computed: {},
        components: {},
        mounted() {
            this.init()
        },
        beforeDestroy() {

        },
        watch: {
            src(newV) {
                this.init();
            },
        },
        methods: {
            async init() {
                let img = await this.getImage(), {width: iw, height: ih} = img;
                debug("w-h", iw, ih);
                let dom = await this.getDom(), {width, height} = dom.getBoundingClientRect(),
                    imgDom = dom.querySelector("img");
                if (ih > iw) {
                    imgDom.style.width = `${width}px`
                    imgDom.style.height = `${width / iw * ih}px`
                } else {
                    imgDom.style.width = `${height / ih * iw}px`
                    imgDom.style.transform = `translateX(-${(height / ih * iw - width) / 2}px)`;
                    imgDom.style.height = `${height}px`
                }
            },

            getDom() {
                let goon = true;
                return new Promise((resolve, reject) => {
                    while (goon) {
                        let dom = this.$refs.dom;
                        if (dom) {
                            goon = false;
                            resolve(dom);
                        }
                    }
                })
            },


            getImage() {
                return new Promise((resolve, reject) => {
                    let img = new Image();
                    img.src = this.src;
                    img.onload = () => {
                        resolve(img);
                    }
                    img.onerror = (error) => {
                        reject(error);
                        throw new Error(this.src + "不存在");
                    }
                })
            }
        }
    };
</script>
<style scoped lang="scss">
    .ava-thumb {
        mask-image: url("../../static/img/mask.fw.png");
        mask-size: 100%;
        border-radius: 50%;
    }
</style>

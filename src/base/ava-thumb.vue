<template>
    <div ref="dom" class="ava-thumb overflow-hidden"></div>
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
        methods: {
            init() {
                setTimeout(() => {
                    let dom = this.$refs.dom, {width, height} = dom.getBoundingClientRect();
                    dom.style.backgroundImage = `url('${this.src}')`
                }, 200)
            }
        }
    };
</script>

<style scoped lang="scss">
    .ava-thumb {
        border-radius: 50%;
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: center center;
    }
</style>

<template>
    <div class="index-doc-say">
        <scroll class="overflow-hidden" :height="scrollHeight" :data="knowlege">
            <div>
                <doc-say :key="index" v-for="(know,index) in knowlege" :know="know"></doc-say>
            </div>
        </scroll>
    </div>
</template>

<script>
    import * as types from "../../store/types"
    import {mapGetters} from "vuex"
    import DocSay from "../../components/doc/doc-say.vue"
    import {docAva} from "../../lib/filter"
    import {scrollHeightMixin} from "../../lib/mixin"
    import Scroll from "../../base/scroll.vue"


    export default {
        data() {
            return {};
        },
        computed: {
            bottomHeight() {
                return window.rem2px * (3.4 + 0.2 + 0.85) - 45
            },
            ...mapGetters({
                knowlege: types.INDEX_DATA_KNOWLAGE
            })
        },
        filters: {
            docAva
        },
        mixins: [scrollHeightMixin],
        components: {DocSay, Scroll},
        mounted() {

        },
        beforeDestroy() {

        },
        methods: {}
    };
</script>

<style scoped lang="scss">

</style>

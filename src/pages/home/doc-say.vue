<template>
  <div class="index-doc-say">
    <doc-say :key="index" v-for="(know,index) in knowlege" :know="know"></doc-say>
  </div>
</template>

<script>
  import * as types from "../../store/types"
  import {mapGetters} from "vuex"
  import DocSay from "../../components/doc/doc-say.vue"
  import {docAva} from "../../lib/filter"

  export default {
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        knowlege: types.INDEX_DATA_KNOWLAGE
      })
    },
    filters: {
      docAva
    },
    components: {DocSay},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="">
    <consult-item v-for="(item ,index) in list" :item="item" :key="index"></consult-item>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import http from "../../lib/http"
  import weuijs from "weui.js"
  import {debug} from "../../lib/util"

  import ConsultItem from "../../components/consult/item.vue"
  import Msg from "../../base/msg.vue"

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {},
    components: {Msg, ConsultItem},
    created() {
      this.getData()
    },
    mounted() {


    },
    beforeDestroy() {

    },
    methods: {
      async getData(pageNum, pageSize = 10) {
        let loading = weuijs.loading("加载中..."), token = "18268256860";
        let ret = await http("smarthos.consult.pic.list.page", {pageSize, pageNum, token})
        loading.hide();
        if (ret.code == 0) {
          this.list = ret.list;
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }


      }
    }
  };
</script>

<style scoped lang="scss">

</style>

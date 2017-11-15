<template>
  <div class="">
    <scroll class="list" :height="scrollHeight" :data="list">
      <div>
        <consult-item v-for="(item ,index) in list" :item="item" :key="index"></consult-item>
      </div>
    </scroll>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import http from "../../lib/http"
  import weuijs from "weui.js"
  import {debug} from "../../lib/util"
  import {scrollHeightMixin} from "../../lib/mixin"
  import ConsultItem from "../../components/consult/item.vue"
  import Msg from "../../base/msg.vue"
  import Scroll from "../../base/scroll.vue"

  export default {
    data() {
      return {
        list: []
      };
    },
    computed: {
      bottomHeight() {
        return window.rem2px * (3.4 + 0.2 + 0.85) - 45
      }
    },
    mixins: [scrollHeightMixin],
    components: {Msg, ConsultItem, Scroll},
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
  .list {
    overflow: hidden;
    > div {
      padding-bottom: .2rem;
    }
  }
</style>

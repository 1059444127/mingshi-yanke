<template>
  <div class="page">
    <app-header title="我的咨询" class="noflex">
      <i slot="back"></i>
    </app-header>
    <div class="nav">
      <ul class="flex">
        <li class="flex0" v-for="item in nav">{{item.value}}</li>
      </ul>
    </div>
    <scroll :pullup="pullup" @scrollToEnd="scrollToEnd" :listenScroll="listenScroll" :probeType="probeType"
            class="wrapper list" :data="list" :height="scrollHeight">
      <div class="list">
        <consult-item v-for="(item ,index) in list" :key="index" :item="item"></consult-item>
      </div>
    </scroll>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import ConsultItem from "../../../components/consult/item.vue"
  import AppHeader from "../../../components/app-header.vue"
  import {scrollHeightMixin} from "../../../lib/mixin"
  import Scroll from "../../../base/scroll.vue"
  import config from "../../../lib/config"
  import {getConsultStatusText} from "../../../lib/util"
  import http from "../../../lib/http"
  import {userCache} from "../../../lib/cache"
  import Msg from "../../../base/msg.vue"
  import {debug} from "../../../lib/util"
  import weuijs from "weui.js"

  export default {
    mixins: [scrollHeightMixin],
    data() {
      return {
        pullup: true,
        listenScroll: true,
        probeType: 2,
        pageNum: 1,
        hasNext: false,
        nav: config.consult_type_nav,
        list: []
      };
    },
    computed: {
      bottomHeight() {
        return window.rem2px * (0.9)
      }
    },
    components: {
      Scroll,
      AppHeader,
      ConsultItem,
      Msg
    },
    created() {
      this.postConsultList(this.pageNum);
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      getConsultStatusText,
      scrollToEnd() {
        this.hasNext && this.postConsultList(++this.pageNum);
      },
      async postConsultList(pageNum = 1, pageSize = 10) {
        let user = userCache.get(), userId = user.pat.id;
        let loading = weuijs.loading("加载中...");
        let ret = await http("smarthos.consult.pic.list.page", {userId, pageNum, pageSize});
        loading.hide();
        if (ret.code == 0) {
          this.list = this.list.concat(ret.list);
          this.hasNext = false;
          ret.page.pages != ret.page.pageNum && (this.hasNext = true)
        } else {
          this.$refs.msg.show(ret.msg || "接口错误" + ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../../common/common";

  .wrapper {
    overflow: hidden;
  }

  .nav {
    ul {
      @include border();
      background-color: white;
    }
    li {
      &:nth-child(1) {
        @include border(right);
      }
      @include w_h(50%, 90px);
      line-height: 90px;
      text-align: center;
      font-size: 32px;
      background-image: url(../../../../static/img/icon/arrow-down.png);
      @include backgroundImageSet(22px, 22px, 750px/4 + 32px*2 + 10px, center)
    }
  }
</style>

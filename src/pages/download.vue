<template>
  <div class="page">
    <img src="../../static/img/download.jpg" @click="show=false" v-show="show"
         class="share fixed">
    <ul class="flex">
      <li class="flex0 center" @click="download('')">
        <div class="icon"><img src="../../static/img/icon/android.png" alt=""></div>
        <h3 class="text">安卓下载</h3>
      </li>
      <li class="flex0 center" @click="download('')">
        <div class="icon"><img src="../../static/img/icon/ios.png" alt=""></div>
        <h3 class="text">IOS下载</h3>
      </li>
    </ul>
  </div>
</template>

<script>
  import {isBrower} from "../lib/util"

  export default {
    data() {
      return {
        show: false,
        device: ""
      };
    },
    computed: {},
    components: {},
    created() {
      ['iphone', 'android'].forEach((res) => {
        isBrower(res) && (this.device = res);
      })
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      download() {
        if (isBrower("micromessenger")) {
          this.show = true;
        } else {

        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  .share {
    @include w_h(100%, 100%);
    @include t_r_b_l();
  }

  ul {
    padding-top: 100px;
    li {
      width: 50%;
    }
  }
</style>

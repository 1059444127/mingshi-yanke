<template>
  <div class="flex zj-doc-say">
    <div class="ava flex0 center">
      <img :src="know.docAvatar|docAva" alt="">
      <br>
      <span>{{know.docName}}</span>
    </div>
    <div class="info flex1">
      <div class="desc">声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音声音{{know.snsKnowledge.description}}</div>
      <div class="audio">声音</div>
      <div class="detail flex">
        <div class="time flex0">{{know.snsKnowledge.createTime}}</div>
        <div class="total flex0">{{know.snsKnowledge.readNum}}</div>
        <div class="zan flex0">{{know.snsKnowledge.likes}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import {docAva} from "../../lib/filter"

  export default {
    props: ['know'],
    data() {
      return {};
    },
    computed: {},
    filters: {docAva},
    components: {},
    created() {
      this.init()
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      init() {


      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .zj-doc-say {
    padding: 10px*$bili 0;
    background-color: white;
    .ava {
      width: 80px*$bili;
      $avaW: 60px;
      font-size: 16px; /*no*/
      img {
        margin-bottom: 5px*$bili;
        @include w_h($avaW*$bili, $avaW*$bili);
        border-radius: $avaW/2;
      }
    }
    .info {
      margin-right: 10px*$bili;
      .desc {
        @include lineClamp(2);
      }
    }
  }

  .zj-doc-say + .zj-doc-say {
    @include border(top);
  }
</style>

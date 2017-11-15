<template>
  <div class="page index">
    <div class="wrapper" ref="main">
      <div class="banner swiper-container" ref="swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="ad in adsettings">
            <img :src="ad.adUrl" alt="">
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>

      <ul class="nav flex">
        <router-link replace :key="index" :to="nav.path" tag="li" exact-active-class="current" class="flex0 center"
                     v-for="(nav,index) in fastNav">
          {{nav.text}}
        </router-link>
      </ul>
      <router-view></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import config from "../lib/config"
  import http from "../lib/http"
  import {mainHeightMixin} from "../lib/mixin"
  import weuijs from "weui.js"
  import {debug} from "../lib/util"
  import {mapMutations, mapGetters} from "vuex"
  import * as types from "../store/types"

  export default {
    mixins: [mainHeightMixin],
    data() {
      return {
        adsettings: [],
        fastNav: config.index_fast_nav,
      };
    },
    computed: {
      ...mapGetters({
        knowlage: types.INDEX_DATA_KNOWLAGE
      })
    },
    components: {},
    created() {
      this.swiper = null;
    },
    mounted() {
      this.__initPage();
    },
    beforeDestroy() {

    },
    watch: {},
    methods: {
      __initPage() {
        this.getAds();
      },
      async getAds() {
        let loading = weuijs.loading("加载中...");
        let ret = await http("smarthos.user.pat.index", {})
        loading.hide();
        debug("ret", ret);
        if (ret.code == 0) {
          this.adsettings = ret.obj.adsettings;
          this.swiperInit();
          this.setKnowlege(ret.obj.knowledge);
        }

      },
      swiperInit() {
        setTimeout((res) => {
          this.swiper = new Swiper(this.$refs.swiper, {
            loop: true,
            autoplay: 5000,
            pagination: '.swiper-pagination',
          });
        }, 20)
      },
      ...mapMutations({
        setKnowlege: types.INDEX_DATA_KNOWLAGE
      })
    }
  };
</script>

<style lang="scss" scoped>
  @import "../common/common.scss";

  .index {
    $wrapperPadding: 12px;
    .banner {
      img {
        height: 340px;
      }
    }
    .nav {
      margin-top: 0.2rem;
      li {
        &.current {
          @include border(bottom, $mainColor);
          color: $mainColor;
        }
        @include border(bottom);
        @include h_lh(0.85rem);
        width: (100% / 3);
        background-color: white;
      }
    }

  }


</style>

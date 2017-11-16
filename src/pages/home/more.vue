<template>
  <div class="index-more" ref="more">
    <ul class="overflow-hidden">
      <li class="float-left center flex" :style="liStyle" v-for="nav in list">
        <div class="icon flex1" :class="[nav.name]"></div>
        <div class="text flex0">{{nav.value}}</div>
      </li>
    </ul>
    </div>
</template>

<script>
  import config from "../../lib/config"
  import {scrollHeightMixin} from "../../lib/mixin"

    export default {
        data() {
          return {
            liStyle: {},
            list: config.index_nav
          };
        },
      computed: {
        bottomHeight() {
          return window.rem2px * (3.4 + 0.2 + 0.85) - 45
        }
      },
      mixins: [scrollHeightMixin],
        components: {},
        mounted() {
          this.init();
        },
        beforeDestroy() {

        },
      methods: {
        init() {
          this.liStyle = {
            height: `${this.scrollHeight / 3}px`
          }
          setTimeout(() => {
            let dom = this.$refs.more;
            dom && (dom.style.height = `${this.scrollHeight}px`);
          }, 20)
        }
      }
    };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .index-more {
    background-color: white;
    ul {
      @include border(left);
      &::after {
        left: 50%;
      }
      li + li + li {
        @include border(top);
      }
      li {
        flex-direction: column;
        width: 50%;
        .text {
          @include h_lh(30px*$bili);
        }
      }
      @each $i in guide, book, queuing, payment, report, more {
        .icon.#{$i} {
          @include backgroundImageSet(50%, 0);
          background-image: url("../../../static/img/index/#{$i}.png");
        }
      }
    }
  }
</style>

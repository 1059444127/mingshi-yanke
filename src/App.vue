<template>
  <div id="app">
    <transition :name="page">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  import {historyCache} from "./lib/cache"
  import {validate} from "./lib/class"

  export default {
    name: 'app',
    data() {
      return {
        page: ""
      }
    },

    created() {
    },


    watch: {
      $route(to, from) {
        let p = to.fullPath;
        if (p === from.fullPath || new Date().getTime() - window.appStartTime < 200) {
          historyCache.clear();
          historyCache.set([p]);
          return;
        }
        let history = historyCache.get();
        let index = historyCache.inHistory(p);
        if (index > -1) {
          this.page = "right";
          history.splice(index + 1);
        } else {
          this.page = "left";
          history.push(p);
        }
        historyCache.set(history);
      }
    }
  }
</script>

<style lang="scss">
  @import "./common/common.scss";

  .left-enter-active, .left-leave-active {
    position: fixed;
    @include t_r_b_l();
    transition: all 0.3s;
  }

  .left-enter {
    position: fixed;
    @include t_r_b_l();
    transform: translate(100%, 0);
  }

  .left-leave-to {
    transform: translate(-100%, 0);
  }

  .right-enter-active, .right-leave-active {
    position: fixed;
    @include t_r_b_l();
    transition: all 0.3s;
  }

  .right-enter {
    transform: translate(-100%, 0);
  }

  .right-leave-to {
    transform: translate(100%, 0);
  }

  #app, .page {
    /*display: flex;*/
    /*flex-direction: column;*/
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .page {
    background-color: $bgColor;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .wrapper {
      overflow-y: auto;
      overflow-scrolling: touch;
      flex: 1 1 auto;
    }
    .noflex {
      flex: 0 0 auto;
    }
  }
</style>

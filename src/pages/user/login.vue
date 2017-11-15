<template>
  <div class="page">
    <app-header ref="header" class="noflex" title="登录">
      <i slot="back"></i>
    </app-header>
    <div class="wrapper" ref="main">
      <div class="userform">
        <dl>
          <dt>
            用户名
          </dt>
          <dd class="">
            <div class="hd">
              <input type="text" v-model="form.patMobile" placeholder="请输入账户名">
            </div>
          </dd>
        </dl>
        <dl>
          <dt>
            密码
          </dt>
          <dd class="">
            <div class="hd">
              <input type="password" v-model="form.patPassword" placeholder="请输入密码">
            </div>
          </dd>
        </dl>
        <dl class="btn">
          <dt>
            <a @click="login" class="weui-btn weui-btn_primary">立即登录</a>
          </dt>
        </dl>
        <dl class="btn">
          <dt class="overflow-hidden">
            <router-link tag="a" to="" class="a float-left">忘记密码</router-link>
            <router-link tag="a" to="/reg/step1" class="a float-right">立即注册</router-link>
          </dt>
        </dl>
      </div>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {mainHeightMixin} from "../../lib/mixin"
  import http from "../../lib/http"
  import AppHeader from "../../components/app-header.vue"
  import weuijs from "weui.js"
  import {tokenCache, fromCache, userCache} from "../../lib/cache"
  import Msg from "../../base/msg.vue"

  export default {
    mixins: [mainHeightMixin],
    data() {
      return {
        form: {patMobile: "", patPassword: ""}
      };
    },
    computed: {},
    components: {
      AppHeader, Msg
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async login() {
        //smarthos.user.pat.login
        let loading = weuijs.loading("提交中...");
        let ret = await http("smarthos.user.pat.login", this.form);
        loading.hide();

        if (ret.code == 0) {
          userCache.set(ret.obj);
          tokenCache.set(ret.token);
          let cfrom = fromCache.get();
          if (cfrom) {
            fromCache.remove();
            this.$router.push(cfrom);
          } else {
            this.$router.push("/my");
          }
        } else {
          this.$refs.msg.show(ret.msg || "错误代码" + ret.code);
        }
      }
    }
  };
</script>

<style scoped lang="scss">

</style>

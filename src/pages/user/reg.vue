<template>
  <div class="page">
    <app-header ref="header" class="noflex" title="注册">
      <i slot="back"></i>
      <div class="right absolute" slot="right" @click="next">{{$route.name == 'step1' ? "下一步" : "提交"}}</div>
    </app-header>
    <div class="wrapper relative overflow-x-hidden" ref="main">
      <transition :name="step">
        <router-view></router-view>
      </transition>
    </div>
    <msg ref="msg"></msg>
  </div>
</template>

<script>
  import {mainHeightMixin} from "../../lib/mixin"
  import {mapGetters} from "vuex"
  import * as types from "../../store/types"
  import AppHeader from "../../components/app-header.vue"
  import validate from "lmw-validate"
  import Msg from "../../base/msg.vue"
  import http from "../../lib/http";
  import weuijs from "weui.js"
  import {tokenCache, userCache, fromCache} from "../../lib/cache"

  export default {
    mixins: [mainHeightMixin],
    data() {
      return {
        step: "left"
      };
    },
    computed: {
      ...mapGetters([types.USER_REG_FORM])
    },
    components: {
      AppHeader,
      Msg
    },
    created() {

    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      next() {
        let form = this[types.USER_REG_FORM], validator = new validate();
        if (this.$route.name == "step1") {
          let form = this[types.USER_REG_FORM];
          /*检验逻辑略*/
          validator.add(form.mobile, [
            ['need', "手机号不能为空"],
            ['isPhone', "手机号格式不正确"]
          ]);

          validator.add(form.captcha, [
            ['need', "验证码不能为空"]
          ]);

          let error = validator.start();
          if (error) {
            this.$refs.msg.show(error);
            return
          }

          this.$router.push("/reg/step2");
        } else {
          validator.add(form.patName, [
            ['need', '姓名不能为空']
          ])
          validator.add(form.patIdcard, [
            ['isIdCard', "请输入有效的身份证号"]
          ])

          validator.add(form.patPassword, [
            ['need', "请输入密码"]
          ])

          validator.add(form.patPassword2, [
            ['eq', "两次输入不一致", form.patPassword]
          ])

          let error = validator.start();
          if (error) {
            this.$refs.msg.show(error);
            return
          }
          this.reg(form);
        }
      },
      async reg(form) {
        let loading = weuijs.loading("提交中...");
        let ret = await http("smarthos.user.pat.register", form);
        loading.hide();
        /*
        * {"code":"0","obj":{"commpat":{"commpatGender":"M","commpatIdcard":"370829198403170618","commpatIdcardType":"CN","commpatMobile":"15868823516","commpatName":"李明卫","createTime":1510715785325,"creatorId":"5a0bb189e4b0f18306407907","creatorType":"PAT","id":"5a0bb189e4b0f18306407908","patId":"5a0bb189e4b0f18306407907","self":true},"pat":{"channel":"23","createTime":1510715785325,"creatorId":"0","creatorType":"ADM","id":"5a0bb189e4b0f18306407907","patGender":"M","patName":"李明卫","patStatus":"ENABLE"},"patPrivate":{"createTime":1510715785325,"creatorId":"0","creatorType":"ADM","id":"5a0bb189e4b0f18306407907","patBirthday":448300800000,"patIdcard":"370829198403170618","patIdcardType":"CN","patMobile":"15868823516","patPassword":"$2a$10$ttGmJ/eWfGJZORkHGDDiXeSkaYtZjHDAGGfBtSfWFRbW6omnRhqP2"}},"succ":true,"token":"TOKEN_e53c1f8bc2df483eb9597eccc7925e10"}
        * */
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
    },
    watch: {
      $route(to, from) {
        let r = ['step1', 'step2'];
        let i1 = r.indexOf(to.name);
        let i2 = r.indexOf(from.name);
        if (i1 > i2) {
          this.step = "left"
        } else {
          this.step = "right"
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .left-enter, .right-leave-to {
    transform: translateX(100%);
  }

  .step-leave-to, .right-enter {
    transform: translateX(-100%);
  }

  .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active {
    @include t_r_b_l();
    position: absolute;
    transition: all 0.3s;
  }
</style>

<template>
  <div class="zj-consult-item">
    <h3 class="flex">
      <div class="name flex1">{{item.consultInfo.consultType | consultType}} </div>
      <div :class="['status'+item.consultInfo.consultStatus]" class="status flex0">
        {{getConsultStatusText(item.consultInfo.consultStatus)}}
      </div>
    </h3>
    <div class="content">{{item.consultInfo.consultContent}}</div>
    <div class="piclist">
      <dl class="overflow-hidden">
        <dd :class="['img','img'+item.attaList.length]" v-for="pic in item.attaList" class="float-left">
          <img :src="pic.attaFileUrl" alt="">
        </dd>
      </dl>
    </div>
    <div class="b flex">
      <div class="replay flex1" v-if="!item.userDocVo">暂无医生回答</div>
      <router-link tag="div" :to="{path:'/doc/'+item.userDocVo.id}" class="replay flex1 flex" v-else>
        <img :src="item.userDocVo.docAvatar" alt="" class="flex0">
        <span class="flex0">{{item.userDocVo.docName}}</span>
      </router-link>
      <div class="time flex0">{{item.consultInfo.createTime | timeFormat('%Y-%m-%d')}} | {{item.consultInfo.replyCount}}回复</div>
    </div>
  </div>
</template>

<script>
  import {getConsultStatusText} from "../../lib/util"
  import {timeFormat, consultType} from "../../lib/filter"

  export default {
    props: ['item'],
    data() {
      return {};
    },
    computed: {},
    filters: {timeFormat, consultType},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      getConsultStatusText
    }
  };
</script>

<style scoped lang="scss">
  @import "../../common/common";

  .zj-consult-item + .zj-consult-item {
    margin-top: $commonSpace;
  }

  .zj-consult-item {
    background-color: white;
    padding: $commonSpace;
    h3 {
      font-size: 32px;
      line-height: 32px;
      .name {
        color: #333333;
      }
      .status {
        $statusColors: (
          -1 #999,
          0 orange,
          2 $mainColor,
          3 red,
          5 blue,
          7 green
        );
        @each $s, $c in $statusColors {
          &.status#{$s} {
            color: $c;
          }
        }
      }
    }
    .content {
      margin-top: 20px;
      color: #666666;
      font-size: 28px;
      line-height: 1.5;
    }
    .piclist {
      dd {
        margin-top: $commonSpace;
        $wid: (750px - $commonSpace*4);
        $wid3: $wid/3;
        $wid1-2: ($wid/4*3, $wid/5*4/2);
        &.img {
          @include thumb($wid3, $wid3);
        }

        @each $w in $wid1-2 {
          &.img#{index($wid1-2,$w)} {
            @include thumb($w, $w);
          }
        }

        &:nth-child(3n+2), &:nth-child(3n+3) {
          margin-left: $commonSpace;
        }

      }
    }
    .b {
      margin-top: 20px;
      color: #999999;
      font-size: 28px;
      .replay {
        $iW: 50px;
        img {
          margin-right: $commonSpace;
          border-radius: $iW/2;
          @include w_h($iW, $iW);
        }
        span {
          line-height: $iW;
        }
      }
    }
  }

</style>

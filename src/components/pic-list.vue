<template>
  <div class="zj-pic-list">
    <ul class="overflow-hidden">
      <li class="float-left relative" @click="scanPic(pic)" v-for="pic in pics">
        <img :src="pic.url" alt="">
        <div class="mask absolute center" v-if="pic.status!='end'">
          上传中...
        </div>
      </li>
      <li class="float-left" @click="selectImage" v-if="this.picsTotal!=9">
        <img src="../../static/img/icon/icon-upload.png" alt="">
      </li>
    </ul>
    <input-file ref="file"
                @uploadStart="uploadStart"
                @uploadEnd="uploadEnd"
                @thumb="thumb"
                @status="status"
                @uploaded="uploaded"></input-file>
  </div>
</template>

<script>
  import {debug} from "../lib/util"
  import InputFile from "./input-file.vue"
  import weuijs from "weui.js"

  export default {
    data() {
      return {
        uploadStatus: "",
        pics: [],
        startTotal: 0,

      };
    },
    computed: {
      picsTotal() {
        return this.pics.length;
      }
    },
    components: {
      InputFile
    },
    mounted() {

    },
    beforeDestroy() {

    },
    watch: {
      pics(newV) {
        this.$emit("data", newV);
      }
    },
    methods: {
      scanPic(pic) {
        let url = pic.url;
        let gallery = weuijs.gallery(url, {
          onDelete: () => {
            gallery.hide();
            this.deletePic(pic);
          }
        });
      },
      deletePic(pic) {
        weuijs.confirm("是否删除这张图片?", (res) => {
          this.pics.splice(this.pics.findIndex((res) => {
            return res.id == pic.id
          }), 1)
        })


      },
      selectImage() {
        this.$refs.file.$el.click();
      },
      uploadStart() {
        this.uploadStatus = "loading";
      },
      uploadEnd() {
        this.uploadStatus = "end";
        this.startTotal = this.pics.length;
      },
      thumb(index, res) {
        this.pics.push({
          url: res
        });
        debug("addindex", index, this.picsTotal);
      },
      status(index, res) {
        let rIndex = this.startTotal + index,
          pic = this.pics[rIndex],
          nPic = Object.assign({}, pic, {
            status: res
          });
        this.pics.splice(rIndex, 1, nPic)
      },
      uploaded(index, res) {
        let rIndex = this.startTotal + index,
          pic = this.pics[rIndex];
        if (res.code == 0) {
          let nPic = Object.assign({}, pic, {
            url: res.obj.attaFileUrl,
            id: res.obj.id
          });
          debug("queued", rIndex);
          this.pics.splice(rIndex, 1, nPic)
        }
      }
    }
  };
</script>

<style scoped lang="scss">
  @import "../common/common";

  .zj-pic-list {
    ul {
      $w: 2.1514rem;

      li + li + li + li {
        margin-top: 0.2429rem;
      }
      li {
        height: $w;
        width: $w;
        overflow: hidden;
        margin-left: 0.2429rem;
        img {
          width: 100%;
          height: 100%;
        }
        .mask {
          @include h_lh($w);
          @include t_r_b_l();
          color: white;
          background-color: rgba(0, 0, 0, 0.5);
        }
      }
      li:nth-child(3n+1) {
        margin-left: 0;
      }
    }
  }
</style>

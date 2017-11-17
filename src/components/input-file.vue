<template>
  <input class="zj-upload-file fixed" multiple type="file" accept="*/*" @change="onChange" ref="file"/>
</template>

<script>
  import http from "../lib/http"
  import {debug} from "../lib/util"

  export default {
    data() {
      return {};
    },
    computed: {},
    components: {},
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {
      async onChange() {
        let files = this.$refs.file.files;
        this.$emit("uploadStart", "1");
        await this.queueThumb(files);
        await this.queueUpload(files);
        this.$emit("uploadEnd", "1");
      },
      async queueThumb(files) {
        for (let i = 0, l = files.length; i < l; i++) {
          let thumb = await this.getThumb(files[i]);
          this.$emit("thumb", i, thumb, l);
          this.$emit("status", i, "start", l);
        }
        return "ok";
      },
      async queueUpload(files) {
        /*smarthos.system.file.upload.image.base64*/
        for (let i = 0, l = files.length; i < l; i++) {
          let thumb = await this.getThumb(files[i]);
          let ret = await http("smarthos.system.file.upload.image.base64", {
            module: "CONSULT",
            fileType: "IMAGE",
            fileName: files[i].name,
            base64: thumb
          });
          this.$emit("status", i, "end", l);
          this.$emit("uploaded", i, ret, l);
        }
        return "ok";
      },
      getThumb(file) {
        return new Promise((resolve, reject) => {
          let fr = new FileReader();
          fr.readAsDataURL(file);
          fr.onload = () => {
            resolve(fr.result);
          }
          fr.onerror = (err) => {
            reject(err);
          }
        })
      }
    }
  };
</script>

<style scoped lang="scss">
  .zj-upload-file {
    opacity: 0;
    left: 100%;
    top: 100%;
  }
</style>

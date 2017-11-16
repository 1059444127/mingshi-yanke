<template>
  <div class="zj-pic-list">
    <ul>
      <li>
        <img src="../../static/img/icon/icon-upload.png" alt="">
      </li>
      <li>
        <img src="../../static/img/icon/icon-upload.png" alt="">
      </li>
      <li>
        <img src="../../static/img/icon/icon-upload.png" alt="">
      </li>
      <li>
        <img src="../../static/img/icon/icon-upload.png" alt="">
      </li>
    </ul>
    <input-file></input-file>
  </div>
</template>

<script>
  import InputFile from "./input-file.vue"

  export default {
    data() {
      return {};
    },
    computed: {},
    components: {
      InputFile
    },
    mounted() {

    },
    beforeDestroy() {

    },
    methods: {}
  };
</script>

<style scoped lang="scss">
  .zj-pic-list {
    ul {
      li + li + li + li {
        margin-top: 0.2429rem;
      }
      li {
        float: left;
        height: 2.1514rem;
        width: 2.1514rem;
        overflow: hidden;
        margin-left: 0.2429rem;
        img {
          width: 100%;
        }
      }
      li:nth-child(3n+1) {
        margin-left: 0;
      }
    }
  }
</style>

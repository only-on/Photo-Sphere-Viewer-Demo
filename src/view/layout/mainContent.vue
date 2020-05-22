<template>
  <div>
    <div class="main-content">
      <transition mode="out-in" enter-active-class="bounceInleft" leave-active-class="bounceOutRight">
        <router-view class="tab-content animated"></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang='scss' scoped>
  .main-content {
    position: absolute;
    top: 60px;
    bottom: 0;
    right: 0;
    left: 180px;
    overflow: auto;
    z-index: 1;
    background-color: #F6F6F6;
    transition: left .45s cubic-bezier(.23, 1, .32, 1);
    .tabs-content {
      height: 100%;
    }
  }
</style>


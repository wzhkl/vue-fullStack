<template>
  <transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisiable">
      <div class="left">
        <span class="icon-back" @click="back"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-shelf"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-cart"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
// import { mapGetters } from 'vuex'
import { ebookMixin } from '../../utils/mixin'
export default {
  methods: {
    back () {
      console.log('back')
    }
  },
  // computed: {
  //   ...mapGetters(['menuVisiable'])
  // }
  mixins: [ebookMixin]
};
</script>

<style lang='scss' scoped>
@import '../../assets/styles/global.scss';
.title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);
    font-size: px2rem(20);
    .left {
      flex: 0 0 px2rem(60);
      @include left;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include right;
        .icon-shelf, .icon-cart {
          font-size: px2rem(22);
        }
      }
    }
  }
</style>

<template>
  <div>
    <transition name="slide-up">
      <div class="menu-wrapper" :class="{'hide-box-shadow': !menuVisiable || settingVisiable > -1}" v-show="menuVisiable">
        <div class="icon-wrapper">
          <span class="icon-menu" @click="showSetting(3)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-progress" @click="showSetting(2)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-bright" @click="showSetting(1)"></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-A" @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <EbookSettingFont></EbookSettingFont>
    <EbookSettingFontPopup></EbookSettingFontPopup>
    <EbookSettingTheme></EbookSettingTheme>
    <EbookSettingProgress></EbookSettingProgress>
    <EbookSlide></EbookSlide>
  </div>
</template>

<script>
import EbookSettingFont from "./EbookSettingFont"
import EbookSettingFontPopup from './EbookSettingFontPopup'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'
import EbookSlide from './EbookSlide'
// import { mapGetters } from 'vuex'
import { ebookMixin } from "../../utils/mixin.js"
export default {
  // computed: {
  //   ...mapGetters(['menuVisiable'])
  // },
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSlide,
  },
  mixins: [ebookMixin],
  methods: {
    showSetting(key) {
      // 展示哪一个设置面板
      this.setSettingVisiable(key);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 200;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  font-size: px2rem(20);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(24);
    }
    .icon-bright {
      font-size: px2rem(22);
    }
  }
}
</style>

<template>
<transition name="popup-slide-up">
  <div class="popup-list" v-show="fontFamilyVisiable">
    <div class="popup-title">
      <div class="popup-title-icon" @click="hide">
        <span class="icon-down2"></span>
      </div>
      <span class="popup-title-text">{{$t('book.selectFont')}}</span>
    </div>
    <div class="popup-list-wrapper">
      <div class="popup-item" v-for="(item, index) in fontFamilyList" :key="index" @click="setFontFamily(item.font)">
        <div class="popup-item-text" :class="{'selected': isSelected(item)}">{{item.font}}</div>
        <div class="popup-item-check" v-if="isSelected(item)">
          <span class="icon-check"></span>
        </div>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import { ebookMixin } from '../../utils/mixin.js'
import { FONT_FAMILY } from "../../utils/setting.js"
import { saveFontFamily } from "../../utils/localStorage.js";
export default {
  data () {
    return {
      fontFamilyList: FONT_FAMILY
    }
  },
  mixins: [ebookMixin],
  methods: {
    hide () {
      this.setFontFamilyVisiable(false)
    },
    isSelected (item) {
      return this.defaultFontFamily == item.font
    },
    setFontFamily(font) {
      this.setDefaultFontFamily(font)
      saveFontFamily(this.fileName, font)
      if (font === 'Default') {
        this.currentBook.rendition.themes.font('Times New Roman')
      } else {
        this.currentBook.rendition.themes.font(font)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss';
.popup-list {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 300;
  width: 100%;
  box-shadow: 0 px2rem(-4) px2rem(6) rgba(0, 0, 0, 0.1);
  background: #ffffff;
  .popup-title {
    position: relative;
    padding: px2rem(15);
    border-bottom: px2rem(1) solid #b8b9bb;
    text-align: center;
    @include center;
    .popup-title-icon {
      position: absolute;
      left: px2rem(15);
      top: 0;
      height: 100%;
      font-size: px2rem(16);
      font-weight: bold;
      @include center;
    }
    .popup-title-text {
      font-size: px2rem(14);
      font-weight: bold;
    }
  }
  .popup-list-wrapper {
    .popup-item {
      display: flex;
      padding: px2rem(15);
      .popup-item-text {
        flex: 1;
        font-size: px2rem(14);
        text-align: left;
        &.selected {
          color: #346cb9;
          font-weight: bold;
        }
      }
      .popup-item-check {
        flex: 1;
        text-align: right;
        font-size: px2rem(14);
        font-weight: bold;
        color: #346cb9;
      }
    }
  }
}
</style>


<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisiable && settingVisiable === 3">
      <transition name="silde-right">
        <div class="content" v-if="settingVisiable === 3">
          <div class="content-page-wrapper" v-if="bookAvailable">
            <div class="content-page">
              <!-- 动态组件显示 -->
              <component :is="currentTab === 1 ? content : bookmark"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-page-tab-item"
                :class="{'selected': currentTab === 1}"
                @click="selectTab(1)"
              >{{$t('book.navigation')}}</div>
              <div class="content-page-tab-item"
                :class="{'selected': currentTab === 2}"
                @click="selectTab(2)"
              >{{$t('book.bookmark')}}</div>
            </div>
          </div>
          <div class="content-empty" v-else>
            <EbookLoading></EbookLoading>
          </div>
        </div>
      </transition>
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script>
import { ebookMixin } from "../../utils/mixin.js"
import EbookSlideContents from './EbookSlideContents'
import EbookLoading from './EbookLoading'
export default {
  mixins: [ebookMixin],
  data () {
    return {
      currentTab: 1,
      content: EbookSlideContents,
      bookmark: null
    }
  },
  components: {
    EbookLoading
  },
  methods: {
    selectTab (tab) {
      this.currentTab = tab
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: flex;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        flex: 0 0 px2rem(48);
        height: px2rem(48);
        width: 100%;
        display: flex;
        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(12);
          margin: auto;
          text-align: center;
        }
      }
    }
    .content-empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
    height: 100%;
  }
}
</style>


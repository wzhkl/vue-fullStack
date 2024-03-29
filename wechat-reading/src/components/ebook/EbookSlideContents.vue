<template>
  <div class="ebook-slide-contents">
    <div class="slide-contents-search-wrapper">
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input
         type="text"
         class="slide-contents-search-input"
         :placeholder="$t('book.searchHint')"
         v-model="searchText"
         @keyup.enter.exact="search()"
         @click="showSearchPage()"
        >
      </div>
      <div class="slide-contents-search-cancel" v-if="searchVisiable" @click="hideSearchPage()">{{$t('book.cancel')}}</div>
    </div>
    <div class="slide-contents-book-wrapper" v-show="!searchVisiable">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" alt="" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">{{metadata.title}}</div>
        <div class="slide-contents-book-author">{{metadata.creator}}</div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTimeText()}}</div>
      </div>
    </div>
    <Scroll class="slide-contents-list" :top="156" :bottom="48" v-show="!searchVisiable">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index">
        <span class="slide-contents-item-label"
          :style="contentItemStyle(item)"
          :class="{'selected': section == index}"
          @click="displayNavigation(item.href)"
          >{{item.label}}</span>
        <span class="slide-contents-item-page"></span>
      </div>
    </Scroll>
    <Scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisiable">
      <div class="slide-search-item" v-for="(item, index) in searchList" :key="index" v-html="item.excerpt" @click="displaySearch(item.cfi, true)"></div>
    </Scroll>
  </div>
</template>

<script>
import { ebookMixin } from '../../utils/mixin.js'
import Scroll from '../common/Scroll.vue'
import { px2rem } from '../../utils/utils.js'
export default {
  mixins: [ebookMixin],
  components: {
    Scroll
  },
  data () {
    return {
      searchVisiable: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    showSearchPage () {
      this.searchVisiable = true
    },
    search () {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then((list) => {
          this.searchList = list
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
            return item
          })
        })
      }
    },
    hideSearchPage () {
      this.searchVisiable = false
      this.searchText = ''
      this.searchList = null
    },
    contentItemStyle (item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    displayNavigation (target) {
      this.display(target, () => {
        this.hideTitleAndMenu()
      })
    },
    displaySearch (target, highLight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu()
        if (highLight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    // 全文搜索功能算法
    doSearch(q) {
      return Promise.all(
          this.currentBook.spine.spineItems
          // 遍历所有章节，获取所有文本信息
          .map(item => item.load(this.currentBook.load.bind(this.currentBook))
          .then(item.find.bind(item, q)) // 当前章节item的检索
          .finally(item.unload.bind(item))) // 释放资源
        ).then(results => Promise.resolve([].concat.apply([], results)))
      }
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/global.scss';
  .ebook-slide-contents {
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-search-input-wrapper {
        flex: 1;
        @include center;
        .slide-contents-search-icon {
          flex: 0 0 px2rem(28);
          font-size: px2rem(12);
          @include center;
        }
        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include right;
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);
        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        .slide-contents-book-title {
          // 使用了ellipsis要算出宽度
          // 375 * 0.85 - (15+15+10+10+45+70) = 153.75
          width: px2rem(153.75);
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis2(2)
        }
        .slide-contents-book-author {
          font-size: px2rem(12);
          width: px2rem(153.75);
          margin-top: px2rem(5);
          @include ellipsis;
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .slide-contents-book-progress {
          .progress {
            font-size: px2rem(14);
          }
          .progress-text {
            font-size: px2rem(12);
          }
        }
        .slide-contents-book-time {
          font-size: px2rem(12);
          margin-top: px2rem(5);
        }
      }
    }
    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        padding: px2rem(20) 0;
        display: flex;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
        }
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        font-size: px2rem(14);
        line-height: px2rem(16);
        padding: px2rem(20) 0;
        box-sizing: border-box;
      }
    }
  }
</style>

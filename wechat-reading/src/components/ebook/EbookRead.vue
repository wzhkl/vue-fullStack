<template>
  <div class="ebook-read">
    <!-- {{ $route.params.fileName }} -->
    <div id="read"></div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
// import { mapActions } from "vuex";
import { ebookMixin } from '../../utils/mixin.js'
import { flatten } from "../../utils/setting.js";
import Epub from "epubjs"
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme, getLocation } from '../../utils/localStorage'
global.epub = Epub
export default {
  mixins: [ebookMixin],
  methods: {
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize + 'px')
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    initRendition () {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight
        // 这是一个epubjs的Bug，微信不加不能渲染，但是新版本已经弃用
        // method: 'default'
      })
      const location = getLocation(this.fileName)
      this.display(location, () => {
          this.initFontSize()
          this.initFontFamily()
          this.initTheme()
          this.initGlobalStyle()
        })
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          // contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          // contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          // contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          // contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
          contents.addStylesheet('http://192.168.43.205:8081/fonts/cabin.css'),
          contents.addStylesheet('http://192.168.43.205:8081/fonts/daysOne.css'),
          contents.addStylesheet('http://192.168.43.205:8081/fonts/montserrat.css'),
          contents.addStylesheet('http://192.168.43.205:8081/fonts/tangerine.css')
        ]).then(() => {})
      })
    },
    // 初始化手势
    initGesture () {
      this.rendition.on("touchstart", e => {
        // 获取触摸位置与时间
        this.touchStartX = e.changedTouches[0].clientX
        this.touchStartTime = e.timeStamp
      })
      this.rendition.on("touchend", e => {
        this.touchendX = e.changedTouches[0].clientX
        const offsetX = this.touchendX - this.touchStartX
        // 触摸时间
        const time = e.timeStamp - this.touchStartTime
        // 上下翻页相关配置（触摸时间，触摸距离）
        if (time < 700 && offsetX > 40) {
          this.prevPage()
        } else if (time < 700 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        // e.preventDefault()
        e.stopPropagation()
      })
    },
    parseBook () {
      this.book.loaded.cover.then(cover => {
        // console.log(cover)
        this.book.archive.createUrl(cover).then(url => {
          // console.log(url)
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc)
        // console.log(navItem)
        function find(item, level =  0) {
          if (!item.parent) {
            return level
          } else {
            return find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
          }
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        // console.log(navItem)
        this.setNavigation(navItem)
      })
    },
    initEpub () {
      const url = "http://localhost:8081/epub/" + this.fileName + ".epub"
      // console.log("url", url)
      // 实例化Epub,传入url获取book对象
      this.book = new Epub(url)
      // console.log(this.book)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      // 在目录功能中解析电子书内容（img,author···）
      this.parseBook()
      this.book.ready.then(() => {
        // 分页算法
        return this.book.locations.generate(750 * (window.innerWidth / 375) *(getFontSize(this.fileName) / 16))
      }).then((locations) => {
        // console.log(locations)
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    },
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        // 翻页隐藏title and menu
        this.hideTitleAndMenu()
      }
    },
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu() {
      if (this.menuVisiable) {
        this.setSettingVisiable(-1)
        this.setFontFamilyVisiable(false)
      }
      // this.$store.dispatch('setMenuVisiable', !this.menuVisiable)
      this.setMenuVisiable(!this.menuVisiable)
    }
  },
  // computed: {
  //   ...mapGetters(['fileName', 'menuVisiable'])
  // },
  mounted () {
    // 拼接电子书链接并获取
    const fileName = this.$route.params.fileName.replace(/\|/, "/");
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global.scss'
</style>

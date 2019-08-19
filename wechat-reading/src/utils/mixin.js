import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from './setting.js'
import { saveLocation } from './localStorage.js'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisiable',
      'settingVisiable',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisiable',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themeList () {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setMenuVisiable',
      'setFileName',
      'setSettingVisiable',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisiable',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    initGlobalStyle () {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          // addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          addCss('http://192.168.43.205:8081/theme/theme_default.css')
          break
        case 'Eye':
          // addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          addCss('http://192.168.43.205:8081/theme/theme_eye.css')
          break
        case 'Gold':
          // addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          addCss('http://192.168.43.205:8081/theme/theme_gold.css')
          break
        case 'Night':
          // addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          addCss('http://192.168.43.205:8081/theme/theme_night.css')
          break
        default:
          addCss('http://192.168.43.205:8081/theme/theme_default.css')
      }
    },
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        // console.log(currentLocation)
        // 通过定位数据获取进度百分比
        const startCfi = currentLocation.start.cfi
        // console.log(startCfi)
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        // console.log(progress)
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
      }
    },
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    },
    hideTitleAndMenu () {
      // this.$store.dispatch('setMenuVisiable', false)
      this.setMenuVisiable(false)
      this.setSettingVisiable(-1)
      this.setFontFamilyVisiable(false)
    },
    getReadTimeText () {
      // 国际化
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    }
  }
}

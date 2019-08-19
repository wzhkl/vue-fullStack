const book = {
  state: {
    fileName: '',
    menuVisiable: true,
    settingVisiable: -1, // -1表示不显示，0显示字号，1主题，2进度条，3目录
    defaultFontSize: 16,
    defaultFontFamily: 'Default',
    fontFamilyVisiable: false,
    defaultTheme: 'Default',
    bookAvailable: false,
    progress: 0,
    section: 0,
    isPaginating: true,
    currentBook: null,
    navigation: null,
    cover: null,
    metadata: null,
    paginate: '',
    pagelist: null,
    offsetY: 0,
    isBookmark: null
  },
  mutations: {
    'SET_FILENAME': (state, fileName) => {
      state.fileName = fileName
    },
    'SET_MENUVISIABLE': (state, menuVisiable) => {
      state.menuVisiable = menuVisiable
    },
    'SET_SETTINGVISIABLE': (state, settingVisiable) => {
      state.settingVisiable = settingVisiable
    },
    'SET_DEFAULTFONTSIZE': (state, defaultFontSize) => {
      state.defaultFontSize = defaultFontSize
    },
    'SET_DEFAULTFONTFAMILY': (state, font) => {
      state.defaultFontFamily = font
    },
    'SET_FONTFAMILYVISIABLE': (state, visiable) => {
      state.fontFamilyVisiable = visiable
    },
    'SET_DEFAULTTHEME': (state, theme) => {
      state.defaultTheme = theme
    },
    'SET_BOOKAVAILABLE': (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    'SET_PROGRESS': (state, progress) => {
      state.progress = progress
    },
    'SET_SECTION': (state, section) => {
      state.section = section
    },
    'SET_ISPAGINATING': (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    'SET_CURRENTBOOK': (state, currentBook) => {
      state.currentBook = currentBook
    },
    'SET_NAVIGATION': (state, navigation) => {
      state.navigation = navigation
    },
    'SET_COVER': (state, cover) => {
      state.cover = cover
    },
    'SET_METADATA': (state, metadata) => {
      state.metadata = metadata
    },
    'SET_PAGINATE': (state, paginate) => {
      state.paginate = paginate
    },
    'SET_PAGELIST': (state, pagelist) => {
      state.pagelist = pagelist
    },
    'SET_OFFSETY': (state, offsetY) => {
      state.offsetY = offsetY
    },
    'SET_ISBOOKMARK': (state, isBookmark) => {
      state.isBookmark = isBookmark
    }
  }
}

export default book

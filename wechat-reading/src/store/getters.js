const book = {
  fileName: state => state.book.fileName,
  menuVisiable: state => state.book.menuVisiable,
  settingVisiable: state => state.book.settingVisiable,
  defaultFontSize: state => state.book.defaultFontSize,
  defaultFontFamily: state => state.book.defaultFontFamily,
  fontFamilyVisiable: state => state.book.fontFamilyVisiable,
  defaultTheme: state => state.book.defaultTheme,
  bookAvailable: state => state.book.bookAvailable,
  progress: state => state.book.progress,
  section: state => state.book.section,
  isPaginating: state => state.book.isPaginating,
  currentBook: state => state.book.currentBook,
  navigation: state => state.book.navigation,
  cover: state => state.book.cover,
  metadata: state => state.book.metadata,
  paginate: state => state.book.paginate,
  pagelist: state => state.book.pagelist,
  offsetY: state => state.book.offsetY,
  isBookmark: state => state.book.isBookmark
}

export default book

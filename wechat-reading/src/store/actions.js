const actions = {
  setFileName: ({ commit }, fileName) => {
    return commit('SET_FILENAME', fileName)
  },
  setMenuVisiable: ({ commit }, menuVisiable) => {
    return commit('SET_MENUVISIABLE', menuVisiable)
  },
  setSettingVisiable: ({ commit }, settingVisiable) => {
    return commit('SET_SETTINGVISIABLE', settingVisiable)
  },
  setDefaultFontSize: ({ commit }, defaultFontSize) => {
    return commit('SET_DEFAULTFONTSIZE', defaultFontSize)
  },
  setFontFamilyVisiable: ({ commit }, visiable) => {
    return commit('SET_FONTFAMILYVISIABLE', visiable)
  },
  setDefaultFontFamily: ({ commit }, font) => {
    return commit('SET_DEFAULTFONTFAMILY', font)
  },
  setDefaultTheme: ({ commit }, theme) => {
    return commit('SET_DEFAULTTHEME', theme)
  },
  setBookAvailable: ({ commit }, bookAvailable) => {
    return commit('SET_BOOKAVAILABLE', bookAvailable)
  },
  setProgress: ({ commit }, progress) => {
    return commit('SET_PROGRESS', progress)
  },
  setSection: ({ commit }, section) => {
    return commit('SET_SECTION', section)
  },
  setIsPaginating: ({ commit }, isPaginating) => {
    return commit('SET_ISPAGINATING', isPaginating)
  },
  setCurrentBook: ({ commit }, book) => {
    return commit('SET_CURRENTBOOK', book)
  },
  setNavigation: ({ commit }, navigation) => {
    return commit('SET_NAVIGATION', navigation)
  },
  setCover: ({ commit }, cover) => {
    return commit('SET_COVER', cover)
  },
  setMetadata: ({ commit }, metadata) => {
    return commit('SET_METADATA', metadata)
  },
  setPaginate: ({ commit }, paginate) => {
    return commit('SET_PAGINATE', paginate)
  },
  setPagelist: ({ commit }, pagelist) => {
    return commit('SET_PAGELIST', pagelist)
  },
  setIsBookmark({ commit }, isBookmark) {
    return commit('SET_ISBOOKMARK', isBookmark)
  },
  setOffsetY({ commit }, offsetY) {
    return commit('SET_OFFSETY', offsetY)
  }
}

export default actions
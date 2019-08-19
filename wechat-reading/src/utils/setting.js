import { getReadTime } from "./localStorage.js";

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]

export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days one' },
  { font: 'Montserrat' },
  { font: 'Tangerine' }
]

export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          'color': '#4c5059',
          'background': '#cecece'
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          'color': '#5c5b56',
          'background': '#c6c2b6'
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          'color': '#404c42',
          'background': '#a9c1a9'
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          'color': '#cecece',
          'background': '#000000'
        }
      }
    }
  ]
}

export function addCss (href) {
  // 反复点击调用方法会生成很多的link标签
  const link = document.createElement('link')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('type', 'text/css')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}

// 移除重复点击产生的多余的link标签
export function removeCss (href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') == href) {
      link.parentNode.removeChild(link)
    }
  }
}

// 每次设置主题时需要清除所有之前添加的css样式
export function removeAllCss () {
  // removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
  // removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
  // removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
  // removeCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
  removeCss(`http://192.168.43.205:8081/theme/theme_default.css`)
  removeCss(`http://192.168.43.205:8081/theme/theme_gold.css`)
  removeCss(`http://192.168.43.205:8081/theme/theme_eye.css`)
  removeCss(`http://192.168.43.205:8081/theme/theme_night.css`)
}

export function getReadTimeByMinute (fileName) {
  const readTime = getReadTime(fileName)
  if (!readTime) {
    return 0
  } else {
    return Math.ceil(readTime / 60)
  }
}

export function flatten(arr) {
  return [].concat(...arr.map(item => [].concat(item, ...flatten(item.subitems))))
  // return arr.reduce((pre, cur) => {
  //   return pre.concat(cur.subitems.length > 0 ? flatten(cur.subitems) : cur)
  // }, [])
}

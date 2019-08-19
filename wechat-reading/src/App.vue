<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  
}
// DOM 加载完毕之后的回调方法
document.addEventListener('DOMContentLoaded', () => {
  // 设置 rem 自适应布局
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  // 设置 fontSize 最大值
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})
</script>

<style lang="scss" scoped>
  // @import './assets/styles/global.scss';
  #app {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>

<template>
  <div class="ebook">
    <EbookTitle></EbookTitle>
    <EbookRead></EbookRead>
    <EbookMenu></EbookMenu>
  </div>
</template>

<script>
import EbookRead from '@/components/ebook/EbookRead.vue'
import EbookTitle from '@/components/ebook/EbookTitle.vue'
import EbookMenu from '@/components/ebook/EbookMenu.vue'
import { getReadTime, saveReadTime } from '../../utils/localStorage'
import { clearInterval } from 'timers'
import { ebookMixin } from '../../utils/mixin.js'
export default {
  mixins: [ebookMixin],
  components: {
    EbookRead,
    EbookTitle,
    EbookMenu
  },
  methods: {
    // 计算阅读时间
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      // 定时任务
      this.task = setInterval(() => {
        readTime++
        // 每半分钟记录一次
        if (readTime % 30) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000);
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

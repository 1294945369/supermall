<template>
  <div ref="bbb">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BS from 'better-scroll'

export default {
  name: 'Scroll',
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      scroll: null
    }
  },
  mounted () {
    // 1. 创建BScroll 对象
    this.scroll = new BS(this.$refs.bbb, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      click: true // 为了能够监听div的点击
    })
    // 2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on('scroll', position => {
        // console.log(position)
        this.$emit('scroll', position)
      })
    }

    // 3. 监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo (x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    getScrollY () {
      return this.scroll.y ? this.scroll.y : 0
    }
  }
}
</script>

<style></style>

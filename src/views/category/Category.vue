<template>
  <div class="wrapper" ref="aaaa">
    <ul class="content">
      <button @click="btnClick">按钮</button>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
      <li>分类的列表</li>
    </ul>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'Category',
  data () {
    return {
      scroll: null
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.aaaa, {
        probeType: 3,
        pullUpLoad: true
      })
      this.scroll.on('scroll', position => {
        // console.log(position)
      })
      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多')
      })
    })
  },
  methods: {
    btnClick () {
      console.log('btnClick')
    }
  }
}
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: red;

  overflow: hidden;
  /* overflow-y: scroll; */
}
</style>

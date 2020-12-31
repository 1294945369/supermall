<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <!-- <ul>
        <li v-for="(item, index) in $store.state.cartList" :key="index">
          {{ item }}
        </li>
      </ul> -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :base-info="goods" />
      <detail-shop-info :shop-info="shop" />
      <detail-goods-info
        :goods-info="detailInfo"
        @goodsInfoImgLoad="imageLoad"
      />
      <detail-param-info :paramInfo="paramInfo" ref="params" />
      <detail-comment-info :commentInfo="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addToCart="addToCart" />
    <!-- <toast class="toast" :message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import { iterListenerMixin, backTopMixin } from 'common/mixin'
// 混入mounted 中 监听图片刷新 高度

import {
  getDetail,
  Goods,
  getRecommend,
  Shop,
  GoodsParam
} from 'network/detail'

// import Toast from 'components/common/toast/Toast'

export default {
  name: 'Detail',
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    BackTop,
    GoodsList
    // Toast
  },
  data () {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, 1000, 2000, 3000],
      currentIndex: 0
      // message: '',
      // show: false
    }
  },
  created () {
    // 1.保存我们传入的iid
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // 1. 获取顶部的图片轮播数据
      // console.log(res)
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      )

      // 3.创建店铺信息的对象
      this.shop = new Shop(data.shopInfo)

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo

      // 5. 获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      )
      // 6. 取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    // 3. 请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })
  },
  mixins: [iterListenerMixin, backTopMixin], // 混入mounted中 监听图片刷新 高度
  mounted () {},
  destroyed () {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  methods: {
    imageLoad () {
      this.newRefresh()
      this.themeTopYs = []
      this.themeTopYs.push(44)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs)
      // console.log(1)
    },
    titleClick (index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      // vue计算的高度是该元素的父高度
      // scroll 计算的高度是 是整个屏幕的高度 父元素是整个屏幕
    },

    contentScroll (position) {
      // 1. 获取y值
      const positionY = -position.y
      // 1. 判断BackTop是否显示 放scroll外面
      this.isShowBackTop = positionY > 1000
      // 2. positionY和主题中的值进行对比
      // [0, 7938, 9120, 9452]
      // positoinY 在 0 和 7938 之间, index = 0
      // positoinY 在 7938 和 9120 之间, index = 1
      // positoinY 在 9120 和 9452 之间, index = 2

      // positoinY 超过了 9452 , index = 3
      // console.log(positionY)

      for (let i in this.themeTopYs) {
        // console.log(i * 1 + 1)
        // str 3 + 1 = 31
        i *= 1
        // *1 将其转换为数字

        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }

        /*  const length = this.themeTopYs.length
        if (
          (i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
          (i === length - 1 && positionY >= this.themeTopYs[i])
        ) {
          if (this.currentIndex !== i) {
            this.currentIndex = i
            console.log(this.currentIndex)
            this.$refs.nav.currentIndex = this.currentIndex
            // 先获取scroll的各组件高度
            // scrollto跳转
            // scroll(position)监听实时高度
            // 判断高度区间 取得普通循环下标
            // 将下标赋给导航栏
            // 改变导航栏index
          }
        } */
      }
    },
    addToCart () {
      // 1. 获取购物车需要展示的信息
      //  图片 标题 描述 价格 数量
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      // console.log(this.goods)

      product.desc = this.goods.desc
      // console.log(this.goods.desc)

      product.price = this.goods.realPrice
      // console.log(this.goods.realPrice)

      product.iid = this.iid
      // console.log(this.iid)

      // 2. 将商品添加到购物车里
      // this.$store.cartLisst.push(product)
      // this.$store.commit('addCart', product) // 调用 mutations 修改 state
      this.$store.dispatch('addCart', product).then(res => {
        console.log(res)
        // this.message = res
        // this.show = true
        // setTimeout(() => {
        //   this.show = false
        // }, 1500)
        this.$toast.tanchuang(res)

        // res 的值是 "添加了新的商品" else "当前的商品数量+1"
      })
      // 调用 active 联动 mutations 修改  state
      // dispatch  可以返回 一个prosmise
      // 需要在 action  addCart (context, payload) {中
      // return new Promise((resolve, reject) => {
      // 然后就可以在这里接收到这个Promise
      // 接收 Promise 使用 .then(res)成功  失败.catch
      // 这是属于 vuex 的知识点 需要掌握
      // 如果你在vuex里添加了东西 并且希望外界知道 就使用这个操作
      // 为此功能而生的promise返回机制

      // this.addCart(product).then(res => {
      //   console.log(res)
      // })
      // 这种写法看起来更直观  容易阅读
      // 但是需要将actions的addCart (context, payload) {
      // 映射到当前组件的methods才可调用
      // 使用import {mapActions} from 'vuex

      // 前面使用了import {mapGetters} from 'vuex 映射到计算属性里
      // 方法为 ...mapGetters(['getters.js中export的函数名'])
      // 即可调用 this.getters.js中export的函数名

      // 现在映射函数的方法为 在methods中
      // 方法为 ...mapActions(['actions.js中export的函数名'])
      // 方法是一致
      // 不同的是 actions 映射 到 methods 被调函数中
      // 不同的是 getters 映射 到 compted 计算属性中
      // 这是vuex 补充的东西

      // 其另一种对象更名方式 展开映射也是一样的
      // ...mapActions({  自己命名用来调用的新名字      :    actions.js中export的函数名})
      //  ...mapActions({ add : 'addCart' })
    }
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>

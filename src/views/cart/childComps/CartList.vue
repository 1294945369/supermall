<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :item-info="item"
      />
      <!-- <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div>
      <div class="gaodu">做完删除</div> -->
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import { mapGetters } from 'vuex'
export default {
  name: 'CartList',
  components: { Scroll, CartListItem },
  computed: {
    ...mapGetters(['cartList'])
  },
  activated () {
    // 进入购物车时刷新高度
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.gaodu {
  height: 500px;
  background-color: #eee;
}
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
  /* 顶部 底部 购物操作栏 */
}
.content {
  height: 100%;
  overflow: hidden;
}
</style>

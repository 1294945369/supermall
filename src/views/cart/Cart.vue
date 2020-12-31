<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar>
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>

    <!-- 商品的列表 -->
    <cart-list />

    <!-- 底部汇总 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  components: { NavBar, CartList, CartBottomBar },
  name: 'Cart',
  computed: {
    // 两种语法
    // ...mapGetters(['cartLength'])
    ...mapGetters({ length: 'cartLength' })
  }
}
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  /* 这个类名 此页虽然没有 但nav-bar组件里有 也可以用 */
  background-color: var(--color-tint);
  color: #fff;
}
</style>

<template>
  <div class="bottom-bar">
    <check-button
      :is-checked="isSelectAll"
      class="xuan"
      @click.native="checkClick"
    />

    <div class="zi">全选</div>
    <div class="zongjia">合计: {{ totalPrice }}</div>
    <div class="kkk" @click="qu">
      <div class="zong-shu">去计算 ({{ checkLength }})</div>
    </div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'

import { mapGetters } from 'vuex'

export default {
  name: 'CartBottomBar',
  components: { CheckButton },
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice () {
      return (
        '$' +
        this.cartList
          .filter(item => item.checked)
          .reduce((preValue, item) => preValue + item.price * item.count, 0)
          .toFixed(2)
      )
    },
    checkLength () {
      return this.cartList.filter(item => item.checked).length
    },
    isSelectAll () {
      if (!this.cartList.length) return false
      // 有一个false 的长度就取反  不全选

      // 1. 使用filter
      // return !this.cartList.filter(item => !item.checked).length

      // 2. 使用find
      // return !this.cartList.find(item => !item.checked)
      // 找到了就返回item 对象取反 就是false 数组不能取反

      // 3.普通的遍历
      for (const item of this.cartList) {
        if (!item.checked) return false
      }
      return true
    }
  },
  methods: {
    checkClick () {
      if (this.isSelectAll) {
        // 如果为true 为全选
        // 变为全不选
        this.cartList.forEach(item => (item.checked = false))
      } else {
        // 否则变为全选
        this.cartList.forEach(item => (item.checked = true))
      }
    },
    qu () {
      if (!this.isSelectAll) {
        this.$toast.tanchuang('请选择购买的商品', 1000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  line-height: 40px;
  background-color: #eee;
}

.zi {
  flex: 1;
}

.xuan {
  margin: 10px;
}

.zongjia {
  flex: 1;
}

.zong-shu {
  text-align: center;
  color: #fff;
}

.kkk {
  flex: 1;
  background-color: red;
}
</style>

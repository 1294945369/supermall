import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  //   mutations 唯一的目的就是为了修改state中的状态
  // mutations 中的每个方法尽可能完成的事件比较单一一点
  // payload新添加的商品
  //   数组常用的方法有哪些 push/pop/unshift/shift/sort/revers/map/filter/reduce/join
  //   let oldProduct = null
  //   for (const item of state.cartList) {
  //     if (item.iid === payload.iid) {
  //       oldProduct = item
  //     }
  //   }
  // 做一个跟踪 尤其是当你项目比较大的时候 比较方便调试
  [ADD_COUNTER] (state, payload) {
    payload.count += 1
  },
  [ADD_TO_CART] (state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}

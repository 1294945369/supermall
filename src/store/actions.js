import { ADD_COUNTER, ADD_TO_CART } from './mutation-types'

export default {
  addCart (context, payload) {
    return new Promise((resolve, reject) => {
      var oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      )
      //   找到返回item 没找到返回undefind

      //  2. 判断oldProduct  有+1  没有加商品
      if (oldProduct) {
        // oldProduct.count += 1
        // console.log('有+1')
        context.commit(ADD_COUNTER, oldProduct)
        // 找到oldProduct之后 数量 +1
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1
        // console.log('没有+商品')

        // context.state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        // 没有找到 传过来的product  传到添加处理
        resolve('添加了新的商品')
      }
    })
  }
}

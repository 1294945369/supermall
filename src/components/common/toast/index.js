import Toast from './Toast'

const obj = {}

obj.install = function (Vue) {
  //   console.log(Toast.$el) undefinde
  //   document.body.appendChild(Toast.$el)
  // 1. 创建组件构造器
  const ToastContrustor = Vue.extend(Toast)

  // 2. new 的方式, 根据组件构造器, 可以创建出来一个组件对象
  const toast = new ToastContrustor()

  // 3. 将组件对象, 手动的挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 手动自己创建一个 div ,  把 toast 挂载到上面了

  // 4. toast.$el对应的就是div
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj

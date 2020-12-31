import { debounce } from 'common/utils'

export const iterListenerMixin = {
  data () {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted () {
    //  1. 图片加载完成的事件监听
    this.newRefresh = debounce(
      this.$refs.scroll && this.$refs.scroll.refresh,
      200
    )
    // 对监听的事件进行保存
    this.itemImgListener = () => {
      this.newRefresh()
      // console.log('监听图片完成')
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
    this.newRefresh()
    // console.log('我是混入中的内容')
  }
}
/* 除了混入 继承也是减少重复代码的一种方式
但是这个他是类的继承 他是给类减少输出代码的
所以这个是继承 但是我们这里 不用继承
因为我们这里是个对象 同学们 看清楚
当此处 被 export default { }出来的时候
是不是一个对象呀
这是对象呀 你对象里面的话不能这样做
你这里要用到一个技术
这是vue已经给我们提供的技术 叫混入
就是定义一个 区域 区域里的东西会被自动加到 vue实例任何有东西都可以写在这里
 class Person {
  run() {}
}

class Dog {
  run() {}
}
---------------分割线---------------------

两个地方都有run()我应该怎么做
直接来个
class Animal{
run() {

  }
}
然后把run() 函数定义到Animal里面吧

class Person extends Animal {
  es6的语法 继承自 Animal
  他有个关键字 extends 直接就可以继承

  run() {}就可以不写了
}

class Dog extends Animal {

  run() {}就可以不写了
}

*/

export const backTopMixin = {
  data () {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick () {
      // 回到顶部
      this.$refs.scroll.scrollTo(0, 0)
    }
  }
  // 只能合并mounted生命周期里的大函数
  // methods 只会将混入的事件名函数 加到一起
  // methods 内部小函数里面的东西是不会合并的
  // 他会覆盖的

  // 可以强行注入  将整个小事件 抽到这里
  // 再在此处 或 原来的地方 调用
  // import { iterListenerMixin, backTopMixin } from 'common/mixin'
  // mixins: [iterListenerMixin, backTopMixin],
}

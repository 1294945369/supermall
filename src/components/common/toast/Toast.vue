<template>
  <div v-show="show" class="toast">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data () {
    return {
      message: '',
      show: false
    }
  },
  methods: {
    tanchuang (message = '默认文字', duration = 1000) {
      //   duration = duration || 1000
      // 默认参数
      // duration = 1000 为 es6 写法
      //   console.log('------')
      this.show = true
      this.message = message
      setTimeout(() => {
        this.show = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
#app {
  /* position: relative; */
}
.toast {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(32, 28, 28, 0.85);
  color: #fff;
  padding: 8px 10px;
  border-radius: 5px;
  z-index: 9999;
}
</style>

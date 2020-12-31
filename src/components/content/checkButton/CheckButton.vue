<template>
  <div>
    <div class="check-yuan" :class="{ checked: isChecked }">
      <img src="~assets/img/cart/tick.svg" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckButton',
  props: {
    isChecked: {
      type: Boolean,
      default: false
      // 简写方式
    }
  },
  methods: {}
}
</script>

<style scoped>
.check-yuan {
  border-radius: 50%;
  border: 2px solid #aaa;
  width: 20px;
  height: 20px;
}
.checked {
  border-color: red;
  background-color: red;
}
img {
  display: block;
}
</style>

import Vue from 'vue'
export default Vue.directive('loadmore', {
  bind (el, binding, vnode) {
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function () {
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  }
})
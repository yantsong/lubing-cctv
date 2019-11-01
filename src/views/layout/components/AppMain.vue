<template>
  <div :class="{'app-main': true}">
    <app-bar />
    <div class="app-content">
      <slot />
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar'

export default {
  name: 'AppMain',
  components: {
    AppBar
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // margin-left: 200px;
  // margin-top: 50px;
  padding: 0 15px;
  transition: .4s;
  &.app-main-collpased {
    margin-left: 70px;
  }
}

.app-content {
  padding: 10px 0 0;
  flex: 1;
}
</style>

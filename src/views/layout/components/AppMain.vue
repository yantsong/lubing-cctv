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
@import "@/styles/mixin.scss";
.app-main {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 0 35px;
   background:#fafafa;
  transition: .4s;
  @include scrollBar;
  &.app-main-collpased {
    margin-left: 70px;
  }
}
.app-content {
  flex: 1;
}
</style>

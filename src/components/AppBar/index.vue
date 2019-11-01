<template>
  <div class="app-bar">
    <bread-crumb />
    <p class="app-bar-title">
{{ title }}
</p>
  </div>
</template>

<script>
import BreadCrumb from '@/components/Breadcrumb'

export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      title: ''
    }
  },
  watch: {
    $route() {
      this.title = this.$route.matched.filter(item => item.name).pop().meta.title
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar {
  display: flex;
  align-items:flex-start;
  flex-direction: column;
  text-align: left;
  // height: 48px;
  border-bottom: 1px solid #efefef;
  padding-left: 10px;
  &-title{
    font-size: 20px;
    font-weight: 750;
    height: 44px;
    line-height: 44px;
  }
}
</style>

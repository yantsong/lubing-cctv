<template>
  <a-breadcrumb class="app-breadcrumb" separator="/">
      <a-breadcrumb-item v-for="(item,index) in activeList" :key="item.path">
        <span v-if="item.redirect==='noredirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <router-link v-else :to="item.redirect||item.path">
          {{ item.meta.title }}
        </router-link>
      </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>

export default {
  data() {
    return {
      levelList: null
    }
  },
  computed: {
    activeList() {
      return this.levelList.filter(
        i => i.meta.title
      )
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      const matched = this.$route.matched.filter(item => item.name)
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .app-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 44px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>

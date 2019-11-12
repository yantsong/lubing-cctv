<template>
  <div class="menu-wrapper">
    <img src="../../../../assets/logo.png" alt="" class="menu-logo">
    <a-menu
      :default-selected-keys="['1']"
      :default-open-keys="['2']"
      mode="inline"
      theme="dark"
      @click="clickLink"
>
      <template v-for="item in permission_routers">
        <a-menu-item v-if="!item.children&&!item.hidden" :key="item.key">
          <a-icon type="pie-chart" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else-if="!item.hidden" :key="item.name" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SubMenu from './SubMenu'
import { validateURL } from '@/utils/validate'
// import Item from './Item'

export default {
  name: 'Sidebar',
  components: { SubMenu },
  props: {
    // route object
    // item: {
    //   type: Object,
    //   required: true
    // },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  },
  methods: {
    isExternalLink(routePath) {
      return validateURL(routePath)
    },
    clickLink(path) {
      path['key'] && this.$router.push({ name: path['key'] })
    }
  }
}
</script>
<style lang="scss">
  .menu-wrapper{
    width: 256px;
    height: 100vh;
    img{
      width: 100%;
      height: 60px;
    }
  }
</style>

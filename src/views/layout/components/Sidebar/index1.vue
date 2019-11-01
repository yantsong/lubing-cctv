<template>
<div class="scrollbar-wrapper">
    <a-menu
      :show-timeout="200"
      :default-selected-keys="[$route.path]"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      theme="dark"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item />
    </a-menu>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

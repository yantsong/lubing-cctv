<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon type="mail" /><span>{{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.name" @click="clickHandler">
        <a-icon type="pie-chart" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  props: {
    menuInfo: {
      type: Object,
      default: () => {}
    },
    basePath: {
      type: String,
      default: ''
    },
    clickHandler: {
      type: Function,
      default: () => {}
    }
  },
  created() {
    console.log(this.menuInfo,'ss')
  },
  methods: {
    test(i) {
      console.log(i)
    }
  }
}
</script>

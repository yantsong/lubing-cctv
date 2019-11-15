<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />

    <div class="right-menu">
      <a-dropdown class="avatar-container right-menu-item" :trigger="['click']">
        <div class="avatar-wrapper">
          <img src="../../../assets/admin.png" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <a-menu-item slot="dropdown">
          <img src="../../../assets/admin.png" class="adminPicture">
          <a-menu-item>
            <p>{{ '测试账户' }}(admin)</p>
          </a-menu-item>
          <a-menu-item divided>
            <span style="display:block;">{{ '退出' }}</span>
          </a-menu-item>
        </a-menu-item>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Cookies from 'js-cookie'

export default {
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

.navbar {
  width: calc(100vw - 255px);
  height: 60px;
  line-height: 60px;
  border-radius: 0px !important;
  border-bottom: 1px solid #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFF;
  z-index: 10;
  img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .hamburger-container {
    line-height: 60px;
    height: 60px;
    padding: 0 10px;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
     .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
   }
  }
}
</style>

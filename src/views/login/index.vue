<template>
 <div>login</div>
</template>

<script>
import Axios from 'axios'
import { login } from '@/service/api'
export default {

  components: {},
  data() {
    return {
    }
  },

  computed: {},
  created() {
    const value = {
      username: 'admin',
      password: 'c3284d0f94606de1fd2af172aba15bf3'
    }
    login(value).then(res => {
      if (res.data.code=== 'A00000') {
        this.$router.push({ name: 'faceManagement' })
      }
    })
  },

  mounted() {
    console.log('ads')
  },

  methods: {}

}
</script>
<style lang='scss' scoped>
</style>

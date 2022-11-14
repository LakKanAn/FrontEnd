<template>
  <v-app>
    <div class="ma-auto">
      <v-img :src="require('~/assets/logo/logo-web.png')" width="500"></v-img>
      <p>ไม่พบหน้าที่ต้องการ กรุณากลับสู่หน้าหลัก</p>
      <NuxtLink to="/">
        Home page
      </NuxtLink>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'EmptyLayout',
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>

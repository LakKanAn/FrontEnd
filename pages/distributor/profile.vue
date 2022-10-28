<template>
  <div class="inner-login-page">
    <v-row class="row-login" align="center" justify="center">
      <v-col cols="12" sm="8" md="4" align="center" justify="center">
        <v-card width="600" class="pa-5 elevation-1 text-left card-login">
          <v-card-title class="text-lg-h4 my-0">
            ข้อมูลผู้จัดจำหน่าย
          </v-card-title>
          <!-- <v-card-subtitle>เข้าสู่ระบบเพื่อใช้งาน</v-card-subtitle> -->
          <v-divider />
          <p class="text-lg-h5 my-4">
            ชื่อบริษัท  : {{ company }}
          </p>
          <p class="text-lg-h5 my-4">
            ชื่อที่แสดง : {{ displayName }}
          </p>
          <p class="text-lg-h5 my-4">
            อีเมล : {{ email }}
          </p>
          <p class="text-lg-h5 my-4">
            ที่อยู่ : {{ address }}
          </p>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['protectDis', 'authCheck'],
  data () {
    return {
      email: '',
      company: '',
      displayName: '',
      address: ''
    }
  },
  async fetch () {
    const res = await this.$axios.$get(
      '/distributors/info'
    )
    console.log(res.distributor)
    this.email = res.distributor.email
    this.address = res.distributor.address
    this.displayName = res.distributor.displayName
    this.company = res.distributor.company
  },
  methods: {
  }

}
</script>

<style scoped>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
.inner-login-page{
    width: 100%;
    height: 100%;
    background-image: url("~/assets/background/book-bg-flat.png");
    background-repeat: repeat;
    background-size: auto;
}
.row-login{
    height: 100%;
}
.v-card__title{
    display: block;
    text-align: center !important;
}
.v-card__subtitle{
    text-align: center;
}

</style>

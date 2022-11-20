<template>
  <div class="inner-index-page">
    <div class="content-book-center font-propmt">
      <v-row class="row-login" justify="center">
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <v-btn
            x-large
            color="primary"
            width="100%"
            elevation="4"
            class="mb-3"
            dark
          >
            ข้อมูลส่วนตัว
          </v-btn>
          <v-btn
            x-large
            width="100%"
            elevation="4"
            class="mb-3"
            to="/distributor/insertbook"
            nuxt
          >
            เพิ่มหนังสือ
          </v-btn>
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="8"
          lg="8"
          xl="8"
          align="center"
          justify="center"
          class="ma-auto"
        >
          <v-row>
            <v-col cols="12" sm="12" md="12" class="d-flex justify-start">
              <p class="ma-0 text-h6 text-md-h6 text-lg-h4 text-xl-h4 font-weight-medium pb-4 ">
                ข้อมูลผู้จัดจำหน่าย
              </p>
            </v-col>
          </v-row>
          <v-card class="d-flex justify-center py-10 px-4">
            <v-row justify="center" class="py-4">
              <v-col cols="12" sm="10" md="10" class="font-weight-medium">
                <v-row justify="start">
                  <v-col
                    cols="12"
                    sm="12"
                    md="3"
                    lg="3"
                    xl="3"
                  >
                    ชื่อบริษัท  :
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    class="text-body-1 text-sm-body-1 text-md-h6 text-lg-h6 text-xl-h6"
                  >
                    <p class="mb-0 text-left">
                      {{ company }}
                    </p>
                  </v-col>
                </v-row>
                <v-row justify="start">
                  <v-col cols="12" sm="12" md="3" lg="3" xl="3">
                    ชื่อที่แสดง  :
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    class="text-body-1 text-sm-body-1 text-md-h6 text-lg-h6 text-xl-h6"
                  >
                    <p class="mb-0 text-left">
                      {{ displayName }}
                    </p>
                  </v-col>
                </v-row>
                <v-row justify="start">
                  <v-col cols="12" sm="12" md="3" lg="3" xl="3">
                    อีเมล  :
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    class="text-body-1 text-sm-body-1 text-md-h6 text-lg-h6 text-xl-h6"
                  >
                    <p class="mb-0 text-left">
                      {{ email }}
                    </p>
                  </v-col>
                </v-row>
                <v-row justify="start">
                  <v-col cols="12" sm="12" md="3" lg="3" xl="3">
                    ที่อยู่  :
                  </v-col>
                  <v-col
                    cols="12"
                    sm="12"
                    md="9"
                    lg="9"
                    xl="9"
                    class="text-body-1 text-sm-body-1 text-md-h6 text-lg-h6 text-xl-h6"
                  >
                    <p class="mb-0 text-left">
                      {{ address }}
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </div>
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
@media only screen and (max-width: 600px) {
    .content-book-center {
  margin-left: 2%;
  margin-right: 2%;
  }
}
.content-book-center{
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
}
.inner-index-page {
        width: 100%;
    height: 100%;
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

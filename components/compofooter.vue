<template>
  <div>
    <v-footer
      dark
      padless
    >
      <v-row justify="center" align="center" no-gutters>
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <v-img :src="require('~/assets/logo/logo_text.png')" max-width="360" class="ma-auto" />
        </v-col>
        <v-col
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
          class="pa-4"
        >
          <p class="text-h5 text-md-h4 text-lg-h4 text-xl-h4">
            หมวดหมู่
          </p>
          <v-row class="text-caption text-sm-body-2 text-md-body-2 text-lg-body-2 text-xl-body-2" dense>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>ตลก</span>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>วิทยาศาสตร์</span>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>สืบสวนสอบสวน</span>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>ต่อสู้</span>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>แฟนตาซี</span>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>อิงประวัติศาสตร์</span>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>โรแมนติก</span>
            </v-col>
            <v-col cols="6" sm="6" md="4" lg="4" xl="4">
              <span>ระทึกขวัญ</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          class="py-0"
          cols="12"
          sm="12"
          md="3"
          lg="3"
          xl="3"
        >
          <v-img :src="require('~/assets/image/people_get.png')" max-width="269" class="image-footer" />
        </v-col>
        <v-col
          class="py-0 d-flex justify-center"
          cols="12"
          sm="12"
          md="12"
          lg="12"
          xl="12"
        >
          <p class="text-caption text-sm-body-2 text-md-body-2 text-lg-body-2 text-xl-body-2">
            © 2022 LakKanAn All rights reserved.
          </p>
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

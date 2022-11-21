<template>
  <div>
    <v-col v-if="main === true" cols="12" sm="12" md="12">
      <v-card outlined rounded="lg" class="pa-4 d-flex justify-start" elevation="3">
        <v-img
          :src="dataAll.bookImage"
          max-width="140"
          max-height="176"
        />
        <div class="pl-4">
          <v-card-title class="pb-4 pt-0 px-0 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6 font-weight-medium">
            {{ dataAll.bookTitle }}
          </v-card-title>
          <v-card-subtitle class="py-1 px-0 over-text">
            {{ dataAll.author }}
          </v-card-subtitle>
          <v-card-subtitle class="py-1 px-0 over-text orange--text text--darken-1">
            {{ dataAll.category }}
          </v-card-subtitle>
          <v-card-subtitle v-if="Object.keys(dataAll).length >= 14" class="py-1 px-0 over-text">
            จากคุณ <span class="orange--text text--darken-1">{{ dataAll.ownerName }}</span>
          </v-card-subtitle>
          <v-card-subtitle v-if="Object.keys(dataAll).length >= 14" class="py-1 px-0 over-text orange--text text--darken-1 d-flex align-end">
            <v-icon color="primary" class="pr-2">
              mdi-clock-time-four-outline
            </v-icon> ระยะเวลาแลกเปลี่ยน {{ dataAll.during }} วัน
          </v-card-subtitle>
          <v-card-actions v-if="Object.keys(dataAll).length < 14">
            <v-btn color="primary" rounded elevation="0" class="pa-3" @click="routerGo">
              ดูรายละเอียด >>
            </v-btn>
          </v-card-actions>
          <v-card-actions v-if="Object.keys(dataAll).length >= 14">
            <v-btn color="primary" rounded elevation="0" class="pa-3 px-8" @click="routerTrade">
              แลกเปลี่ยน
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>

    <v-col v-if="main === false" cols="12" sm="12" md="12">
      <v-card outlined rounded="lg" class="pa-4" elevation="3">
        <v-img
          :src="dataAll.bookImage"
          max-height="231"
          max-width="140"
          class="mx-auto mb-2"
        />
        <div class="pl-4">
          <v-card-title class="pb-4 pt-0 px-0 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6 font-weight-medium">
            {{ dataAll.bookTitle }}
          </v-card-title>
          <v-card-subtitle class="py-1 px-0 over-text">
            {{ dataAll.author }}
          </v-card-subtitle>
          <v-card-subtitle class="py-1 px-0 over-text orange--text text--darken-1">
            {{ dataAll.category }}
          </v-card-subtitle>
          <v-card-actions>
            <v-btn color="primary" rounded elevation="0" class="pa-3" @click="routerGo">
              ดูรายละเอียด >>
            </v-btn>
          </v-card-actions>
        </div>
      </v-card>
    </v-col>
  </div>
</template>

<script>
export default {
  props: ['dataAll', 'main'],
  data () {
    return {
    }
  },
  methods: {
    routerGo () {
      this.$nuxt.$router.push('/products/' + this.dataAll.bookId)
    },
    routerTrade () {
      localStorage.setItem('data-trade', this.dataAll.postId)
      this.$nuxt.$router.push('/market/tradepage')
    }
  }
}
</script>

<style scoped>

</style>

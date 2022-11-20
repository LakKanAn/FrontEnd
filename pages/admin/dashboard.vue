<template>
  <div class="body-admin">
    <v-row>
      <v-col cols="12" sm="12" md="12" class="d-flex justify-start">
        <p class="ma-0 text-h4 text-md-h4 text-lg-h4 text-xl-h4 font-weight-medium pb-4 ">
          Dashboard
        </p>
      </v-col>
    </v-row>
    <v-row class="my-4" justify="space-around">
      <v-col>
        <v-card
          class="mx-auto pa-4"
          width="350"
          rounded="lg"
          elevation="3"
        >
          <div class="d-flex justify-center">
            <v-icon color="#171E45" size="60">
              mdi-account
            </v-icon>
          </div>
          <v-card-title class="d-flex justify-center pa-0">
            User Total
          </v-card-title>
          <v-card-title class="d-flex justify-center pa-0 primary--text">
            {{ userTotal }}
          </v-card-title>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="mx-auto pa-4"
          width="350"
          rounded="lg"
          elevation="3"
        >
          <div class="d-flex justify-center">
            <v-icon color="#171E45" size="60">
              mdi-book-open-variant
            </v-icon>
          </div>
          <v-card-title class="d-flex justify-center pa-0">
            Book Total
          </v-card-title>
          <v-card-title class="d-flex justify-center pa-0 primary--text">
            {{ bookTotal }}
          </v-card-title>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="mx-auto pa-4"
          width="350"
          rounded="lg"
          elevation="3"
        >
          <div class="d-flex justify-center">
            <v-icon color="#171E45" size="60">
              mdi-account-tie-woman
            </v-icon>
          </div>
          <v-card-title class="d-flex justify-center pa-0">
            Distributor Total
          </v-card-title>
          <v-card-title class="d-flex justify-center pa-0 primary--text">
            {{ distributorTotal }}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>

    <v-col cols="12" sm="12" md="12">
      <v-tabs
        v-model="currentItem"
        centered
        grow
        mobile-breakpoint
        background-color="#FFD097"
      >
        <v-tab>
          Transactions List (Buy)
        </v-tab>
        <v-tab>
          Transactions List (Exchange)
        </v-tab>
        <v-tab>
          Report List
        </v-tab>
        <v-tab>
          Distributor List
        </v-tab>
      </v-tabs>
    </v-col>
    <v-card v-if="currentItem == 0" class="pa-6 my-10" rounded="xl" elevation="3">
      <div class="my-4">
        <h2 class="font-weight-medium">
          Transactions List (Buy)
        </h2>
        <v-data-table
          :headers="transactionsBuy"
          :items="purchaseList"
          item-key="name"
          class="elevation-1"
          :search="searchPurchase"
        >
          <template #top>
            <v-text-field
              v-model="searchPurchase"
              solo
              hide-details
              placeholder="ค้นหา"
              class="pa-4"
              prepend-inner-icon="mdi-magnify"
            />
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card v-if="currentItem == 1" class="pa-6 my-10" rounded="xl" elevation="3">
      <div class="my-4">
        <h2 class="font-weight-medium">
          Transactions List (Exchange)
        </h2>
        <v-data-table
          :headers="transactionsExchange"
          :items="exchangeList"
          item-key="name"
          class="elevation-1"
          :search="searchExchange"
        >
          <template #top>
            <v-text-field
              v-model="searchExchange"
              solo
              hide-details
              placeholder="ค้นหา"
              class="pa-4"
              prepend-inner-icon="mdi-magnify"
            />
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card v-if="currentItem == 2" class="pa-6 my-10" rounded="xl" elevation="3">
      <div class="my-4">
        <h2 class="font-weight-medium">
          Report List
        </h2>
        <v-data-table
          :headers="reportHead"
          :items="reportList"
          item-key="name"
          class="elevation-1"
          :search="searchReport"
        >
          <template #top>
            <v-text-field
              v-model="searchReport"
              solo
              hide-details
              placeholder="ค้นหา"
              class="pa-4"
              prepend-inner-icon="mdi-magnify"
            />
          </template>
          <template #[`item.popup`]="{ item }">
            <v-dialog
              v-model="dialog"
              width="500"
            >
              <template #activator="{ on, attrs }">
                <v-icon
                  large
                  class="mr-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  mdi-magnify-plus-outline
                </v-icon>
              </template>

              <v-card>
                <v-card-title class="text-h5 pb-4 dialog-admin font-propmt">
                  จากคุณ  {{ item.displayName }}
                </v-card-title>
                <v-divider />
                <v-card-subtitle class="text-h6 py-2 font-propmt">
                  {{ item.topic }}
                </v-card-subtitle>
                <v-card-text class="font-propmt">
                  {{ item.details }}
                </v-card-text>

                <v-divider />

                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                  >
                    ปิด
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card v-if="currentItem == 3" class="pa-6 my-10" rounded="xl" elevation="3">
      <div class="my-4">
        <h2 class="font-weight-medium">
          Distributor List
        </h2>
        <v-data-table
          :headers="disHead"
          :items="disList"
          item-key="name"
          class="elevation-1"
          :search="searchDis"
        >
          <template #top>
            <v-row class="mx-2">
              <v-col cols="12" sm="12" md="8" lg="10">
                <v-text-field
                  v-model="searchDis"
                  solo
                  hide-details
                  placeholder="ค้นหา"
                  prepend-inner-icon="mdi-magnify"
                  class="pa-4"
                />
              </v-col>
              <v-col cols="12" sm="12" md="4" lg="2" class="ma-auto">
                <v-dialog
                  v-model="dialogDis"
                  max-width="600px"
                >
                  <template #activator="{ on, attrs }">
                    <v-btn
                      elevation="4"
                      outlined
                      color="#FF8C00"
                      v-bind="attrs"
                      class="ma-auto"
                      v-on="on"
                    >
                      เพิ่มผู้จัดจำหน่าย
                    </v-btn>
                  </template>
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                  >
                    <v-card class="font-propmt pa-6" rounded="lg">
                      <v-card-title class="px-0">
                        <p class="text-h5 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4 black--text mb-1">
                          ลงทะเบียนผู้จัดจำหน่าย
                        </p>
                      </v-card-title>
                      <v-row dense>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <p class="mb-1 pa-0 d-flex justify-start">
                            ชื่อบริษัท
                          </p>
                          <v-text-field
                            v-model="disData.company"
                            label="ชื่อบริษัท"
                            solo
                            :rules="requireRules"
                            required
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                          md="6"
                        >
                          <p class="mb-1 pa-0 d-flex justify-start">
                            ชื่อที่ต้องการแสดง
                          </p>
                          <v-text-field
                            v-model="disData.displayName"
                            solo
                            placeholder="ชื่อที่ต้องการแสดง"
                            :rules="requireRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <p class="mb-1 pa-0 d-flex justify-start">
                            อีเมล
                          </p>
                          <v-text-field
                            v-model="disData.email"
                            solo
                            placeholder="อีเมล"
                            :rules="emailRules"
                            required
                          />
                        </v-col>
                        <v-col cols="12">
                          <p class="mb-1 pa-0 d-flex justify-start">
                            รหัสผ่าน
                          </p>
                          <v-text-field
                            v-model="disData.password"
                            label="Password*"
                            type="password"
                            placeholder="รหัสผ่าน"
                            solo
                            :rules="moreRules"
                            required
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          sm="12"
                        >
                          <p class="mb-1 pa-0 d-flex justify-start">
                            ที่ตั้งบริษัท
                          </p>
                          <v-text-field
                            v-model="disData.address"
                            placeholder="ที่ตั้งบริษัท"
                            solo
                            :rules="requireRules"
                            required
                          />
                        </v-col>
                      </v-row>
                      <v-card-actions>
                        <v-spacer />
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="dialogDis = false"
                        >
                          ยกเลิก
                        </v-btn>
                        <v-btn
                          color="blue darken-1"
                          text
                          @click="addDis"
                        >
                          บันทึก
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-form>
                </v-dialog>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </div>
    </v-card>
    <v-row justify="center" />
  </div>
</template>

<script>
export default {
  middleware: ['protectAdmin', 'authCheck'],
  data () {
    return {
      currentItem: 0,
      userTotal: 0,
      distributorTotal: 0,
      bookTotal: 0,
      purchaseList: [],
      exchangeList: [],
      reportList: [],
      disList: [],
      searchPurchase: '',
      searchExchange: '',
      searchReport: '',
      searchDis: '',
      dialog: false,
      dialogDis: false,
      h: 'e',
      search: '',
      disData: {
        company: '',
        email: '',
        password: '',
        displayName: '',
        address: ''
      },
      valid: true,
      emailRules: [
        v => !!v || 'E-mail จำเป็นต้องกรอก',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ],
      moreRules: [
        v => !!v || 'ช่องนี้จำเป็นต้องกรอก',
        v => (v && v.length >= 10) || 'ต้องมีความยาวมากกว่า 10 ตัวขึ้นไป'
      ],
      requireRules: [
        v => !!v || 'ช่องนี้จำเป็นต้องกรอก'
      ]
    }
  },
  async fetch () {
    const resPurchase = await this.$axios.$get(
      '/admin/transactions/type?type=purchase'
    )
    const resExchange = await this.$axios.$get(
      '/admin/transactions/type?type=exchanging'
    )
    const resReport = await this.$axios.$get(
      '/admin/reports/'
    )
    const resUserTotal = await this.$axios.$get(
      '/admin/totalUser/'
    )
    const resDisTotal = await this.$axios.$get(
      '/admin/totalDistributor'
    )
    const resBookTotal = await this.$axios.$get(
      '/admin/totalBook/'
    )
    const resDisList = await this.$axios.$get(
      '/admin/distributors'
    )
    this.purchaseList = resPurchase.transactions
    this.exchangeList = resExchange.transactions
    this.reportList = resReport.reports
    this.userTotal = resUserTotal.totalUser
    this.distributorTotal = resDisTotal.totalDistributor
    this.bookTotal = resBookTotal.totalBook
    this.disList = resDisList.distributors
  },
  computed: {
    transactionsBuy () {
      return [
        { text: 'TransactionId', value: 'transactionId' },
        { text: 'BookId', value: 'bookId' },
        { text: 'UserId', value: 'userId' },
        { text: 'Id', value: 'id' }
      ]
    },
    transactionsExchange () {
      return [
        { text: 'TransactionId', value: 'transactionId' },
        { text: 'OfferUserId', value: 'offerUserId' },
        { text: 'OwnerUserId', value: 'ownerUserId' },
        { text: 'OfferBookId', value: 'offerBookId' },
        { text: 'OwnerBookId', value: 'ownerBookId' },
        { text: 'PostId', value: 'postId' }
      ]
    },
    reportHead () {
      return [
        { text: 'Topic', value: 'topic' },
        { text: 'UserId', value: 'userId' },
        { text: 'ReportId', value: 'reportId' },
        { text: 'Email', value: 'email' },
        { text: 'DisplayName', value: 'displayName' },
        { text: 'Details', value: 'details' },
        { text: 'Popup', value: 'popup' }
      ]
    },
    disHead () {
      return [
        { text: 'Company Name', value: 'company' },
        { text: 'DisplayName', value: 'displayName' },
        { text: 'Email', value: 'email' },
        { text: 'Address', value: 'address' }
      ]
    }
  },
  methods: {
    async addDis () {
      if (this.$refs.form.validate()) {
        await this.$axios.$post(
          '/admin/addDistributor',
          this.disData
        )
        this.dialogDis = false
        setTimeout(() => { location.reload() }, 2000)
      }
    }
  }
}
</script>

<style scoped>
.body-admin {
  margin-top: 5%;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
}
@media only screen and (max-width: 600px) {
    .body-admin {
  margin-left: 2%;
  margin-right: 2%;
  }
}
.v-card__title.dialog-admin {
  font-family: 'Prompt', sans-serif !important;
}
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
 .v-data-table {
  font-family: 'Prompt', sans-serif !important;
  color: black !important;
  font-weight: 500 !important;
  font-size: 16px !important;
}
</style>

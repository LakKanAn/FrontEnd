<template>
  <div class="body-admin mx-auto">
    <div class="d-flex justify-space-between my-4">
      <v-card
        class="mx-auto"
        max-width="300"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-2">
              User Total
            </div>
            <v-list-item-title class="text-h3 mb-4">
              {{ userTotal }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-card
        class="mx-auto"
        max-width="300"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-2">
              Book Total
            </div>
            <v-list-item-title class="text-h3 mb-4">
              {{ bookTotal }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-card
        class="mx-auto"
        max-width="300"
        outlined
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-2">
              Distributor Total
            </div>
            <v-list-item-title class="text-h3 mb-4">
              {{ distributorTotal }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </div>

    <v-card class="pa-6 my-10" tile outlined elevation="3">
      <div class="my-4">
        <h2>Transactions List (Buy)</h2>
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
              label="Search (UPPER CASE ONLY)"
              class="mx-4"
            />
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card class="pa-6 my-10" tile outlined elevation="3">
      <div class="my-4">
        <h2>Transactions List (Exchange)</h2>
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
              label="Search (UPPER CASE ONLY)"
              class="mx-4"
            />
          </template>
        </v-data-table>
      </div>
    </v-card>

    <v-card class="pa-6 my-10" tile outlined elevation="3">
      <div class="my-4">
        <h2>Report List</h2>
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
              label="Search (UPPER CASE ONLY)"
              class="mx-4"
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

    <v-card class="pa-6 my-10" tile outlined elevation="3">
      <div class="my-4">
        <h2>Distributor List</h2>
        <v-data-table
          :headers="disHead"
          :items="disList"
          item-key="name"
          class="elevation-1"
          :search="searchDis"
        >
          <template #top>
            <v-row class="mx-2">
              <v-col cols="11">
                <v-text-field
                  v-model="searchDis"
                  label="Search (UPPER CASE ONLY)"
                />
              </v-col>
              <v-col cols="1">
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
                      class="my-auto"
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
                    <v-card class="font-propmt">
                      <v-card-title>
                        <span class="text-h5 font-propmt">ลงทะเบียนผู้จัดจำหน่าย</span>
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="disData.company"
                                label="ชื่อบริษัท"
                                :rules="requireRules"
                                required
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="6"
                              md="6"
                            >
                              <v-text-field
                                v-model="disData.displayName"
                                label="ชื่อที่ต้องการให้แสดง"
                                :rules="requireRules"
                                required
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="disData.email"
                                label="Email"
                                :rules="emailRules"
                                required
                              />
                            </v-col>
                            <v-col cols="12">
                              <v-text-field
                                v-model="disData.password"
                                label="Password*"
                                type="password"
                                :rules="moreRules"
                                required
                              />
                            </v-col>
                            <v-col
                              cols="12"
                              sm="12"
                            >
                              <v-text-field
                                v-model="disData.address"
                                label="ที่ตั้งบริษัท"
                                :rules="requireRules"
                                required
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                        <small>จำเป็นต้องกรอกทุกช่อง</small>
                      </v-card-text>
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
  data () {
    return {
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
        v => (v && v.length < 10) || 'ต้องมีความยาวมากกว่า 10 ตัวขึ้นไป'
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
        setTimeout(location.reload(), 5000)
      }
    }
  }
}
</script>

<style scoped>
.body-admin {
    max-width: 80%;
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
.theme--light.v-sheet--outlined {
    border: thin solid #FF8C00;
}
</style>

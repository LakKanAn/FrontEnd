<template>
  <div class="wid-100 ma-auto">
    <div class="content-book-center">
      <v-row justify="start" class="mx-auto mt-10">
        <v-col
          class="pa-0 d-flex justify-start"
          cols="12"
          sm="12"
          md="4"
          lg="4"
          xl="4"
        >
          <span class="mb-0 mx-auto text-h5 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4 font-weight-medium">
            การแลกเปลี่ยนของฉัน
          </span>
        </v-col>
      </v-row>
      <div class="mt-10">
        <v-row class="mb-5" justify="center">
          <v-col cols="12" sm="12" md="4" lg="4">
            <v-card
              outlined
              rounded="lg"
              class="pa-8"
              elevation="4"
              height="540"
            >
              <v-img max-height="326" max-width="255" class="mx-auto elevation-4" :src="mainBook.bookImage" />
              <div class="pt-4">
                <v-card-title class="text-subtitle-1 text-sm-subtitle-1 text-md-h4 text-lg-h4 text-xl-h4 pa-0">
                  {{ mainBook.bookTitle }}
                </v-card-title>
                <v-card-text class="pa-0">
                  <div class="py-1 px-0 over-text">
                    จากคุณ <span class="orange--text text--darken-1">{{ ownerName }}</span>
                  </div>
                  <div class="orange--text text--darken-1 d-flex align-end">
                    <v-icon color="primary" class="pr-2">
                      mdi-clock-time-four-outline
                    </v-icon> ระยะเวลาแลกเปลี่ยน {{ day }} วัน
                  </div>
                </v-card-text>
              </div>
            </v-card>
            <div class="d-flex align-center justify-center mt-8 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6">
              สถานะ <span class="red--text">: {{ p1_Status }}</span>
            </div>
            <v-row v-if="dialogm1 && !tradePage" justify="center" class="mt-1">
              <v-col cols="12" class="d-flex justify-center">
                <v-btn
                  color="primary"
                  dark
                  x-large
                  rounded
                  elevation="4"
                  width="70%"
                  @click="confirmDialog = true"
                >
                  ยืนยันการแลกเปลี่ยน
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="2"
            class="justify-center align-center d-flex"
          >
            <v-row justify="center">
              <v-col cols="12" class="d-flex justify-center">
                <img src="~/assets/icon/trade-mark.png" alt="trade-image">
              </v-col>
            </v-row>
          </v-col>
          <v-col v-if="!offerBookCard" cols="12" sm="12" md="4" lg="4">
            <v-card
              outlined
              rounded="lg"
              class="pa-8"
              elevation="4"
              height="540"
            >
              <v-img max-height="326" max-width="255" class="mx-auto elevation-4" :src="require('~/assets/image/raw_book.png')" />
              <div class="pt-4">
                <v-dialog scrollable max-width="500px">
                  <template #activator="{ on, attrs }">
                    <v-row class="my-auto">
                      <v-col cols="12" class="d-flex justify-center">
                        <v-btn
                          color="primary"
                          dark
                          v-bind="attrs"
                          x-large
                          rounded
                          elevation="4"
                          v-on="on"
                        >
                          เลือกหนังสือที่จะแลกเปลี่ยน
                        </v-btn>
                      </v-col>
                    </v-row>
                  </template>
                  <template #default="dialog2">
                    <v-card>
                      <v-card-title>คลังหนังสือของฉัน</v-card-title>
                      <v-card-text style="height: 300px">
                        <v-radio-group v-if="tradePage" v-model="dialogm1" column>
                          <v-radio
                            v-for="(listOffer, index) in offerBook"
                            :key="index"
                            :label="listOffer.bookTitle"
                            :value="listOffer.bookTitle"
                            @click="changeOfferCard(index)"
                          />
                        </v-radio-group>
                        <v-radio-group v-if="!tradePage" v-model="dialogm1" column>
                          <v-radio
                            v-for="(listOffer, index) in offerBook"
                            :key="index"
                            :label="listOffer.book.bookTitle"
                            :value="listOffer.book.bookTitle"
                            @click="changeOfferCard(index)"
                          />
                        </v-radio-group>
                      </v-card-text>
                      <v-card-actions class="py-0 px-10">
                        <v-row justify="center" class="my-0">
                          <v-col cols="12" md="6" lg="6" xl="6">
                            <v-btn
                              x-large
                              color="primary"
                              class="button-choice"
                              @click="dialog2.value = false"
                            >
                              ยืนยัน
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="6" lg="6" xl="6">
                            <v-btn
                              x-large
                              color="black"
                              class="button-choice"
                              outlined
                              @click="cancelSelect, dialog2.value = false"
                            >
                              ยกเลิก
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </div>
            </v-card>
          </v-col>

          <v-col v-if="offerBookCard" cols="12" sm="12" md="4" lg="4">
            <v-card
              outlined
              rounded="lg"
              class="pa-8"
              elevation="4"
              height="540"
            >
              <v-img max-height="326" max-width="255" class="mx-auto elevation-4" :src="offerBookCard.bookImage" />
              <div class="pt-4">
                <v-card-title class="text-subtitle-1 text-sm-subtitle-1 text-md-h4 text-lg-h4 text-xl-h4 pa-0">
                  {{ offerBookCard.bookTitle }}
                </v-card-title>
                <v-card-text class="pa-0">
                  <div class="py-1 px-0 over-text">
                    จากคุณ <span class="orange--text text--darken-1">{{ offerUserName }}</span>
                  </div>
                  <div class="orange--text text--darken-1 d-flex align-end">
                    <v-icon color="primary" class="pr-2">
                      mdi-clock-time-four-outline
                    </v-icon> ระยะเวลาแลกเปลี่ยน {{ day }} วัน
                  </div>
                </v-card-text>
              </div>
            </v-card>
            <div v-if="tradePage" class="d-flex align-center justify-center mt-8 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6">
              สถานะ <span class="red--text">: รอการยืนยัน</span>
            </div>
            <div v-if="!tradePage" class="d-flex align-center justify-center mt-8 text-body-2 text-sm-body-2 text-md-h6 text-lg-h6 text-xl-h6">
              สถานะ <span class="green--text">: ยืนยันแล้ว</span>
            </div>
            <v-row justify="center" class="mt-1">
              <v-col v-if="dialogm1 && tradePage == true && offerBookCard" cols="12" class="d-flex justify-center">
                <v-btn
                  color="primary"
                  dark
                  x-large
                  rounded
                  elevation="4"
                  width="70%"
                  @click="confirmDialog = true"
                >
                  ยืนยันการแลกเปลี่ยน
                </v-btn>
              </v-col>
              <v-col cols="12" class="d-flex justify-center">
                <v-dialog scrollable max-width="500px">
                  <template #activator="{ on, attrs }">
                    <v-row>
                      <v-col cols="12" class="d-flex justify-center">
                        <v-btn
                          v-bind="attrs"
                          color="black"
                          outlined
                          x-large
                          rounded
                          elevation="4"
                          width="70%"
                          v-on="on"
                        >
                          แก้ไขหนังสือ
                        </v-btn>
                      </v-col>
                    </v-row>
                  </template>
                  <template #default="dialog">
                    <v-card>
                      <v-card-title>คลังหนังสือของฉัน</v-card-title>
                      <v-card-text style="height: 300px">
                        <v-radio-group v-if="tradePage" v-model="dialogm1" column>
                          <v-radio
                            v-for="(listOffer, index) in offerBook"
                            :key="index"
                            :label="listOffer.bookTitle"
                            :value="listOffer.bookTitle"
                            @click="changeOfferCard(index)"
                          />
                        </v-radio-group>
                        <v-radio-group v-if="!tradePage" v-model="dialogm1" column>
                          <v-radio
                            v-for="(listOffer, index) in offerBook"
                            :key="index"
                            :label="listOffer.book.bookTitle"
                            :value="listOffer.book.bookTitle"
                            @click="changeOfferCard(index)"
                          />
                        </v-radio-group>
                      </v-card-text>
                      <v-card-actions class="py-0 px-10">
                        <v-row justify="center" class="my-0">
                          <v-col cols="12" md="6" lg="6" xl="6">
                            <v-btn
                              x-large
                              color="primary"
                              class="button-choice"
                              @click="dialog.value = false"
                            >
                              ยืนยัน
                            </v-btn>
                          </v-col>
                          <v-col cols="12" md="6" lg="6" xl="6">
                            <v-btn
                              x-large
                              color="black"
                              class="button-choice"
                              outlined
                              @click="offerBookCard = '', dialog.value = false"
                            >
                              ยกเลิก
                            </v-btn>
                          </v-col>
                        </v-row>
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
          <!-- <v-col cols="12" sm="12" md="5" lg="5">
            <v-card v-if="dialogm1" class="mx-auto my-12" max-width="374">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                />
              </template>

              <v-img height="500" :src="offerBookCard.bookImage" />

              <v-card-title>{{ offerBookCard.bookTitle }}</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0" />

                <div class="my-4 text-subtitle-trade-1">
                  {{ offerBookCard.author }}
                </div>

                <div>จากคุณ {{ ownerName }}</div>
              </v-card-text>

              <v-divider class="mx-4" />
            </v-card>
            <v-card v-if="!dialogm1" class="mx-auto my-12" max-width="374">
              <template slot="progress">
                <v-progress-linear
                  color="deep-purple"
                  height="10"
                  indeterminate
                />
              </template>

              <v-img
                height="500"
                :src="require('~/assets/icon/question_mark.png')"
              />

              <v-card-title>ชื่อหนังสือที่ต้องการจะแลกเปลี่ยน</v-card-title>

              <v-card-text>
                <v-row align="center" class="mx-0" />

                <div class="my-4 text-subtitle-trade-1">
                  ชื่อผู้เขียน
                </div>

                <div>เจ้าของหนังสือ</div>
              </v-card-text>

              <v-divider class="mx-4" />
            </v-card>
            <h3 class="d-flex align-center justify-center">
              สถานะของคุณ
            </h3>
            <h3 class="d-flex align-center justify-center">
              {{ p2_Status }}
            </h3>
            <v-row v-if="dialogm1" justify="center" class="mt-1">
              <v-col cols="6" class="d-flex justify-center">
                <v-btn
                  depressed
                  x-large
                  color="success"
                  @click="confirmDialog = true"
                >
                  ตกลง
                </v-btn>
              </v-col>
            </v-row>
          </v-col> -->
        </v-row>
      </div>
      <v-dialog v-model="confirmDialog" persistent max-width="400">
      <v-card rounded="lg" class="pa-4">
        <div class="d-flex justify-center">
          <v-icon color="black" size="80">
            mdi-alert-circle-outline
          </v-icon>
        </div>
        <v-card-title class="d-flex justify-center">
          ยืนยันการแลกเปลี่ยนหรือไม่
        </v-card-title>

        <v-card-actions>
          <v-row justify="center" class="my-0">
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                v-if="tradePage"
                x-large
                color="primary"
                class="button-choice"
                @click="confirmButton"
              >
                ยืนยัน
              </v-btn>
              <v-btn
                v-if="!tradePage"
                x-large
                color="primary"
                class="button-choice"
                @click="confirmButtonFinal"
              >
                ยืนยัน
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                x-large
                color="black"
                class="button-choice"
                outlined
                @click="confirmDialogg = false"
              >
                ยกเลิก
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['protectUser', 'authCheck'],
  props: { tradePage: Boolean },
  data () {
    return {
      idBook: '',
      mainBook: '',
      allData: '',
      day: '',
      offerBook: '',
      offerBookCard: '',
      ownerName: '',
      dialogm1: '',
      confirmDialog: false,
      p1_Status: 'ยังไม่ยืนยัน',
      p2_Status: 'ยังไม่ยืนยัน',
      dialogEdit: false,
      offerUserName: this.$nuxt.$fire.auth.currentUser.displayName
    }
  },
  async fetch () {
    if (this.tradePage === true) {
      this.idBook = localStorage.getItem('data-trade')
      const res = await this.$axios.$get('/trade/' + this.idBook)
      const resListBook = await this.$axios.$get('/users/bookshelf')
      this.allData = res
      this.day = res.postDetail
      this.mainBook = res.BookDetails
      this.ownerName = res.ownerDetails.name
      this.offerBook = resListBook.bookDetail
    } else {
      this.idBook = localStorage.getItem('owner-trade')
      const res = await this.$axios.$get(
        '/trade/' + this.idBook
      )
      this.allData = res
      this.day = res.postDetail
      this.mainBook = res.BookDetails
      this.ownerName = res.ownerDetails.name
      if (res.offerDetails === "Don't have any offers") {
        this.offerBook = []
      } else {
        this.offerBook = res.offerDetails
        console.log(res.offerDetails)
      }
    }
  },
  methods: {
    async confirmButton () {
      const index = this.offerBook.map(e => e.bookTitle).indexOf(this.dialogm1)
      await this.$axios.$post('/trade/' + this.idBook, {
        bookId: this.offerBook[index].bookId
      })
      this.confirmDialog = false
      setTimeout(this.$nuxt.$router.push('/user/storage'), 5000)
    },
    changeOfferCard (index) {
      if (this.tradePage === true) {
        this.offerBookCard = this.offerBook[index]
      } else {
        this.offerBookCard = this.offerBook[index].book
        this.offerUserName = this.offerBook[index].name
      }
    },
    cancelSelect () {
      if (this.tradePage === true) {
        this.dialogm1 = ''
      } else {
        this.dialogm1 = ''
        this.offerUserName = ''
      }
    },
    async confirmButtonFinal () {
      const index = this.offerBook.map(e => e.book.bookTitle).indexOf(this.dialogm1)
      await this.$axios.$post('/trade/confirm/' + this.idBook + '/' + this.offerBook[index].offerId)
      this.confirmDialog = false
      setTimeout(this.$nuxt.$router.push('/user/storage'), 5000)
    }
  }
}
</script>

<style>
.wid-100 {
    width: 100%;
    height: 100%;
}
.content-book-center{
  margin-top: 27px;
  margin-left: 10%;
  margin-right: 10%;
  background-color: white;
  /* height: 100%; */
}
@media only screen and (max-width: 600px) {
    .content-book-center {
  margin-left: 2%;
  margin-right: 2%;
  }
}
.text-subtitle-trade-1 {
  font-family: 'Prompt', sans-serif !important;
}
.bg-orange {
  background-color: #ff8c00;
  color: white;
}
.font-white {
  color: white;
}
.font-black {
  color: black;
}
@media screen and (max-width: 1700px) {
  .wid-60 {
    width: 90%;
  }
}
@media screen and (max-width: 479px) {
  .h1-trade {
    font-size: 18px !important;
    align-items: center;
  }
  .text-head {
    font-size: 18px !important;
    align-items: center;
  }
}
</style>

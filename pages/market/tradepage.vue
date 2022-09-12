<template>
  <div class="ma-auto">
    <v-col class="py-5 bg-orange" cols="12" sm="12" md="12">
      <h1 class="d-flex justify-center h1-trade">
        <img class="pr-2" src="~/assets/icon/trade-white.png" alt="trade-image">การแลกเปลี่ยนของฉัน
      </h1>
    </v-col>
    <div class="wid-60 ma-auto">
      <v-row class="mt-2">
        <v-col cols="12">
          <h2 class="d-flex justify-center align-center text-head">
            <img class="pr-2" src="~/assets/icon/bi_clock_black.png"> ระยะเวลาการแลกเปลี่ยน: {{ day }} วัน
          </h2>
        </v-col>
        <v-col cols="12">
          <h2 class="d-flex justify-center align-center text-head" @click="con">
            ระหว่าง คุณ {{ ownerName }} กับ คุณ {{ $nuxt.$fire.auth.currentUser.displayName }}
          </h2>
        </v-col>
      </v-row>
      <v-row class="mb-5">
        <v-col cols="12" sm="12" md="5" lg="5">
          <v-card
            color="#FF8C00"
            class="mx-auto my-12 font-white"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              />
            </template>

            <v-img
              height="500"
              :src="mainBook.bookImage"
            />

            <v-card-title class="font-white">
              {{ mainBook.bookTitle }}
            </v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              />

              <div class="my-4 text-subtitle-trade-1 font-white">
                {{ mainBook.author }}
              </div>

              <div class="font-white">
                จากคุณ {{ ownerName }}
              </div>
            </v-card-text>

            <v-divider class="mx-4" />
          </v-card>
          <h3 class="d-flex align-center justify-center">
            สถานะของเพื่อน
          </h3>
          <h3 class="d-flex align-center justify-center">
            {{ p1_Status }}
          </h3>
        </v-col>
        <v-col cols="12" sm="12" md="12" lg="2" class="justify-center align-center d-flex">
          <v-row justify="center">
            <v-dialog
              v-model="dialog"
              scrollable
              max-width="500px"
            >
              <template #activator="{ on, attrs }">
                <v-row>
                  <v-col cols="12" class="d-flex justify-center">
                    <img src="~/assets/icon/trade-mark.png" alt="trade-image">
                  </v-col>
                  <v-col cols="12" class="d-flex justify-center">
                    <v-btn
                      color="primary"
                      dark
                      v-bind="attrs"
                      x-large
                      v-on="on"
                    >
                      เลือกหนังสือที่จะแลกเปลี่ยน
                    </v-btn>
                  </v-col>
                </v-row>
              </template>
              <v-card>
                <v-card-title>เลือกหนังสือที่จะแลกเปลี่ยน</v-card-title>
                <v-divider />
                <v-card-text style="height: 300px;">
                  <v-radio-group
                    v-model="dialogm1"
                    column
                  >
                    <v-radio
                      v-for="(listOffer,index) in offerBook"
                      :key="index"
                      :label="listOffer.bookTitle"
                      :value="listOffer.bookTitle"
                      @click="changeOfferCard(index)"
                    />
                  </v-radio-group>
                </v-card-text>
                <v-divider />
                <v-card-actions>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="cancelSelect"
                  >
                    ยกเลิก
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialog = false"
                  >
                    เลือก
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </v-col>
        <v-col cols="12" sm="12" md="5" lg="5">
          <v-card
            v-if="dialogm1"
            class="mx-auto my-12"
            max-width="374"
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              />
            </template>

            <v-img
              height="500"
              :src="offerBookCard.bookImage"
            />

            <v-card-title>{{ offerBookCard.bookTitle }}</v-card-title>

            <v-card-text>
              <v-row
                align="center"
                class="mx-0"
              />

              <div class="my-4 text-subtitle-trade-1">
                {{ offerBookCard.author }}
              </div>

              <div>จากคุณ {{ ownerName }}</div>
            </v-card-text>

            <v-divider class="mx-4" />
          </v-card>
          <v-card
            v-if="!dialogm1"
            class="mx-auto my-12"
            max-width="374"
          >
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
              <v-row
                align="center"
                class="mx-0"
              />

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
          <v-row justify="center" v-if="dialogm1" class="mt-1">
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
        </v-col>
      </v-row>
    </div>
        <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title>
          กรุณายืนยันการแลกเปลี่ยน
        </v-card-title>

        <v-card-text>
          หากกดตกลงแล้วหนังสือที่ถูกแลกเปลี่ยนจะอยู่ในคลัง
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="#FF8C00"
            text
            @click="confirmDialog = false"
          >
            ยกเลิก
          </v-btn>

          <v-btn
            color="#FF8C00"
            text
            @click="confirmButton"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: ['protectUser', 'authCheck'],
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
      dialog: false
    }
  },
  async fetch () {
    this.idBook = localStorage.getItem('data-trade')
    const res = await this.$axios.$get(
      '/trade/' + this.idBook
    )
    const resListBook = await this.$axios.$get(
      '/users/bookshelf'
    )
    console.log(res)
    this.allData = res
    this.day = res.postDetail
    this.mainBook = res.BookDetails
    this.ownerName = res.ownerDetails.name
    this.offerBook = resListBook.bookDetail
    console.log(this.offerBook)
  },
  methods: {
    con () {
      console.log(this.dialogm1)
    },
    async confirmButton () {
      const index = this.offerBook.map(e => e.bookTitle).indexOf(this.dialogm1)
      await this.$axios.$post('/trade/' + this.idBook, { bookId: this.offerBook[index].bookId })
      this.confirmDialog = false
    },
    changeOfferCard (index) {
      this.offerBookCard = this.offerBook[index]
      console.log(this.offerBookCard)
    },
    cancelSelect () {
      this.dialogm1 = ''
      this.dialog = false
    }
  }
}
</script>

<style>
.wid-60 {
  width: 60%;
}
.text-subtitle-trade-1{
     font-family: 'Prompt', sans-serif !important;
}
.bg-orange {
    background-color: #FF8C00;
    color: white;
}
.font-white{
  color: white;
}
.font-black{
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

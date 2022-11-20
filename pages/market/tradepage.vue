<template>
  <trade :tradePage="true"></trade>
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
    const res = await this.$axios.$get('/trade/' + this.idBook)
    const resListBook = await this.$axios.$get('/users/bookshelf')
    this.allData = res
    this.day = res.postDetail
    this.mainBook = res.BookDetails
    this.ownerName = res.ownerDetails.name
    this.offerBook = resListBook.bookDetail
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
      this.offerBookCard = this.offerBook[index]
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

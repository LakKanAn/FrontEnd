<template>
  <div class="justify-center align-self-center width-100">
    <v-row class="row-login" align="center" justify="center">
      <v-col cols="12" sm="12" md="12" align="center" justify="center">
        <v-card class="containner">
          <v-row align="center" justify="center">
            <v-col cols="12" sm="12" md="12" align="center" justify="center">
              <h1 class="pa-5">
                ลงทะเบียนหนังสือ
              </h1>
            </v-col>
          </v-row>
          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
            <v-text-field
              v-model="bookTitle"
              :rules="nameRules"
              label="ชื่อหนังสือ"
              required
              outlined
            />

            <v-text-field
              v-model="author"
              :rules="nameRules"
              label="ชื่อผู้เขียน"
              required
              outlined
            />
            <v-select
              v-model="category"
              :items="items"
              :rules="[v => !!v || 'Item is required']"
              label="ประเภทหนังสือ"
              required
              outlined
            />
            <div v-if="category === 'บันเทิงคดี'" class="genre-select">
              <v-row>
                <v-col cols="10">
                  <v-select
                    v-model="genreSelect"
                    :items="itemsGenre"
                    :rules="[v => !!v || 'Item is required']"
                    label="หนวดหมู่"
                    class="genre-input"
                    required
                    outlined
                  />
                </v-col>
                <v-col cols="2">
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    large
                    @click="addGenre"
                  >
                    เพิ่ม
                  </v-btn>
                </v-col>
              </v-row>
              <v-row v-if="genre.length !== 0" class="ma-0 pb-5" align-content="start">
                <v-col v-for="(itemsgenre, index) in genre" :key="index" cols="2">
                  <v-btn
                    elevation="2"
                    color="red"
                    @click="deleteGenre(index)"
                  >
                    {{ itemsgenre }} X
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <v-text-field
              v-model="description"
              label="รายละเอียด"
              required
              outlined
            />
            <v-text-field
              v-model="price"
              label="ราคา"
              required
              type="number"
              hide-spin-buttons
              outlined
            />
            <v-file-input
              v-model="fileImage"
              accept="image/jpeg"
              label="ปกหนังสือ"
              required
              outlined
            />
            <v-row class="mt-5" justify="center">
              <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4"
                large
                @click="validate"
              >
                บันทึก
              </v-btn>

              <v-btn
                color="error"
                class="mr-4"
                large
                @click="cancelBook"
              >
                ยกเลิก
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    bookId: 0,
    valid: true,
    bookTitle: '',
    author: '',
    category: '',
    description: '',
    price: '',
    genreSelect: '',
    genre: [],
    fileImage: [],
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 100) || 'Text must be less than 100 characters'
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    select: null,
    items: [
      'สารคดี',
      'บันเทิงคดี',
      'สิ่งพิมพ์',
      'ตำรา',
      'วารสาร',
      'นิตยสาร'
    ],
    itemsGenre: [
      'ตลก',
      'ต่อสู้',
      'โรแมนติก',
      'วิทยาศาสตร์',
      'แฟนตาซี',
      'ระทึกขวัญ',
      'สืบสวนสอบสวน',
      'อิงประวัติศาสตร์'
    ],
    checkbox: false
  }),
  fetch () {
    if (this.$nuxt.$route.path === '/distributor/editbook') {
      const retrievedObject = localStorage.getItem('bookObject')
      const jsonP = JSON.parse(retrievedObject)
      this.bookTitle = jsonP.bookTitle
      this.author = jsonP.author
      this.category = jsonP.category
      this.genre = jsonP.genre
      this.description = jsonP.description
      this.price = jsonP.price
      this.bookId = jsonP.bookId
    }
  },
  methods: {
    addBook () {
      this.$nuxt.$router.push('/distributor/insertbook')
    },
    addGenre () {
      let checks = false
      this.genre.forEach((e) => {
        if (e === this.genreSelect) {
          checks = true
        }
      })
      if (this.genreSelect !== '' && checks !== true) {
        this.genre.push(this.genreSelect)
      }
    },
    deleteGenre (index) {
      this.genre.splice(index, 1)
    },
    validate () {
      if (this.$refs.form.validate()) {
        if (this.$nuxt.$route.path === '/distributor/editbook') {
          this.$axios.$post('/distributors/books/edit/' + this.bookId,
            {
              bookTitle: this.bookTitle,
              author: this.author,
              category: this.category,
              description: this.description,
              price: this.price,
              genre: this.genre
            }).then((user) => {
            const formData = new FormData()
            formData.append('image', this.fileImage)
            this.$axios.$post('/distributors/books/' + user.user.bookId, formData)
          })
          this.$nuxt.$router.push('/distributor/managebook')
        } else {
          this.$axios.$post('/distributors/books',
            {
              bookTitle: this.bookTitle,
              author: this.author,
              category: this.category,
              description: this.description,
              price: this.price,
              genre: (this.category === 'บันเทิงคดี') ? this.genre : ''
            }).then((user) => {
            const formData = new FormData()
            formData.append('image', this.fileImage)
            this.$axios.$post('/distributors/books/' + user.newBook.bookId, formData)
          })
          this.$nuxt.$router.push('/distributor/managebook')
        }
      }
    },
    cancelBook () {
      this.$nuxt.$router.push('/distributor/managebook')
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style>
.v-application{
    font-family: 'Prompt', sans-serif !important;
 }
.containner{
  margin-left: 10%;
  margin-right: 10%;
  padding: 5%;
  padding-top: 25px;
  padding-bottom: 35px;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px 3px 1px -2px rgb(255, 140, 0), 0px 2px 2px 0px rgb(255, 140, 0), 0px 1px 5px 0px rgb(255, 140, 0);
}
.width-100{
  width: 100%;
  height: 100%;
  background-image: url("~/assets/background/book-bg.jpg");
  background-size: auto;
}
.row-login{
    height: 100%;
}

</style>

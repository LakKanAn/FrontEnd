v-col<template>
  <div class="bg-image">
    <div class="justify-center width-100 font-propmt">
      <v-row class="row-login" align="center" justify="center">
        <v-col
          cols="12"
          sm="12"
          md="12"
          align="center"
          justify="center"
          class="ma-auto"
        >
          <v-card flat class="containner">
            <v-row align="center" justify="center">
              <v-col cols="12" sm="12" md="12" align="center" justify="center">
                <h2 class="pa-5">
                  ลงทะเบียนหนังสือ
                </h2>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="8" md="8">
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
                    :rules="[v => !!v || 'จำเป็นต้องใส่ช่องนี้']"
                    label="ประเภทหนังสือ"
                    required
                    outlined
                  />
                  <div class="genre-select">
                    <v-row>
                      <v-col cols="10">
                        <v-select
                          v-model="genreSelect"
                          :items="itemsGenre"
                          :rules="[v => !!v || 'จำเป็นต้องใส่ช่องนี้']"
                          label="หมวดหมู่"
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
                        <v-chip
                          color="red"
                          class="mx-2"
                          close
                          outlined
                          @click:close="deleteGenre(index)"
                        >
                          {{ itemsgenre }}
                        </v-chip>
                      </v-col>
                    </v-row>
                  </div>
                  <v-textarea
                    v-model="description"
                    label="รายละเอียด"
                    required
                    no-resize
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
                    v-model="pdfFile"
                    accept="application/pdf"
                    label="ไฟล์ PDF"
                    required
                    outlined
                  />
                  <v-file-input
                    v-model="fileImage"
                    accept="image/jpeg"
                    label="ปกหนังสือ"
                    required
                    outlined
                    @change="image_preview"
                  />
                </v-form>
              </v-col>
              <v-col cols="12" sm="4" md="4" justify="center">
                <v-row>
                  <v-col cols="12" sm="12" md="12" class="pb-0">
                    <v-img v-if="imageUrl != '' && imageUrl != null" :src="imageUrl" class="mx-auto mb-4 elevation-4" max-width="400" />
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="py-0">
                    <v-card-title class="pb-4 pt-0 px-0 text-left">
                      {{ bookTitle }}
                    </v-card-title>
                    <v-card-subtitle class="py-1 px-0 over-text">
                      {{ author }}
                    </v-card-subtitle>
                    <v-card-text class="pa-0 over-text-des">
                      <p> {{ description }}</p>
                    </v-card-text>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
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
          </v-card>
        </v-col>
      </v-row>
    </div>
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
    imageUrl: null,
    pdfFile: null,
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
    image_preview () {
      if (this.fileImage !== null) {
        this.imageUrl = URL.createObjectURL(this.fileImage)
      } else {
        this.imageUrl = ''
      }
    },
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
              genre: (this.category === 'บันเทิงคดี') ? this.genre : this.category
            }).then((user) => {
            const formData = new FormData()
            const formData2 = new FormData()
            formData.append('image', this.fileImage)
            formData2.append('content', this.pdfFile)
            this.$axios.$post('/distributors/books/' + this.bookId, formData)
            this.$axios.$post('/distributors/books/' + this.bookId, formData2)
          })
          setTimeout(this.$nuxt.$router.push('/distributor/managebook'), 5000)
        } else {
          this.$axios.$post('/distributors/books',
            {
              bookTitle: this.bookTitle,
              author: this.author,
              category: this.category,
              description: this.description,
              price: this.price,
              genre: (this.category === 'บันเทิงคดี') ? this.genre : this.category
            }).then((user) => {
            const formData = new FormData()
            const formData2 = new FormData()
            formData.append('image', this.fileImage)
            formData2.append('content', this.pdfFile)
            this.$axios.$post('/distributors/books/' + user.newBook.bookId, formData)
            this.$axios.$post('/distributors/books/' + user.newBook.bookId, formData2)
          })
          setTimeout(this.$nuxt.$router.push('/distributor/managebook'), 5000)
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

<style scoped>
@media only screen and (max-width: 600px) {
.containner{
  margin-left: 10% !important;
  margin-right: 10% !important;
}
.width-100{
  width: 90% !important;
}
}
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
.containner{
  padding-left: 10%;
  padding-right: 5%;
  padding: 5%;
  padding-top: 10%;
  padding-bottom: 10%;
}
.v-sheet.v-card:not(.v-sheet--outlined) {
    box-shadow: 0px 3px 1px -2px rgb(255, 140, 0), 0px 2px 2px 0px rgb(255, 140, 0), 0px 1px 5px 0px rgb(255, 140, 0);
}
.width-100{
  width: 60%;
}
.row-login{
    height: 100%;
}
.over-text{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
}
.over-text-des{
display: -webkit-box;
-webkit-line-clamp: 5;
-webkit-box-orient: vertical;
overflow: hidden;
text-overflow: ellipsis;
text-align: left;
}
.bg-image {
  background-image: url("~/assets/background/book-bg-flat.png");
    background-repeat: repeat;
    background-size: auto;
        width: 100%;
    height: 100%;
}
</style>

<template>
  <book-form />
</template>

<script>
import bookForm from '~/components/bookForm.vue'
export default {
  components: { bookForm },
  middleware: ['protectDis', 'authCheck'],
  data: () => ({
    valid: true,
    bookTitle: '',
    author: '',
    category: '',
    description: '',
    price: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be less than 10 characters'
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
    checkbox: false
  }),
  methods: {
    addBook () {
      this.$nuxt.$router.push('/distributor/insertbook')
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.$axios.$post('/distributors/books',
          {
            data: {
              bookTitle: this.bookTitle,
              author: this.author,
              category: this.category,
              description: this.description,
              price: this.price
            }
          })
      }
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
  }
}
</script>

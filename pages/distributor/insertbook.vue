<template>
  <book-form />
</template>

<script>
import bookForm from '~/components/bookForm.vue'
export default {
  components: { bookForm },
  middleware: ['protectDis', 'authCheck'],
  data: () => ({
  })
}
</script>

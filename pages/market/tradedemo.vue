<template>
  <trade :trade-page="true" />
</template>

<script>
import trade from '~/components/trade.vue'
export default {
  components: { trade },
  middleware: ['authCheck'],
  data: () => ({
  })
}
</script>

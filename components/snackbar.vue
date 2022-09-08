<template>
  <div class="text-center ma-2">
    <v-btn
      dark
    >
      {{ snack }}
    </v-btn>
    <v-snackbar
      v-model="snack"
    >
      {{ text }}

      <template #action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snack = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: ['text', 'idBook', 'wtfsss'],
  data () {
    return {
      snack: this.wtfsss
    }
  }
}
</script>

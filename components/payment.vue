<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-col v-if="$nuxt.$auth.loggedIn" class="ma-auto d-flex justify-center">
          <v-btn
            v-if="$nuxt.$auth.user.role === 'user'"
            v-bind="attrs"
            elevation="2"
            rounded
            large
            class="ma-auto buy-button justify-center font-weight-regular"
            color="primary"
            v-on="on"
            @click="popup"
          >
            ซื้อหนังสือ
          </v-btn>
        </v-col>
        <v-col v-if="!$nuxt.$auth.loggedIn" class="ma-auto d-flex justify-center">
          <v-btn
            v-bind="attrs"
            elevation="2"
            rounded
            large
            class="ma-auto buy-button justify-center font-weight-regular"
            color="primary"
            v-on="on"
            @click="popup"
          >
            ซื้อหนังสือ
          </v-btn>
        </v-col>
      </template>

      <v-card rounded="lg">
        <v-card-text>
          <div class="card-form">
            <div class="card-form__inner">
              <p class="text-h5 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4 black--text mb-1">
                ชำระเงิน
              </p>
              <div class="card-input">
                <label for="cardNumber" class="card-input__label">
                  หมายเลขบัตร (ไม่ต้องเว้นวรรค)
                </label>
                <input
                  id="cardNumber"
                  v-imask="cardMasks"
                  :value="cardNumber"
                  autofocus
                  class="card-input__input elevation-3"
                  autocomplete="off"
                  @accept="onAcceptCardType"
                >
              </div>
              <div class="card-input">
                <label for="cardName" class="card-input__label">
                  ชื่อบนบัตร
                </label>
                <input

                  id="cardName"
                  v-model="name"
                  class="card-input__input elevation-3"
                  autocomplete="off"
                >
              </div>
              <v-row>
                <v-col cols="12" md="8" lg="8" xl="8">
                  <div class="card-form__group">
                    <label for="cardMonth" class="card-input__label">
                      วันหมดอายุ (MM/YY)
                    </label>
                    <select
                      id="cardMonth"
                      v-model="expireMonth"
                      class="card-input__input -select elevation-3"
                    >
                      <option value="" disabled selected>
                        เดือน
                      </option>
                      <option
                        v-for="n in 12"
                        :key="n"
                        :value="n < 10 ? '0' + n : n"
                      >
                        {{ 10 > n ? "0" + n : n }}
                      </option>
                    </select>
                    <select
                      id="cardYear"
                      v-model="expireYear"
                      class="card-input__input -select elevation-3"
                    >
                      <option value="" disabled selected>
                        ปี
                      </option>
                      <option
                        v-for="(n, $index) in 12"
                        :key="n"
                        :value="$index + currentYear"
                      >
                        {{ $index + currentYear }}
                      </option>
                    </select>
                  </div>
                </v-col>
                <v-col cols="12" md="4" lg="4" xl="8">
                  <div class="card-input">
                    <label for="cardCvv" class="card-input__label">CVV</label>
                    <v-tooltip
                      bottom
                    >
                      <template #activator="{ on, attrs }">
                        <div
                          v-bind="attrs"
                          v-on="on"
                        >
                          <input
                            id="cardCvv"
                            v-imask="cvvMask"
                            class="card-input__input elevation-3"
                            :value="cvv"
                            autocomplete="off"
                            @accept="onAcceptCvv"
                          >
                        </div>
                      </template>
                      <v-img :src="require('~/assets/image/cvv.png')" max-width="103" />
                    </v-tooltip>
                  </div>
                </v-col>
              </v-row>
              <v-row justify="center" class="my-2">
                <v-col cols="12" md="6" lg="6" xl="6">
                  <v-btn x-large color="primary" class="button-choice" @click="buy">
                    ยืนยันการชำระเงิน
                  </v-btn>
                </v-col>
                <v-col cols="12" md="6" lg="6" xl="6">
                  <v-btn x-large color="black" class="button-choice" outlined @click="dialog = false">
                    ยกเลิก
                  </v-btn>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-card-text>

        <v-divider />
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="400"
    >
      <v-card rounded="lg" class="pa-4">
        <div class="d-flex justify-center">
          <v-icon color="black" size="80">
            mdi-alert-circle-outline
          </v-icon>
        </div>
        <v-card-title class="d-flex justify-center">
          ยืนยันการชำระเงินหรือไม่
        </v-card-title>

        <v-card-actions>
          <v-row justify="center" class="my-0">
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                x-large
                color="primary"
                class="button-choice"
                @click="confirmBuy"
              >
                ยืนยันการชำระเงิน
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" lg="6" xl="6">
              <v-btn
                x-large
                color="black"
                class="button-choice"
                outlined
                @click="dialog = false,confirmDialog = false"
              >
                ยกเลิก
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="succDialog"
      max-width="350"
    >
      <v-card rounded="lg" class="pa-4">
        <div class="d-flex justify-center">
          <v-icon color="success" size="80">
            mdi-check-circle-outline
          </v-icon>
        </div>
        <v-card-title class="d-flex justify-center">
          ซื้อหนังสือสำเร็จ
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { IMaskDirective } from 'vue-imask'
import { cardMasks, cvvMask } from '../plugins/masks'
export default {
  directives: {
    imask: IMaskDirective
  },
  props: ['price', 'idBook'],
  data () {
    return {
      dialog: false,
      cardNumber: '',
      confirmDialog: false,
      expireMonth: '',
      expireYear: '',
      name: '',
      cvv: '',
      currentYear: new Date().getFullYear(),
      cardMasks,
      cvvMask,
      paymentId: '',
      succDialog: false
    }
  },
  methods: {
    onAcceptCardType (e) {
      const maskRef = e.detail
      const type = maskRef.masked.currentMask.cardtype

      if (type !== 'Unknown') {
        this.symbolImage = type
      }

      this.cardNumber = maskRef.value
    },
    onAcceptCvv (e) {
      const maskRef = e.detail
      this.cvv = maskRef.value
    },
    popup () {
      if (!this.$nuxt.$auth.loggedIn) {
        this.$nuxt.$router.push('/login')
      } else {
        this.dialog = true
      }
    },
    async buy () {
      if (this.cardNumber && this.name && this.expireMonth && this.expireYear && this.cvv) {
        const res = await this.$axios.$post(
          '/payment/create/' + this.idBook
        )
        this.paymentId = res.paymentId
        this.confirmDialog = true
      }
    },
    async confirmBuy () {
      await this.$axios.$put(
        '/payment/confirm/' + this.idBook
        , { paymentId: this.paymentId })
      setTimeout(
        this.dialog = false,
        this.confirmDialog = false,
        this.succDialog = true, 5000)
      setTimeout(
        this.$nuxt.$router.push('/'), 10000)
    }
  }

}
</script>

<style lang="scss">
.button-choice{
    display: flex;
    width: 100%;
}
.buy-button{
    display: flex;
    width: 100%;
}
.card-container {
  margin: 30px auto 50px auto;
}
.card-form {
  max-width: 570px;
  margin: auto;
  width: 100%;

  &__inner {
    background: #fff;
    padding: 20px;
  }

  &__row {
    display: flex;
    align-items: flex-start;
  }

  &__col {
    flex: auto;
    margin-right: 15px;

    &:last-child {
      margin-right: 0;
    }

    &.-cvv {
      max-width: 150px;
    }
  }

  &__group {
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;

    .card-input__input {
      flex: 1;
      margin-right: 15px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__button {
    width: 45%;
    height: 55px;
    background: #FF8C00;
    border: none;
    border-radius: 5px;
    font-size: 22px;
    font-weight: 500;
    box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
    color: #fff;
    margin-top: 20px;
    cursor: pointer;

    &:hover {
      background: darken(#FF8C00, 5%);
    }
  }
}
.v-card__title{
  font-family: 'Prompt', sans-serif !important;
}
.card-input {
  margin-bottom: 20px;
  &__label {
    margin-bottom: 5px;
    color: #1a3b5d;
    width: 100%;
    display: block;
    text-align: left;
  }
  &__input {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    box-shadow: none;
    transition: all 0.3s ease-in-out;
    font-size: 18px;
    padding: 5px 15px;
    background: none;
    color: #1a3b5d;

    &:hover,
    &:focus {
      border-color: #38a294;
    }

    &:focus {
      box-shadow: 0px 10px 20px -13px rgba(32, 56, 117, 0.35);
    }
    &.-select {
      -webkit-appearance: none;
      background-image: url("/img/select.png");
      background-size: 12px;
      background-position: 90% center;
      background-repeat: no-repeat;
      padding-right: 30px;
    }
  }
}
</style>

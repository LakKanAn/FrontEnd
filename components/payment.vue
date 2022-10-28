<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template #activator="{ on, attrs }">
        <v-col class="ma-auto d-flex justify-center">
          <v-btn
            v-bind="attrs"
            elevation="2"
            outlined
            rounded
            large
            class="ma-auto buy-button justify-center"
            v-on="on"
            @click="popup"
          >
            ซื้อ {{ price }} บาท
          </v-btn>
        </v-col>
      </template>

      <v-card>
        <v-card-title class="justify-center">
          Payment
        </v-card-title>

        <v-card-text>
          <div class="card-form">
            <div class="card-form__inner">
              <div class="card-input">
                <label for="cardNumber" class="card-input__label">
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  v-imask="cardMasks"
                  :value="cardNumber"
                  autofocus
                  class="card-input__input"
                  autocomplete="off"
                  @accept="onAcceptCardType"
                >
              </div>
              <div class="card-input">
                <label for="cardName" class="card-input__label">
                  Card Owner
                </label>
                <input

                  id="cardName"
                  v-model="name"
                  class="card-input__input"
                  autocomplete="off"
                >
              </div>
              <div class="card-form__row">
                <div class="card-form__col">
                  <div class="card-form__group">
                    <label for="cardMonth" class="card-input__label">
                      Expiration Date
                    </label>
                    <select
                      id="cardMonth"
                      v-model="expireMonth"
                      class="card-input__input -select"
                    >
                      <option value="" disabled selected>
                        Month
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
                      class="card-input__input -select"
                    >
                      <option value="" disabled selected>
                        Year
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
                </div>
                <div class="card-form__col -cvv">
                  <div class="card-input">
                    <label for="cardCvv" class="card-input__label">CVV</label>
                    <input

                      id="cardCvv"
                      v-imask="cvvMask"
                      class="card-input__input"
                      :value="cvv"
                      autocomplete="off"
                      @accept="onAcceptCvv"
                    >
                  </div>
                </div>
              </div>
              <button class="card-form__button" @click="buy">
                ชำระเงิน
              </button>
            </div>
          </div>
        </v-card-text>

        <v-divider />
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="confirmDialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="">
          กรุณายืนยันการชำระเงิน
        </v-card-title>

        <v-card-text>
          หากกดตกลงแล้วหนังสือที่ถูกซื้อจะอยู่ในคลังสินค้าของผู้ใช้งาน
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false,confirmDialog = false"
          >
            ยกเลิก
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="confirmBuy"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
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
      paymentId: ''
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
      if (this.$nuxt.$auth.loggedIn) {
        this.dialog = true
      } else {
        this.$nuxt.$router.push('/login')
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
        , { paymentId: this.paymentId }).then(
        setTimeout(
          this.dialog = false,
          this.confirmDialog = false, 5000)
      )
    }
  }

}
</script>

<style lang="scss">
.buy-button{
    display: flex;
    width: 80%;
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
    box-shadow: 0 30px 60px 0 rgba(90, 116, 148, 0.4);
    border-radius: 10px;
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
    width: 100%;
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
    border: 1px solid #ced6e0;
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

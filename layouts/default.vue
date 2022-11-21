<template>
  <v-app>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-img
        :src="require('~/assets/logo/logo-web.png')"
        max-width="300"
        height="50"
        class="my-auto logo-web"
        @click="home"
      />
      <v-spacer />
      <!-- <v-toolbar-title class="home-navbar" @click="home" v-text="title" /> -->
      <div v-if="$nuxt.$auth.loggedIn" class="text-center font-propmt">
        <v-menu
          v-if="$nuxt.$auth.loggedIn"
          :close-on-content-click="false"
          :nudge-width="100"
          offset-x
        >
          <template #activator="{ on, attrs }">
            <div v-if="$nuxt.$auth.loggedIn" v-bind="attrs" v-on="on">
              <v-list-item-avatar v-if="$nuxt.$auth.user.role === 'user'">
                <img
                  v-if="$nuxt.$auth.loggedIn"
                  :src="$nuxt.$fire.auth.currentUser.photoURL"
                  alt="UserPic"
                >
              </v-list-item-avatar>
              <v-list-item-avatar
                v-if="$nuxt.$auth.user.role === 'distributor' || $nuxt.$auth.user.role === 'admin'"
              >
                <v-icon v-if="$nuxt.$auth.loggedIn" color="#FF8C00" large>
                  mdi-account-circle-outline
                </v-icon>
              </v-list-item-avatar>
              <span class="displayName">
                {{ $nuxt.$fire.auth.currentUser.displayName }}
              </span>
              <v-icon large>
                mdi-menu-down
              </v-icon>
            </div>
          </template>

          <v-card v-if="$nuxt.$auth.loggedIn">
            <v-list>
              <v-list-item>
                <v-list-item-avatar v-if="$nuxt.$auth.user.role === 'user'">
                  <img
                    :src="$nuxt.$fire.auth.currentUser.photoURL"
                    alt="John"
                  >
                </v-list-item-avatar>
                <v-list-item-avatar
                  v-if="$nuxt.$auth.user.role === 'distributor' || $nuxt.$auth.user.role === 'admin'"
                >
                  <v-icon v-if="$nuxt.$auth.loggedIn" color="#FF8C00" large>
                    mdi-account-circle-outline
                  </v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>
                    {{
                      $nuxt.$fire.auth.currentUser.displayName
                    }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{
                      $nuxt.$fire.auth.currentUser.email
                    }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />
            <v-list>
              <v-list-item-group color="primary">
                <v-list-item
                  v-if="$nuxt.$auth.user.role === 'user'"
                  @click="storage"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="'คลัง'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="$nuxt.$auth.user.role === 'distributor'"
                  @click="manageBook"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="'จัดการหนังสือ'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="$nuxt.$auth.user.role === 'distributor'" @click="profile">
                  <v-list-item-content>
                    <v-list-item-title v-text="'ข้อมูลส่วนตัว'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="$nuxt.$auth.user.role === 'admin'" @click="dashBoard">
                  <v-list-item-content>
                    <v-list-item-title v-text="'Dashboard'" />
                  </v-list-item-content>
                </v-list-item>
                <!-- <v-list-item v-if="$nuxt.$auth.user.role === 'user'">
                  <v-list-item-content>
                    <v-list-item-title v-text="'ประวัติการใช้งาน'" />
                  </v-list-item-content>
                </v-list-item> -->
                <v-list-item
                  v-if="$nuxt.$auth.user.role === 'user'"
                  @click="exchangeBook"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="'หน้าแลกเปลี่ยน'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="signout">
                  <v-list-item-content>
                    <v-list-item-title v-text="'ออกจากระบบ'" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-if="!$nuxt.$auth.loggedIn" class="text-center font-propmt">
        <v-btn large @click="login">
          ล็อคอิน
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <div v-if="$nuxt.$auth.loggedIn">
      <v-row v-if="$nuxt.$auth.user.role === 'user'" justify="center">
        <v-dialog v-model="dialogReport" max-width="600px">
          <template #activator="{ on, attrs }">
            <v-fab-transition v-if="$nuxt.$auth.loggedIn">
              <v-btn
                large
                dark
                bottom
                right
                fixed
                class="v-btn--example"
                v-bind="attrs"
                v-on="on"
              >
                แจ้งปัญหา
              </v-btn>
            </v-fab-transition>
          </template>
          <v-card class="font-propmt pa-6">
            <v-card-title class="px-0">
              <p class="text-h5 text-sm-h5 text-md-h4 text-lg-h4 text-xl-h4 black--text mb-1">
                แจ้งปัญหา
              </p>
            </v-card-title>
            <v-form ref="formReport">
              <v-row dense>
                <v-col cols="12">
                  <p class="mb-1 pa-0 d-flex justify-start">
                    หัวข้อเรื่อง
                  </p>
                  <v-text-field v-model="topic" solo label="หัวข้อเรื่อง" :rules="req" required />
                </v-col>
                <v-col cols="12">
                  <p class="mb-1 pa-0 d-flex justify-start">
                    รายละเอียด
                  </p>
                  <v-textarea
                    v-model="details"
                    label="รายละเอียด"
                    solo
                    no-resize
                    required
                    :rules="req"
                  />
                </v-col>
              </v-row>
            </v-form>
            <v-row class="mt-5" justify="center">
              <v-col cols="12" md="6" lg="6" xl="6">
                <v-btn
                  x-large
                  :disabled="!valid"
                  color="primary"
                  class="button-choice"
                  @click="sendReport"
                >
                  บันทึก
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" lg="6" xl="6">
                <v-btn
                  x-large
                  color="black"
                  class="button-choice"
                  outlined
                  @click="dialogReport = false"
                >
                  ยกเลิก
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
    <!-- <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      topic: '',
      details: '',
      clipped: false,
      drawer: false,
      fixed: false,
      dialogReport: false,
      req: [
        v => !!v || 'กรุณากรอกช่องนี้'
      ],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'LakkanAn',
      valid: true
    }
  },
  fetch () {
    console.log(this.$nuxt.$fire.auth.currentUser.photoURL)
  },
  methods: {
    home () {
      this.$nuxt.$router.push('/')
    },
    login () {
      this.$nuxt.$router.push('/login')
    },
    storage () {
      this.$nuxt.$router.push('/user/storage')
    },
    manageBook () {
      this.$nuxt.$router.push('/distributor/managebook')
    },
    profile () {
      this.$nuxt.$router.push('/distributor/profile')
    },
    exchangeBook () {
      this.$nuxt.$router.push('/market/tradelist')
    },
    dashBoard () {
      this.$nuxt.$router.push('/admin/dashboard')
    },
    signout () {
      if (this.$nuxt.$fire.auth.currentUser) {
        this.$nuxt.$fire.auth.signOut()
        this.$nuxt.$auth.logout()
      } else {
        this.$nuxt.$fire.auth.signOut()
        this.$nuxt.$auth.logout()
      }
    },
    sendReport () {
      if (this.$refs.formReport.validate()) {
        this.$axios.$post('/users/report/', { topic: this.topic, details: this.details })
        setTimeout(() => { this.dialogReport = false }, 2000)
      }
    }
  }
}
</script>

<style>
@media only screen and (max-width: 600px) {
  .displayName {
    display: none;
  }
}
@media only screen and (max-width: 390px) {
  .logo-web {
    width: 220px;
  }
}
.home-navbar {
  cursor: pointer;
}
.img-logo-center {
  align-content: center;
}
.logo-web {
  cursor: pointer;
}
.font-propmt{
    font-family: 'Prompt', sans-serif !important;
 }
 .v-application{
    font-family: 'Prompt', sans-serif !important;
 }
 .app{
    font-family: 'Prompt', sans-serif !important;
 }
</style>

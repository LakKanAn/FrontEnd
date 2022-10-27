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
                v-if="$nuxt.$auth.user.role === 'distributor'"
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
                  v-if="$nuxt.$auth.user.role === 'distributor'"
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
                <v-list-item v-if="$nuxt.$auth.user.role === 'user'">
                  <v-list-item-content>
                    <v-list-item-title v-text="'ประวัติการใช้งาน'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="$nuxt.$auth.user.role === 'user'"
                  @click="exchangeBook"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="'หน้าแลกเปลี่ยน'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item
                  v-if="$nuxt.$auth.user.role === 'user'"
                >
                  <v-row justify="center">
                    <v-dialog v-model="dialogReport" max-width="600px">
                      <template #activator="{ on, attrs }">
                        <v-list-item
                          v-if="$nuxt.$auth.user.role === 'user'"
                          v-bind="attrs"
                          v-on="on"
                        >
                          <v-list-item-content>
                            <v-list-item-title v-text="'แจ้งปัญหา'" />
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                      <v-card class="font-propmt">
                        <v-card-title>
                          <span>แจ้งปัญหา</span>
                        </v-card-title>
                        <v-divider />
                        <v-card-text>
                          <v-container>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field outlined label="หัวข้อเรื่อง" required />
                              </v-col>
                              <v-col cols="12">
                                <v-textarea
                                  label="รายละเอียด"
                                  outlined
                                  no-resize
                                  required
                                />
                              </v-col>
                            </v-row>
                          </v-container>
                          <small>กรุณาพิมพ์เนื้อหาของปัญหาให้ละเอียดและครบถ้วน</small>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer />
                          <v-btn
                            color="primary"
                            text
                            @click="dialogReport = false"
                          >
                            ยกเลิก
                          </v-btn>
                          <v-btn
                            color="primary"
                            text
                            @click="dialogReport = false"
                          >
                            ส่ง
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-row>
                </v-list-item>

                <!-- <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      v-model="$vuetify.theme.dark"
                      color="purple"
                    />
                  </v-list-item-action>
                  <v-list-item-title>DarkMode</v-list-item-title>
                </v-list-item> -->
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
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
      clipped: false,
      drawer: false,
      fixed: false,
      dialogReport: false,
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
      title: 'LakkanAn'
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

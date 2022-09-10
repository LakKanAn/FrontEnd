<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <img src="~/assets/logo/logo-web.png" width="180" height="50" class="mt-2 logo-web" @click="home">
      <v-spacer />
      <!-- <v-toolbar-title class="home-navbar" @click="home" v-text="title" /> -->
      <div v-if="$nuxt.$auth.loggedIn" class="text-center">
        <v-menu
          v-if="$nuxt.$auth.loggedIn"
          :close-on-content-click="false"
          :nudge-width="100"
          offset-x
        >
          <template #activator="{ on, attrs }">
            <div
              v-if="$nuxt.$auth.loggedIn"
              v-bind="attrs"
              v-on="on"
            >
              <v-list-item-avatar>
                <img
                  v-if="$nuxt.$auth.loggedIn"
                  :src="$nuxt.$fire.auth.currentUser.photoURL"
                  alt="UserPic"
                >
              </v-list-item-avatar>
              <span class="displayName">
                {{ $nuxt.$fire.auth.currentUser.displayName }}
              </span>
              <v-icon
                large
              >
                mdi-menu-down
              </v-icon>
            </div>
          </template>

          <v-card v-if="$nuxt.$auth.loggedIn">
            <v-list>
              <v-list-item>
                <v-list-item-avatar>
                  <img
                    :src="$nuxt.$fire.auth.currentUser.photoURL"
                    alt="John"
                  >
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ $nuxt.$fire.auth.currentUser.displayName }}</v-list-item-title>
                  <v-list-item-subtitle>{{ $nuxt.$fire.auth.currentUser.email }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider />
            <v-list>
              <v-list-item-group
                color="primary"
              >
                <v-list-item v-if="$nuxt.$auth.user.role === 'user'">
                  <v-list-item-content>
                    <v-list-item-title @click="storage" v-text="'คลัง'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item v-if="$nuxt.$auth.user.role === 'distributor'">
                  <v-list-item-content>
                    <v-list-item-title @click="manageBook" v-text="'จัดการหนังสือ'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="'ข้อมูลส่วนตัว'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title v-text="'ประวัติการใช้งาน'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title @click="exchangeBook" v-text="'หน้าแลกเปลี่ยน'" />
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-action>
                    <v-switch
                      v-model="$vuetify.theme.dark"
                      color="purple"
                    />
                  </v-list-item-action>
                  <v-list-item-title>DarkMode</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title @click="signout" v-text="'ออกจากระบบ'" />
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </div>
      <div v-if="!$nuxt.$auth.loggedIn" class="text-center">
        <v-btn
          large
          @click="login"
        >
          ล็อคอิน
        </v-btn>
      </div>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
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
    exchangeBook () {
      this.$nuxt.$router.push('/market/tradelist')
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
.home-navbar{
  cursor: pointer;
}
.img-logo-center{
  align-content: center;
}
.logo-web{
  cursor: pointer;
}
</style>

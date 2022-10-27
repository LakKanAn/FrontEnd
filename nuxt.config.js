import colors from 'vuetify/es5/util/colors'
require('dotenv').config()
export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'LakkanAn',
    title: 'LakkanAn',
    htmlAttrs: {
      lang: 'en'
    },
    script: [
      {
        src: 'https://mozilla.github.io/pdf.js/build/pdf.js'
      }
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap"'
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/composition-api/module',
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/dotenv',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: process.env.FIREBASE_API,
          authDomain: process.env.FIREBASE_AUTHDOMAIN,
          projectId: process.env.FIREBASE_PROJECTID,
          storageBucket: process.env.FIREBASE_STORAGEBUCKET,
          messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
          appId: process.env.FIREBASE_APPID,
          measurementId: process.env.FIREBASE_MEASUREMENTID
        },
        services: {
          auth: {
            persistence: 'local', // default
            initialize: {
              onAuthStateChangedAction: 'onAuthStateChangedAction',
              subscribeManually: false
            },
            ssr: false
          }
        }
      }
    ]
  ],

  auth: {
    localStorage: false,
    redirect: {
      logout: '/',
      home: '/',
      login: '/login'
    },
    strategies: {
      local: {
        scheme: 'local',
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'distributor', // <--- Default "user"
          autoFetch: true
        },
        endpoints: {
          login: {
            url: process.env.BACKEND_URL + '/site/access_token',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url: process.env.BACKEND_URL + '/site/bye',
            method: 'get'
          },
          user: {
            url: process.env.BACKEND_URL + '/site/me',
            method: 'get'
          }
        }
      },
      user: {
        scheme: 'local',
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'user', // <--- Default "user"
          autoFetch: true
        },
        endpoints: {
          login: {
            url: process.env.BACKEND_URL + '/site/access_token',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url: process.env.BACKEND_URL + '/site/bye',
            method: 'get'
          },
          user: {
            url: process.env.BACKEND_URL + '/site/me',
            method: 'get'
          }
        }
      },
      admin: {
        scheme: 'local',
        token: {
          property: 'access_token',
          required: true,
          type: 'Bearer'
        },
        user: {
          property: 'admin',
          autoFetch: true
        },
        endpoints: {
          login: {
            url: process.env.BACKEND_URL + '/site/access_token',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: {
            url: process.env.BACKEND_URL + '/site/bye',
            method: 'get'
          },
          user: {
            url: process.env.BACKEND_URL + '/site/me',
            method: 'get'
          }
        }
      }
    }
  },

  axios: {
    baseURL: process.env.BACKEND_URL
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      options: { customProperties: true },
      dark: false,
      themes: {
        light: {
          texttopic: '#ffffff',
          primary: '#FF8C00',
          secondary: '#FF8C00',
          accent: '#FF8C00',
          error: '#b71c1c'
        },
        dark: {
          texttopic: '#000000',
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: '#FF8C00',
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}

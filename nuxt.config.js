require('dotenv').config()

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Форма обратной связи для сайта Feedberry',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Форма обратной связи в один клик. Получайте обращения клиентов на email. Никакого программирования и баз данных.' },
      { hid: 'keywords', name: 'keywords', content: 'Формы обратной связи, форма обратной связи для сайта, создать форму обратной связи, готовая форма обратной связи для сайта, всплывающая форма обратной связи для сайта, форма для статического сайта, форма обратной связи с отправкой на почту' },
      { name: 'msapplication-TileColor', content: '#da532c' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', size: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' }
    ]
  },
  router: {
    middleware: 'i18n'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#0bafff' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios', 'vue-slider-component'],
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'top-center',
    duration: 2000,
  },
  env: {
    baseURL: process.env.BASE
  },
  axios: {
    baseURL: process.env.BASE || 'http://localhost:8090/'
  },
  plugins: [
    { src: '~plugins/vue-gettext' },
    { src: '~plugins/filters' },
    { src: '~plugins/vee-validate', ssr: false },
  ],
  css: [
    'assets/main.css'
  ]
}

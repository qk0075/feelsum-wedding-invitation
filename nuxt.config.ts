const baseURL = process.env.NUXT_APP_BASE_URL || '/'

const siteUrl = 'https://qk0075.github.io/feelsum-wedding-invitation/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  ssr: true,

  css: ['~/assets/css/main.css'],

  nitro: {
    prerender: {
      routes: ['/', '/cfnd'],
    },
  },

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'ko' },
      title: '황필규 & 김수민 결혼합니다',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
        {
          name: 'description',
          content: '2026년 11월 1일 가족식을 진행합니다. 따뜻한 마음으로 축복해 주시면 감사하겠습니다.',
        },
        { property: 'og:title', content: '황필규 & 김수민 결혼합니다' },
        {
          property: 'og:description',
          content: '2026년 11월 1일 가족식을 진행합니다. 따뜻한 마음으로 축복해 주시면 감사하겠습니다.',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: siteUrl + 'og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '800' },
        { property: 'og:url', content: siteUrl },
        { name: 'twitter:card', content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: baseURL + 'favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: baseURL + 'favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nanum+Myeongjo:wght@400;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&display=swap',
        },
      ],
    },
  },
})

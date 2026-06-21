// https://nuxt.com/docs/api/configuration/nuxt-config

// 배포 시 하위 경로(예: /feelsum-wedding-invitation/). 로컬 개발은 '/' 유지.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 정적 사이트로 빌드 (GitHub Pages 등에 올리기 좋음)
  ssr: true,

  css: ['~/assets/css/main.css'],

  // 두 버전 페이지를 모두 미리 생성
  nitro: {
    prerender: {
      routes: ['/', '/account'],
    },
  },

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'ko' },
      title: '우리 결혼합니다',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
        },
        { name: 'description', content: '저희 결혼식에 초대합니다.' },
        { property: 'og:title', content: '우리 결혼합니다' },
        { property: 'og:description', content: '저희 결혼식에 초대합니다.' },
        { property: 'og:type', content: 'website' },
      ],
      link: [
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

// https://nuxt.com/docs/api/configuration/nuxt-config

// 배포 시 하위 경로(예: /feelsum-wedding-invitation/). 로컬 개발은 '/' 유지.
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

// 카카오톡 등에서 링크 미리보기를 만들 때 쓰는 실제 배포 주소.
// 상대 경로(/og.jpg)는 인식하지 못하므로 반드시 https:// 로 시작하는 전체 주소여야 합니다.
// ※ GitHub 계정명이나 저장소 이름이 바뀌면 이 줄도 같이 고쳐야 합니다.
const siteUrl = 'https://qk0075.github.io/feelsum-wedding-invitation/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // 정적 사이트로 빌드 (GitHub Pages 등에 올리기 좋음)
  ssr: true,

  css: ['~/assets/css/main.css'],

  // 두 버전 페이지를 모두 미리 생성
  nitro: {
    prerender: {
      routes: ['/', '/cfnd'],
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
        // 링크 미리보기 사진 (public/og.jpg — 갤러리 005번 사진을 1200x800으로 줄인 것)
        { property: 'og:image', content: siteUrl + 'og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '800' },
        { property: 'og:url', content: siteUrl },
        // 카톡 외 앱(문자, 슬랙 등)에서 큰 사진으로 보이도록
        { name: 'twitter:card', content: 'summary_large_image' },
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

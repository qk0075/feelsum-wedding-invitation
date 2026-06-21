// 스크롤 시 v-reveal 요소를 부드럽게 나타나게 하는 디렉티브
// (컴포넌트가 다시 그려져도 각 요소가 스스로 관찰을 등록하므로 글씨가 사라지지 않습니다.)
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  if (import.meta.client && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.12 },
    )
  }

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement) {
      if (observer) observer.observe(el)
      else el.classList.add('is-visible') // 관찰 불가 환경에서는 바로 표시
    },
    beforeUnmount(el: HTMLElement) {
      observer?.unobserve(el)
    },
  })
})

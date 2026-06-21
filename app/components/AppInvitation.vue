<script setup lang="ts">
// 두 버전이 공유하는 청첩장 본문
// showAccounts 가 true 이면 '마음 전하실 곳'에 계좌번호를 표시합니다.
withDefaults(defineProps<{ showAccounts?: boolean }>(), {
  showAccounts: false,
})
</script>

<template>
  <main class="page">
    <TheCover />
    <TheLetter />
    <TheBanner />
    <TheGallery />
    <TheCalendar />
    <TheContact />
    <TheAccounts :show-accounts="showAccounts" />
    <TheFooter />
  </main>
</template>

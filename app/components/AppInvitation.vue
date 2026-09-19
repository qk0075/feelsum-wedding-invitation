<script setup lang="ts">
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

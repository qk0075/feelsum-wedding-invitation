<script setup lang="ts">
const { siteUrl } = useRuntimeConfig().public

useHead({
  meta: [{ property: 'og:url', content: `${siteUrl}cfnd/` }],
})
</script>

<template>
  <AppInvitation :show-accounts="true" />
</template>

<script setup lang="ts">
import { wedding } from '~/data/wedding'
const w = wedding
</script>

<template>
  <footer class="footer">
    <p class="footer__names">{{ w.groom.name }} &amp; {{ w.bride.name }}</p>
    <p class="footer__date">{{ w.date.displayDate }}</p>
    <p class="footer__thanks">감사합니다 ♥</p>
  </footer>
</template>

<style scoped>
.footer {
  text-align: center;
  padding: 48px 28px 56px;
  background: var(--bg);
}

.footer__names {
  font-family: var(--font-en);
  font-size: 20px;
  color: var(--ink);
  margin-bottom: 6px;
}

.footer__date {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--ink-soft);
}

.footer__thanks {
  margin-top: 18px;
  font-size: 14px;
  color: var(--accent-deep);
}
</style>

<script setup lang="ts">
import { wedding } from '~/data/wedding'
const w = wedding
</script>

<template>
  <section class="section letter">
    <div class="reveal" v-reveal>
      <p class="eyebrow">Invitation</p>
      <h2 class="section-title">{{ w.greeting.title }}</h2>

      <div class="divider" />

      <p class="letter__message">{{ w.greeting.message }}</p>

      <div class="letter__family">
        <p>
          <span class="letter__parents">{{ w.groom.father }} · {{ w.groom.mother }}</span>
          <span class="letter__rel">의 아들</span>
          <span class="letter__child">{{ w.groom.name }}</span>
        </p>
        <p>
          <span class="letter__parents">{{ w.bride.father }} · {{ w.bride.mother }}</span>
          <span class="letter__rel">의 딸</span>
          <span class="letter__child">{{ w.bride.name }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.letter {
  background: var(--bg-soft);
}

.divider {
  margin: 22px auto 30px;
}

.letter__message {
  font-size: 16px;
  line-height: 2.1;
  color: var(--ink-soft);
  white-space: pre-line;
  letter-spacing: 0.01em;
}

.letter__family {
  margin-top: 38px;
  font-size: 15px;
  color: var(--ink);
  line-height: 2.4;
}

.letter__parents {
  color: var(--ink-soft);
}

.letter__rel {
  color: var(--ink-soft);
  margin: 0 6px;
  font-size: 14px;
}

.letter__child {
  font-weight: 700;
  letter-spacing: 0.05em;
}
</style>

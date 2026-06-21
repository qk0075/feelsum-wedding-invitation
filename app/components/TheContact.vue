<script setup lang="ts">
import { wedding } from '~/data/wedding'
const w = wedding
</script>

<template>
  <section class="section contact">
    <div class="reveal" v-reveal>
      <p class="eyebrow">Contact</p>
      <h2 class="section-title">연락하기</h2>

      <div class="contact__people">
        <div class="contact__person">
          <p class="contact__role">신랑</p>
          <p class="contact__name">{{ w.groom.name }}</p>
          <div class="contact__actions">
            <a :href="`tel:${w.groom.phone}`" class="contact__btn" aria-label="신랑에게 전화">📞 전화</a>
            <a :href="`sms:${w.groom.phone}`" class="contact__btn" aria-label="신랑에게 문자">✉️ 문자</a>
          </div>
        </div>

        <div class="contact__person">
          <p class="contact__role">신부</p>
          <p class="contact__name">{{ w.bride.name }}</p>
          <div class="contact__actions">
            <a :href="`tel:${w.bride.phone}`" class="contact__btn" aria-label="신부에게 전화">📞 전화</a>
            <a :href="`sms:${w.bride.phone}`" class="contact__btn" aria-label="신부에게 문자">✉️ 문자</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--bg-soft);
}

.contact__people {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.contact__person {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 22px;
  background: var(--bg);
  border-radius: 8px;
}

.contact__role {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--accent-deep);
}

.contact__name {
  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
  margin-top: 2px;
  flex: 1;
  text-align: left;
  margin-left: 14px;
}

.contact__actions {
  display: flex;
  gap: 8px;
}

.contact__btn {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--ink);
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: 20px;
  padding: 8px 14px;
  text-decoration: none;
  white-space: nowrap;
}

.contact__btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
</style>

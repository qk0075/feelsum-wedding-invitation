<script setup lang="ts">
import { wedding } from '~/data/wedding'
const w = wedding
const asset = useBaseAsset()
</script>

<template>
  <header class="cover">
    <div class="cover__inner">
      <p class="cover__label">THE WEDDING OF</p>

      <h1 class="cover__names">
        <span>{{ w.groom.name }}</span>
        <span class="cover__amp">&amp;</span>
        <span>{{ w.bride.name }}</span>
      </h1>

      <!-- 대문 사진 -->
      <div
        class="cover__photo"
        :class="{ 'cover__photo--empty': !w.coverPhoto }"
        :style="w.coverPhoto ? { backgroundImage: `url('${asset(w.coverPhoto)}')` } : {}"
      >
        <span v-if="!w.coverPhoto" class="cover__photo-hint">대문 사진을 넣어주세요</span>
      </div>

      <div class="cover__meta">
        <p class="cover__date">{{ w.date.displayDate }}</p>
        <p class="cover__place">{{ w.subtitle }}</p>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cover {
  position: relative;
  padding: 56px 28px 64px;
  text-align: center;
}

.cover__label {
  font-family: var(--font-en);
  font-size: 14px;
  letter-spacing: 0.4em;
  color: var(--accent-deep);
  margin-bottom: 22px;
}

.cover__names {
  font-family: var(--font-en);
  font-weight: 500;
  font-size: 34px;
  letter-spacing: 0.04em;
  color: var(--ink);
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 36px;
}

.cover__amp {
  font-size: 24px;
  color: var(--gold);
  font-style: italic;
}

.cover__photo {
  aspect-ratio: 3 / 4;
  background: linear-gradient(135deg, #ece4d6, #e0d6c4);
  border-radius: 200px 200px 8px 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 34px;
  background-size: cover;
  background-position: center;
}

.cover__photo-hint {
  font-family: var(--font-sans);
  font-size: 13px;
  color: #b8ab95;
  line-height: 1.7;
}

.cover__meta {
  font-size: 16px;
  color: var(--ink-soft);
}

.cover__date {
  margin-bottom: 4px;
  letter-spacing: 0.02em;
}

.cover__place {
  font-size: 15px;
}
</style>

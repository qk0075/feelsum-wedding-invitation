<script setup lang="ts">
import { wedding } from '~/data/wedding'
const w = wedding
const asset = useBaseAsset()
</script>

<template>
  <section class="banner">
    <img v-if="w.bannerPhoto" :src="asset(w.bannerPhoto)" alt="" class="banner__img" />
    <div v-else class="banner__placeholder">
      <span>와이드 사진이 들어갈 자리예요.<br />(설정에서 bannerPhoto 지정)</span>
    </div>
  </section>
</template>

<style scoped>

.banner {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  margin-right: calc(-50vw + 50%);
}

.banner__img {
  width: 100%;
  height: auto;
  max-height: 90vh;
  object-fit: cover;
  display: block;
}

.banner__placeholder {
  width: 100%;
  aspect-ratio: 16 / 11;
  background: linear-gradient(135deg, #e0d6c4, #d3c6b0);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ab9d85;
  font-family: var(--font-sans);
  font-size: 13px;
  line-height: 1.7;
  text-align: center;
}
</style>

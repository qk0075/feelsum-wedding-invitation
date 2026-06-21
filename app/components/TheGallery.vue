<script setup lang="ts">
import { wedding } from '~/data/wedding'

const w = wedding
const asset = useBaseAsset()
const photos = computed(() => w.gallery.map(asset))
const hasPhotos = computed(() => photos.value.length > 0)

// ---- 좌우 슬라이드 ----
const track = ref<HTMLElement | null>(null)
const current = ref(0)

function onScroll() {
  const el = track.value
  if (!el) return
  const children = Array.from(el.children) as HTMLElement[]
  const center = el.scrollLeft + el.clientWidth / 2
  let best = 0
  let bestDist = Infinity
  children.forEach((c, i) => {
    const cCenter = c.offsetLeft + c.offsetWidth / 2
    const d = Math.abs(cCenter - center)
    if (d < bestDist) {
      bestDist = d
      best = i
    }
  })
  current.value = best
}

function scrollToIndex(i: number) {
  const el = track.value
  if (!el) return
  const child = el.children[i] as HTMLElement | undefined
  if (!child) return
  el.scrollTo({
    left: child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2,
    behavior: 'smooth',
  })
}

const goPrev = () => scrollToIndex(Math.max(0, current.value - 1))
const goNext = () => scrollToIndex(Math.min(photos.value.length - 1, current.value + 1))

// ---- 라이트박스(크게 보기) ----
const activeIndex = ref<number | null>(null)
const open = (i: number) => (activeIndex.value = i)
const close = () => (activeIndex.value = null)
const lbPrev = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value - 1 + photos.value.length) % photos.value.length
}
const lbNext = () => {
  if (activeIndex.value === null) return
  activeIndex.value = (activeIndex.value + 1) % photos.value.length
}

// ---- 라이트박스 좌우 드래그/스와이프 ----
const dragStartX = ref<number | null>(null)
const didSwipe = ref(false)
const SWIPE_THRESHOLD = 50 // px

function onPointerDown(e: PointerEvent) {
  dragStartX.value = e.clientX
  didSwipe.value = false
}
function onPointerUp(e: PointerEvent) {
  if (dragStartX.value === null) return
  const dx = e.clientX - dragStartX.value
  dragStartX.value = null
  if (Math.abs(dx) > SWIPE_THRESHOLD) {
    didSwipe.value = true
    if (dx < 0) lbNext()
    else lbPrev()
  }
}
// 배경을 탭하면 닫되, 드래그(스와이프) 직후에는 닫지 않음
function onBackdropClick() {
  if (didSwipe.value) {
    didSwipe.value = false
    return
  }
  close()
}
</script>

<template>
  <section class="section gallery">
    <div class="reveal" v-reveal>
      <p class="eyebrow">Gallery</p>
      <h2 class="section-title">사진 모음</h2>
      <div class="divider" />
      <p class="gallery__sub">
        저희의 소중한 순간들을 담았습니다.<br />
        좌우로 넘겨보고, 사진을 탭하면 크게 볼 수 있어요.
      </p>
    </div>

    <template v-if="hasPhotos">
      <!-- 좌우 슬라이드 -->
      <div class="slider">
        <button class="slider__arrow slider__arrow--prev" @click="goPrev" aria-label="이전 사진">‹</button>

        <div ref="track" class="slider__track" @scroll.passive="onScroll">
          <button
            v-for="(src, i) in photos"
            :key="src"
            class="slide"
            @click="open(i)"
          >
            <img :src="src" :alt="`사진 ${i + 1}`" loading="lazy" />
          </button>
        </div>

        <button class="slider__arrow slider__arrow--next" @click="goNext" aria-label="다음 사진">›</button>
      </div>

      <p class="slider__count">{{ current + 1 }} / {{ photos.length }}</p>
    </template>

    <!-- 사진이 없을 때 -->
    <p v-else class="gallery__hint">
      public/gallery/ 폴더에 사진을 넣고<br />설정 파일(wedding.ts)에 파일명을 적어주세요.
    </p>

    <!-- 라이트박스 -->
    <Teleport to="body">
      <div
        v-if="activeIndex !== null"
        class="lightbox"
        @click.self="onBackdropClick"
        @pointerdown="onPointerDown"
        @pointerup="onPointerUp"
      >
        <button class="lightbox__close" @click="close" aria-label="닫기">✕</button>
        <button class="lightbox__nav lightbox__nav--prev" @click="lbPrev" aria-label="이전">‹</button>
        <img
          :src="photos[activeIndex]"
          :alt="`사진 ${activeIndex + 1}`"
          class="lightbox__img"
          draggable="false"
        />
        <button class="lightbox__nav lightbox__nav--next" @click="lbNext" aria-label="다음">›</button>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.divider {
  margin: 4px auto 22px;
}

.gallery__sub {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.9;
  margin-bottom: 26px;
}

/* 슬라이더 */
.slider {
  position: relative;
}

.slider__track {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 0 11%;
  scrollbar-width: none;
}

.slider__track::-webkit-scrollbar {
  display: none;
}

.slide {
  flex: 0 0 78%;
  scroll-snap-align: center;
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  overflow: hidden;
  padding: 0;
  background: #ece4d6;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slider__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: rgba(255, 253, 249, 0.85);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
  font-size: 24px;
  line-height: 1;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
}

.slider__arrow--prev {
  left: 6px;
}
.slider__arrow--next {
  right: 6px;
}

.slider__count {
  font-family: var(--font-en);
  font-size: 15px;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
  margin-top: 18px;
}

.gallery__hint {
  font-family: var(--font-sans);
  font-size: 12px;
  color: #b8ab95;
  line-height: 1.7;
}

/* 라이트박스 */
.lightbox {
  position: fixed;
  inset: 0;
  background: rgba(20, 18, 15, 0.92);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox__img {
  max-width: 90vw;
  max-height: 82vh;
  border-radius: 6px;
  object-fit: contain;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  touch-action: pan-y;
}

.lightbox__close {
  position: absolute;
  top: 20px;
  right: 22px;
  color: #fff;
  font-size: 24px;
  width: 40px;
  height: 40px;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 44px;
  width: 48px;
  height: 64px;
  opacity: 0.8;
}

.lightbox__nav--prev {
  left: 8px;
}
.lightbox__nav--next {
  right: 8px;
}
</style>

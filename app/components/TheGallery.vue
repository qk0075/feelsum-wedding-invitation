<script setup lang="ts">
import { wedding } from '~/data/wedding'

const w = wedding
const asset = useBaseAsset()
const photos = computed(() => w.gallery.map(asset))
const hasPhotos = computed(() => photos.value.length > 0)

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

const activeIndex = ref<number | null>(null)
const lbTrack = ref<HTMLElement | null>(null)

const triple = computed(() => {
  const i = activeIndex.value
  if (i === null) return []
  const n = photos.value.length
  return [(i - 1 + n) % n, i, (i + 1) % n]
})

const dragX = ref(0)
const dragging = ref(false)
const animating = ref(false)
const axis = ref<'none' | 'x' | 'y'>('none')
const pendingStep = ref(0)
const dragStartX = ref(0)
const dragStartY = ref(0)
const didSwipe = ref(false)
const SWIPE_THRESHOLD = 50
let settleTimer: ReturnType<typeof setTimeout> | null = null

const trackStyle = computed(() => ({
  transform: `translate3d(calc(-33.3333% + ${dragX.value}px), 0, 0)`,
  transition: animating.value ? 'transform 300ms cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
}))

function resetDrag() {
  if (settleTimer) {
    clearTimeout(settleTimer)
    settleTimer = null
  }
  dragX.value = 0
  dragging.value = false
  animating.value = false
  axis.value = 'none'
  pendingStep.value = 0
  didSwipe.value = false
}

const open = (i: number) => {
  resetDrag()
  activeIndex.value = i
}
const close = () => {
  resetDrag()
  activeIndex.value = null
}

function onKeydown(e: KeyboardEvent) {
  if (activeIndex.value !== null && e.key === 'Escape') close()
}
onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

function slideWidth() {
  const el = lbTrack.value
  return el ? el.clientWidth / 3 : window.innerWidth
}

function onPointerDown(e: PointerEvent) {
  if (animating.value) return
  if ((e.target as HTMLElement).closest('.lightbox__close')) return
  dragging.value = true
  didSwipe.value = false
  axis.value = 'none'
  dragStartX.value = e.clientX
  dragStartY.value = e.clientY
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const dx = e.clientX - dragStartX.value
  const dy = e.clientY - dragStartY.value

  if (axis.value === 'none') {
    if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
    axis.value = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
    didSwipe.value = true
    if (axis.value === 'x') (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId)
  }
  if (axis.value !== 'x') return

  dragX.value = photos.value.length > 1 ? dx : dx * 0.25
}

function onPointerUp() {
  if (!dragging.value) return
  dragging.value = false

  const dx = dragX.value
  const canSwipe = axis.value === 'x' && photos.value.length > 1

  if (canSwipe && Math.abs(dx) > SWIPE_THRESHOLD) {
    pendingStep.value = dx < 0 ? 1 : -1
    animating.value = true
    dragX.value = pendingStep.value === 1 ? -slideWidth() : slideWidth()
  } else if (dx !== 0) {
    pendingStep.value = 0
    animating.value = true
    dragX.value = 0
  } else {
    return
  }

  settleTimer = setTimeout(settle, 400)
}

function settle() {
  if (!animating.value) return
  if (settleTimer) {
    clearTimeout(settleTimer)
    settleTimer = null
  }
  animating.value = false
  if (pendingStep.value !== 0 && activeIndex.value !== null) {
    const n = photos.value.length
    activeIndex.value = (activeIndex.value + pendingStep.value + n) % n
  }
  pendingStep.value = 0
  dragX.value = 0
}

function onTrackTransitionEnd(e: TransitionEvent) {
  if (e.propertyName !== 'transform' || e.target !== lbTrack.value) return
  settle()
}

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
        좌우로 넘겨보고, 사진을 탭하면 크게 볼 수 있습니다.
      </p>
    </div>

    <template v-if="hasPhotos">
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

    <p v-else class="gallery__hint">
      public/gallery/ 폴더에 사진을 넣고<br />설정 파일(wedding.ts)에 파일명을 적어주세요.
    </p>

    <Teleport to="body">
      <div
        v-if="activeIndex !== null"
        class="lightbox"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointercancel="onPointerUp">
        <button class="lightbox__close" @click="close" aria-label="닫기">✕</button>
        <div
          ref="lbTrack"
          class="lightbox__track"
          :style="trackStyle"
          @transitionend="onTrackTransitionEnd">
          <div
            v-for="(idx, slot) in triple"
            :key="`${slot}-${idx}`"
            class="lightbox__slide"
            @click.self="onBackdropClick">
            <img
              :src="photos[idx]"
              :alt="`사진 ${idx + 1}`"
              class="lightbox__img"
              draggable="false"/>
          </div>
        </div>
        <p v-if="photos.length > 1" class="lightbox__hint">
          좌우로 넘겨 다른 사진을 볼 수 있습니다.
        </p>
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

.lightbox {
  position: fixed;
  inset: 0;
  background: #14120f;
  overflow: hidden;
  z-index: 1000;
  touch-action: none;
  overscroll-behavior: contain;
}

.lightbox__track {
  position: absolute;
  top: 0;
  left: 0;
  width: 300%;
  height: 100%;
  display: flex;
  will-change: transform;
}

.lightbox__slide {
  width: 33.3333%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox__img {
  max-width: 90vw;
  max-height: 82vh;
  border-radius: 6px;
  object-fit: contain;
  user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
  touch-action: none;
}

.lightbox__hint {
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: calc(22px + env(safe-area-inset-bottom));
  pointer-events: none;
  text-align: center;
  font-family: var(--font-sans);
  font-size: 12px;
  letter-spacing: 0.02em;
  color: rgba(255, 255, 255, 0.62);
}

.lightbox__close {
  position: absolute;
  z-index: 2;
  top: 20px;
  right: 22px;
  color: #fff;
  font-size: 24px;
  width: 40px;
  height: 40px;
}
</style>

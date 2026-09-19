<script setup lang="ts">
import { wedding } from '~/data/wedding'

const props = withDefaults(defineProps<{ showAccounts?: boolean }>(), {
  showAccounts: false,
})

const w = wedding

const groomAccounts = computed(() => w.gift.accounts.groom.filter((a) => a.number))
const brideAccounts = computed(() => w.gift.accounts.bride.filter((a) => a.number))
const hasGroom = computed(() => groomAccounts.value.length > 0)
const hasBride = computed(() => brideAccounts.value.length > 0)
const hasAny = computed(() => hasGroom.value || hasBride.value)

const popup = ref<'groom' | 'bride' | null>(null)
const popupTitle = computed(() => (popup.value === 'groom' ? '신랑측 계좌' : '신부측 계좌'))
const popupRows = computed(() =>
  popup.value === 'groom' ? groomAccounts.value : popup.value === 'bride' ? brideAccounts.value : [],
)
const openPopup = (side: 'groom' | 'bride') => (popup.value = side)
const closePopup = () => (popup.value = null)

const digitsOnly = (text: string) => text.replace(/\D/g, '')

const copiedKey = ref('')
const copy = async (key: string, text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copiedKey.value = key
    setTimeout(() => (copiedKey.value = ''), 1800)
  } catch {
    /* 무시 */
  }
}
</script>

<template>
  <section class="section accounts">
    <div class="reveal" v-reveal>
      <p class="eyebrow">Thanks</p>
      <h2 class="section-title">마음 전하실 곳</h2>

      <template v-if="props.showAccounts && hasAny">
        <p class="accounts__sub">
          축하의 마음을 전하고 싶으신 분들을 위해<br />계좌번호를 안내해 드립니다.
        </p>
        <div class="gift-buttons">
          <button v-if="hasGroom" class="gift-btn" @click="openPopup('groom')">신랑측 계좌</button>
          <button v-if="hasBride" class="gift-btn" @click="openPopup('bride')">신부측 계좌</button>
        </div>
      </template>

      <p v-else class="accounts__message">{{ w.gift.message }}</p>
    </div>

    <Teleport to="body">
      <div v-if="popup" class="popup-backdrop" @click.self="closePopup">
        <div class="popup-box">
          <button class="popup-close" @click="closePopup" aria-label="닫기">✕</button>
          <p class="popup-title">{{ popupTitle }}</p>

          <div class="popup-list">
            <div v-for="a in popupRows" :key="a.label" class="popup-row">
              <div class="popup-info">
                <span class="popup-label">{{ a.label }}</span>
                <span class="popup-account">{{ a.bank }} {{ a.number }}</span>
                <span class="popup-holder">예금주 {{ a.holder }}</span>
              </div>
              <button class="popup-copy" @click="copy(a.label, digitsOnly(a.number))">
                {{ copiedKey === a.label ? '복사됨' : '복사' }}
              </button>
            </div>
          </div>

          <button class="popup-close-btn" @click="closePopup">닫기</button>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.accounts__message {
  font-size: 16px;
  line-height: 2;
  color: var(--ink-soft);
  letter-spacing: 0.01em;
}

.accounts__sub {
  font-family: var(--font-sans);
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.8;
  margin-bottom: 24px;
}

.gift-buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.gift-btn {
  padding: 12px 26px;
  border-radius: 24px;
  border: 1px solid var(--line);
  background: var(--bg-soft);
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 15px;
  transition: all 0.2s ease;
}

.gift-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.popup-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(20, 18, 15, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.popup-box {
  background: var(--bg-soft);
  border-radius: 14px;
  padding: 26px 22px 22px;
  width: min(380px, 92vw);
  position: relative;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
}

.popup-close {
  position: absolute;
  top: 14px;
  right: 16px;
  font-size: 18px;
  color: var(--ink-soft);
  line-height: 1;
}

.popup-title {
  text-align: center;
  font-size: 17px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 18px;
}

.popup-list {
  display: flex;
  flex-direction: column;
}

.popup-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 4px;
  border-bottom: 1px solid var(--line);
}

.popup-row:last-child {
  border-bottom: none;
}

.popup-info {
  display: flex;
  flex-direction: column;
  text-align: left;
  min-width: 0;
}

.popup-label {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--accent-deep);
  margin-bottom: 3px;
}

.popup-account {
  font-family: var(--font-sans);
  font-size: 14px;
  color: var(--ink);
  word-break: break-all;
}

.popup-holder {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--ink-soft);
  margin-top: 2px;
}

.popup-copy {
  font-family: var(--font-sans);
  font-size: 12px;
  color: var(--ink-soft);
  border: 1px solid var(--line);
  border-radius: 16px;
  padding: 7px 14px;
  white-space: nowrap;
  flex-shrink: 0;
}

.popup-copy:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}

.popup-close-btn {
  display: block;
  width: 100%;
  margin-top: 18px;
  padding: 13px;
  border-radius: 24px;
  border: 1px solid var(--line);
  background: var(--bg);
  color: var(--ink);
  font-family: var(--font-serif);
  font-size: 15px;
}

.popup-close-btn:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: #fff;
}
</style>

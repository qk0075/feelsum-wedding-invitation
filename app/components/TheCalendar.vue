<script setup lang="ts">
import { wedding } from '~/data/wedding'

const w = wedding
const { year, month, day, hour, minute } = w.date

// 해당 월의 달력 격자 만들기
const weeks = computed(() => {
  const firstDay = new Date(year, month - 1, 1).getDay() // 0=일
  const daysInMonth = new Date(year, month, 0).getDate()
  const cells: (number | null)[] = []
  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)
  const rows: (number | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7))
  return rows
})

const dayLabels = ['일', '월', '화', '수', '목', '금', '토']

// D-day 카운트다운
const dday = ref<number | null>(null)
onMounted(() => {
  const target = new Date(year, month - 1, day, hour, minute)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  dday.value = diff
})
</script>

<template>
  <section class="section calendar">
    <div class="reveal" v-reveal>
      <p class="eyebrow">Save the Date</p>
      <h2 class="section-title">{{ year }}년 {{ month }}월</h2>

      <div class="calendar__card">
        <table class="calendar__table">
          <thead>
            <tr>
              <th v-for="(label, i) in dayLabels" :key="label" :class="{ sun: i === 0, sat: i === 6 }">
                {{ label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, wi) in weeks" :key="wi">
              <td
                v-for="(d, di) in week"
                :key="di"
                :class="{ sun: di === 0, sat: di === 6, today: d === day }"
              >
                <span v-if="d">{{ d }}</span>
              </td>
            </tr>
          </tbody>
        </table>

        <p class="calendar__time">
          {{ w.date.displayDate }}<template v-if="w.date.displayTime"> {{ w.date.displayTime }}</template>
        </p>
      </div>

      <p v-if="dday !== null" class="calendar__dday">
        <template v-if="dday > 0">
          {{ w.groom.name }} ♥ {{ w.bride.name }}의 가족식이
          <b>{{ dday }}일</b> 남았습니다.
        </template>
        <template v-else-if="dday === 0">오늘은 저희의 가족식입니다 🎉</template>
        <template v-else>함께해 주셔서 감사합니다.</template>
      </p>
    </div>
  </section>
</template>

<style scoped>
.calendar {
  background: var(--bg-soft);
}

.calendar__card {
  max-width: 320px;
  margin: 0 auto;
}

.calendar__table {
  width: 100%;
  border-collapse: collapse;
  font-family: var(--font-sans);
}

.calendar__table th {
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-soft);
  padding: 8px 0;
}

.calendar__table td {
  font-size: 15px;
  color: var(--ink);
  padding: 9px 0;
  height: 42px;
}

.calendar__table .sun {
  color: #c08a7d;
}
.calendar__table .sat {
  color: #7d8ec0;
}

.calendar__table td.today span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  font-weight: 700;
}

.calendar__time {
  margin-top: 18px;
  font-size: 15px;
  color: var(--ink-soft);
  letter-spacing: 0.02em;
}

.calendar__dday {
  margin-top: 26px;
  font-size: 15px;
  color: var(--ink);
}

.calendar__dday b {
  color: var(--accent-deep);
  font-weight: 800;
}
</style>

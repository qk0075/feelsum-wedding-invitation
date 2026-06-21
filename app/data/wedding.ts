// =============================================================
//  결혼 소식(가족식 안내) 내용 설정 파일
//  ※ 여기 값만 고치면 사이트 전체에 자동으로 반영됩니다.
// =============================================================

export const wedding = {
  // ---- 기본 정보 ----
  groom: {
    name: '황필규', // 신랑 이름
    nameEn: 'Pilgyu',
    father: '황의각',
    mother: '김점순',
    phone: '010-2849-5028',
  },
  bride: {
    name: '김수민', // 신부 이름
    nameEn: 'Sumin',
    father: '김왕기',
    mother: '강정현',
    phone: '010-3095-8889',
  },

  // ---- 가족식 일시 ----
  date: {
    year: 2026,
    month: 10, // 숫자 (1~12)
    day: 31,
    hour: 0, // 시간 비공개 (가족식)
    minute: 0,
    dayOfWeek: '토요일',
    // 화면 표시용 문구
    displayDate: '2026년 10월 31일 토요일',
    displayTime: '', // 시간 비공개 — 비워두면 표시되지 않습니다.
  },

  // 가족식이라 예식 장소는 공개하지 않습니다.
  // (표지의 부제 문구로 사용됩니다.)
  subtitle: '가족과 함께하는 작은 결혼식',

  // ---- 대문(첫 화면) 사진 ----
  coverPhoto: '/gallery/cover.JPG',

  // ---- 인사말 ----
  greeting: {
    title: '결혼 소식을 전합니다',
    message: `서로의 곁에서 같은 곳을 바라보던 저희 두 사람이
이제 부부의 연을 맺으려 합니다.

가까운 가족들과 함께
조용히 가족식으로 예를 올리며
새로운 시작을 다짐하고자 합니다.

자리에 직접 모시지는 못하지만
저희를 아껴주신 소중한 분들께
기쁜 마음으로 결혼 소식을 전합니다.

따뜻한 마음으로 축복해 주시면
더없는 기쁨으로 간직하겠습니다.`,
  },

  // ---- 인사말과 사진모음 사이의 와이드(전체폭) 사진 ----
  // 사진 한 장 경로를 적으면 화면 가득 크게 표시됩니다. 비워두면 표시되지 않습니다.
  bannerPhoto: '/gallery/wide.JPG',

  // ---- 갤러리 (public/gallery/ 폴더의 001.JPG ~ 032.JPG, 총 32장) ----
  gallery: Array.from({ length: 32 }, (_, i) => `/gallery/${String(i + 1).padStart(3, '0')}.JPG`),

  // ---- 마음 전하실 곳 ----
  // message: 계좌를 보여주지 않는 버전에서 표시되는 문구
  // accounts: 계좌를 보여주는 버전에서 표시 (bank/number를 채운 항목만 나타납니다)
  gift: {
    message: '축하해 주시는 따뜻한 마음만 감사히 받겠습니다.',
    accounts: {
      groom: [
        { label: '신랑 황필규', bank: '하나', number: '361-910450-79207', holder: '황필규' },
        { label: '신랑 아버지 황의각', bank: '', number: '', holder: '황의각' },
        { label: '신랑 어머니 김점순', bank: '', number: '', holder: '김점순' },
      ],
      bride: [
        { label: '신부 김수민', bank: '', number: '', holder: '김수민' },
        { label: '신부 아버지 김왕기', bank: '', number: '', holder: '김왕기' },
        { label: '신부 어머니 강정현', bank: '', number: '', holder: '강정현' },
      ],
    },
  },
}

export type Wedding = typeof wedding

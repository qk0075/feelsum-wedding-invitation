export const wedding = {
  groom: {
    name: '황필규',
    nameEn: 'Pilgyu',
    father: '황의각',
    mother: '김점순',
    phone: '010-2849-5028',
  },
  bride: {
    name: '김수민',
    nameEn: 'Sumin',
    father: '김왕기',
    mother: '강정현',
    phone: '010-3095-8889',
  },

  date: {
    year: 2026,
    month: 11,
    day: 1,
    hour: 0,
    minute: 0,
    dayOfWeek: '일요일',
    displayDate: '2026년 11월 1일 일요일',
    displayTime: '',
  },

  subtitle: '가족과 함께하는 작은 결혼식',

  coverPhoto: '/gallery/cover.JPG',

  greeting: {
    title: '결혼 소식을 전합니다',
    message: `서로의 곁에서 같은 곳을 바라보며
함께 걸어온 저희 두 사람이
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

  bannerPhoto: '/gallery/wide.JPG',

  gallery: Array.from({ length: 13 }, (_, i) => `/gallery/${String(i + 1).padStart(3, '0')}.JPG`),

  gift: {
    message: '축하해 주시는 따뜻한 마음만 감사히 받겠습니다.',
    accounts: {
      groom: [
        { label: '신랑 황필규', bank: '하나', number: '361-910450-79207', holder: '황필규' },
        { label: '신랑 아버지 황의각', bank: '', number: '', holder: '황의각' },
        { label: '신랑 어머니 김점순', bank: '새마을금고', number: '0902-10-010805-0', holder: '김점순' },
      ],
      bride: [
        { label: '신부 김수민', bank: '카카오뱅크', number: '3333-06-2898727', holder: '김수민' },
        { label: '신부 아버지 김왕기', bank: '', number: '', holder: '김왕기' },
        { label: '신부 어머니 강정현', bank: '국민', number: '808-01-0085-234', holder: '강정현' },
      ],
    },
  },
}

export type Wedding = typeof wedding

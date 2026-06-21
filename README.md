# 우리 결혼합니다 — 모바일 청첩장

Nuxt(Vue) 로 만든 모바일 청첩장입니다.

## 🚀 화면 보기 (개발 서버)

터미널(PowerShell)에서 이 폴더로 이동한 뒤:

```bash
npm run dev
```

그다음 브라우저에서 **http://localhost:3000** 을 열면 됩니다.
(서버를 멈추려면 터미널에서 `Ctrl + C`)

## ✏️ 내용 수정하는 법

거의 모든 내용은 **한 파일**에서 고칠 수 있습니다:

> `app/data/wedding.ts`

여기서 신랑·신부 이름, 날짜, 예식장, 인사말, 계좌번호, 안내 문구를 바꾸면
사이트 전체에 자동으로 반영됩니다. (저장하면 화면이 바로 갱신돼요.)

### 사진 넣는 법

1. 메인 표지 사진: `public/cover.jpg` 로 사진을 저장
2. 갤러리 사진: `public/gallery/` 폴더를 만들고 사진을 넣은 뒤,
   `app/data/wedding.ts` 의 `gallery` 목록에 파일 경로를 적습니다.
   예) `gallery: ['/gallery/001.jpg', '/gallery/002.jpg']`

## 📦 배포용 빌드 (나중에 인터넷에 올릴 때)

```bash
npm run generate
```

`.output/public` 폴더에 정적 파일이 만들어지며, GitHub Pages 등에 올릴 수 있습니다.

## 📂 구조

```
app/
  data/wedding.ts      ← 내용 설정 (여기를 수정)
  components/          ← 각 섹션 (표지·인사말·갤러리·달력·오시는길·연락·계좌)
  pages/index.vue      ← 섹션을 모아 한 페이지로 구성
  assets/css/main.css  ← 색상·폰트 등 디자인
public/                ← 사진 등 정적 파일
```

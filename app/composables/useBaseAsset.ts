// 배포 하위 경로(baseURL)를 고려해 public 파일 경로를 보정합니다.
// 예) baseURL '/feelsum-wedding-invitation/' + '/gallery/001.JPG'
//     → '/feelsum-wedding-invitation/gallery/001.JPG'
export function useBaseAsset() {
  const base = useRuntimeConfig().app.baseURL
  return (path: string) => {
    if (!path) return path
    const clean = base.replace(/\/+$/, '')
    return clean + (path.startsWith('/') ? path : '/' + path)
  }
}

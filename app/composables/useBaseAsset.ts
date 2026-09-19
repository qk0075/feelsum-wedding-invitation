export function useBaseAsset() {
  const base = useRuntimeConfig().app.baseURL
  return (path: string) => {
    if (!path) return path
    const clean = base.replace(/\/+$/, '')
    return clean + (path.startsWith('/') ? path : '/' + path)
  }
}

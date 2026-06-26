export function publicPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  if (!path || path.startsWith('data:') || path.startsWith('blob:') || /^https?:\/\//.test(path)) {
    return path
  }

  if (!path.startsWith('/')) {
    return path
  }

  if (basePath && path.startsWith(`${basePath}/`)) {
    return path
  }

  return `${basePath}${path}`
}

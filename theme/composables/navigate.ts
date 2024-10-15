import { useRouter } from 'vue-router'

export function useNavigate() {
  const router = useRouter()

  function isExternalLink(path: string) {
    return typeof path === 'string' && path.startsWith('http')
  }

  function to(path: string) {
    if (isExternalLink(path))
      window.location.href = path
    else
      router.push({ path })
  }

  return {
    isExternalLink,
    to,
  }
}

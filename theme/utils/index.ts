import type { RouteLocationNormalizedLoaded } from 'vue-router'

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url)
}

/**
 * Evaluates if the given route matches specified conditions.
 *
 * @param {RouteLocationNormalizedLoaded} route - The current route object.
 * @param {boolean|string|string[]} conditions - Conditions to evaluate against the route.
 *     If `true`, it indicates all routes satisfy the condition.
 *     If a string, it specifies a single route pattern to match.
 *     If an array of strings, it specifies multiple route patterns any of which can match.
 * @returns {boolean} `true` if the route matches the conditions, otherwise `false`.
 */
export function checkRouteAgainstConditions(route: RouteLocationNormalizedLoaded, conditions: boolean | string | string[]) {
  if (conditions === true)
    return true
  else if (typeof conditions === 'string')
    return checkCurrentRouter(route, conditions)
  else if (Array.isArray(conditions))
    return conditions.some(entry => checkCurrentRouter(route, entry))

  return false
}

export function checkCurrentRouter(route: RouteLocationNormalizedLoaded, path: string) {
  if (path === 'home')
    return route.path.replace(/index.html$/, '') === '/'
  return route.path.includes(`/${path}`)
}

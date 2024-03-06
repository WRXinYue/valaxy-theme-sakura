import type { RouteLocationNormalizedLoaded } from 'vue-router'

export function isVideoUrl(url: string) {
  return /\.(mp4|webm|ogg)$/i.test(url)
}

/**
 * Evaluates if the given route matches specified conditions, including exclusive conditions.
 *
 * @param {RouteLocationNormalizedLoaded} route - The current route object.
 * @param {string|string[]} conditions - Conditions to evaluate against the route.
 *     If `all`, it indicates all routes satisfy the condition.
 *     If `none`, it indicates no routes satisfy the condition.
 *     If a string, it specifies a single route pattern to match or exclude (prefixed with `-`).
 *     If an array of strings, it specifies multiple route patterns to match or exclude (any prefixed with `-` are excluded).
 * @returns {boolean} `true` if the route matches the inclusion conditions and does not match any exclusion conditions, otherwise `false`.
 */
export function checkRouteAgainstConditions(route: RouteLocationNormalizedLoaded, conditions: string | string[]) {
  if (conditions === 'all')
    return true

  if (conditions === 'none' || conditions === '')
    return false

  const conditionsArray = typeof conditions === 'string' ? [conditions] : conditions
  const inclusionConditions = conditionsArray.filter(condition => !condition.startsWith('-'))
  const exclusionConditions = conditionsArray.filter(condition => condition.startsWith('-')).map(condition => condition.slice(1))

  const isExcluded = exclusionConditions.some(condition => checkCurrentRouter(route, condition))
  if (isExcluded)
    return false

  if (inclusionConditions.length > 0)
    return inclusionConditions.some(condition => checkCurrentRouter(route, condition))

  return true
}

export function checkCurrentRouter(route: RouteLocationNormalizedLoaded, path: string) {
  if (path === 'home')
    return route.path.replace(/index.html$/, '') === '/'
  return route.path.includes(`/${path}`)
}

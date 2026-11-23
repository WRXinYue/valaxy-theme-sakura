export function homeCategoryLink(category = 'All') {
  return {
    path: '/',
    query: { category },
    hash: '#sakura-home-discovery',
  }
}

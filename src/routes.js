const routes = Object.freeze({
  home: '/',
  root: '/',
  posts: '/posts/',
})
export default routes

export const postWithId = (id = ':id') => `${routes.posts}${id}`

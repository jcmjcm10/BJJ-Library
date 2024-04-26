
const routes = [
  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'lists', component: () => import('pages/VideoListPage.vue') },
      { path: 'videos', component: () => import('pages/IndexPage.vue') },
      { path: 'addVideo', component: () => import('pages/AddVideoPage.vue') },
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

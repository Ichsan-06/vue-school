import Layout from '@/views/layout/Layout'

const LibrarySettingRouter = {
  path: '/library-setting',
  component: Layout,
  redirect: 'noredirect',
  name: 'Setting',
  meta: {
    title: 'Setting',
    icon: 'international'
  },
  children: [
    {
      path: 'writer',
      component: () => import('@/views/library/writer'),
      name: 'Writer',
      meta: {
        title: 'Writer',
        noCache: true
      }
    },
    {
      path: 'publisher',
      component: () => import('@/views/library/publisher'),
      name: 'Publisher',
      meta: {
        title: 'Publisher',
        noCache: true
      }
    },
    {
      path: 'level',
      component: () => import('@/views/library/level'),
      name: 'Level',
      meta: {
        title: 'Level',
        noCache: true
      }
    },
    {
      path: 'category',
      component: () => import('@/views/library/category'),
      name: 'Category',
      meta: {
        title: 'Category',
        noCache: true
      }
    }
  ]
}

export default LibrarySettingRouter

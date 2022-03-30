import Layout from '@/views/layout/Layout'

const locationRouter = {
  path: '/elearning',
  component: Layout,
  redirect: 'noredirect',
  name: 'Elearning',
  meta: {
    title: 'elearning',
    icon: 'international'
  },
  children: [
    {
      path: 'subject',
      component: () => import('@/views/elearning/subject'),
      name: 'Subject',
      meta: {
        title: 'subject',
        noCache: true
      }
    },
    {
      path: 'section/:id',
      component: () => import('@/views/elearning/section'),
      name: 'Section',
      meta: { title: 'section', noCache: true },
      hidden: true
    },
    {
      path: 'chapter/add/:id',
      component: () => import('@/views/elearning/section'),
      name: 'Chapter',
      meta: { title: 'section', noCache: true },
      hidden: true
    },
    {
      path: 'lesson/add/:id',
      component: () => import('@/views/elearning/add-lesson'),
      name: 'Lesson',
      meta: { title: 'lesson', noCache: true },
      hidden: true
    }
  ]
}

export default locationRouter

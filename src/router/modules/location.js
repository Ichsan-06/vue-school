import Layout from '@/views/layout/Layout'

const locationRouter = {
  path: '/location',
  component: Layout,
  redirect: 'noredirect',
  name: 'Location',
  meta: {
    title: 'location',
    icon: 'international'
  },
  children: [
    {
      path: 'province',
      component: () => import('@/views/location/province/index'),
      name: 'Province',
      meta: {
        title: 'province',
        noCache: true
      }
    },
    {
      path: 'regencies',
      component: () => import('@/views/location/regencies/index'),
      name: 'Regencies',
      meta: {
        title: 'regencies',
        noCache: true
      }
    },
    {
      path: 'district',
      component: () => import('@/views/location/district/index'),
      name: 'District',
      meta: {
        title: 'district',
        noCache: true
      }
    }
  ]
}

export default locationRouter

import { createRouter, createWebHistory, RouteRecordRaw, RouterScrollBehavior } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'dashboard' },
  },
  {
    name: 'dashboard',
    path: '/',
    component: () => import('../pages/admin/dashboard/Dashboard.vue'),
  },
  {
    name: 'bioprojects',
    path: '/bioprojects',
    component: () => import('../pages/bioprojects/BioProjects.vue'),
  },
  {
    name: 'taxons',
    path: '/taxons',
    component: () => import('../pages/taxons/Taxon.vue'),
  },
  {
    name: 'organisms',
    path: '/organisms',
    component: () => import('../pages/organisms/OrganismPage.vue'),
  },
  {
    name: 'assemblies',
    path: '/assemblies',
    component: () => import('../pages/assemblies/AssemblyPage.vue'),
    children: [
      {
        name: 'assembly-list',
        path: '',
        component: () => import('../pages/assemblies/Assemblies.vue'),
        meta: {
          name: 'assemblies',
        },
      },
      {
        name: 'assembly',
        path: ':accession',
        props: true,
        component: () => import('../pages/assemblies/Assembly.vue'),
        meta: {
          name: 'assemblies',
        },
      },
    ],
  },
  {
    name: 'reads',
    path: '/reads',
    component: () => import('../pages/reads/ReadPage.vue'),
    children: [
      {
        name: 'read-list',
        path: '',
        component: () => import('../pages/reads/Reads.vue'),
        meta: {
          name: 'reads',
        },
      },
      {
        name: 'read',
        path: ':accession',
        props: true,
        component: () => import('../pages/reads/Read.vue'),
        meta: {
          name: 'reads',
        },
      },
    ],
  },
  {
    name: 'biosamples',
    path: '/biosamples',
    component: () => import('../pages/biosamples/BioSamplePage.vue'),
    children: [
      {
        name: 'biosample-list',
        path: '',
        component: () => import('../pages/biosamples/BioSamples.vue'),
        meta: {
          name: 'biosamples',
        },
      },
      {
        name: 'biosample',
        path: ':accession',
        props: true,
        component: () => import('../pages/biosamples/BioSample.vue'),
        meta: {
          name: 'biosamples',
        },
      },
    ],
  },
  {
    name: 'organisms',
    path: '/organisms',
    component: () => import('../pages/organisms/OrganismPage.vue'),
    children: [
      {
        name: 'organism-list',
        path: '',
        component: () => import('../pages/organisms/Organisms.vue'),
        meta: {
          name: 'organisms',
        },
      },
      {
        name: 'organism',
        path: ':taxid',
        props: true,
        component: () => import('../pages/organisms/Organism.vue'),
        meta: {
          name: 'organisms',
        },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //  mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  routes,

  scrollBehavior(to, from, savedPosition): RouterScrollBehavior {
    // savedPosition is only available for popstate navigations.
    if (savedPosition) return savedPosition
    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    if (to.params.savePosition) return {}

    // scroll to anchor by returning the selector
    if (to.hash) {
      const position = { selector: to.hash }

      // specify offset of the element
      // if (to.hash === '#anchor2') {
      //   position.offset = { y: 100 }
      // }
      return position
    }

    // scroll to top by default
    return { x: 0, y: 0 }
  },
})

export default router

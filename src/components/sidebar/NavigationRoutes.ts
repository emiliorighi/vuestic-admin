export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        icon: 'vuestic-iconset-dashboard',
      },
    },
    {
      name: 'bioprojects',
      displayName: 'menu.bioprojects',
      meta: {
        icon: 'science',
      },
    },
    {
      name: 'taxons',
      displayName: 'menu.taxons',
      meta: {
        icon: 'tenancy',
      },
    },
    {
      name: 'organism-list',
      displayName: 'menu.organisms',
      meta: {
        icon: 'pets',
        name: 'organisms',
      },
    },
    {
      name: 'assembly-list',
      displayName: 'menu.assemblies',
      meta: {
        icon: 'library_books',
        name: 'assemblies',
      },
    },
    {
      name: 'read-list',
      displayName: 'menu.reads',
      meta: {
        icon: 'widgets',
        name: 'reads',
      },
    },
    {
      name: 'biosample-list',
      displayName: 'menu.biosamples',
      meta: {
        icon: 'hub',
        name: 'biosamples',
      },
    },
  ] as INavigationRoute[],
}

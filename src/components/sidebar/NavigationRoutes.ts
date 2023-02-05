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
        icon: 'pets',
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
      name: 'reads',
      displayName: 'menu.reads',
      meta: {
        icon: 'widgets',
      },
    },
    {
      name: 'biosamples',
      displayName: 'menu.biosamples',
      meta: {
        icon: 'hub',
      },
    },
  ] as INavigationRoute[],
}

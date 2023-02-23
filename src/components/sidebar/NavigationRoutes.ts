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
      name: 'assemblies',
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
        name: 'reads',
      },
    },
    {
      name: 'biosamples',
      displayName: 'menu.biosamples',
      meta: {
        icon: 'hub',
        name: 'biosamples',
      },
    },
    {
      name: 'forms',
      displayName: 'menu.forms',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
      children: [
        {
          name: 'insdc-forms',
          displayName: 'menu.insdcForms',
          meta: {},
        },
        {
          name: 'organism-form',
          displayName: 'menu.organismForm',
          meta: {},
        },
        // {
        //   name: 'local-samples-form',
        //   displayName: 'menu.localSamplesForm',
        //   meta: {
        //     name: 'forms',
        //   },
        // },
        // {
        //   name: 'genome-browser-form',
        //   displayName: 'menu.genomeBrowserForm',
        //   meta: {
        //     name: 'forms',
        //   },
        // },
        // {
        //   name: 'annotation-form',
        //   displayName: 'menu.annotationForm',
        //   meta: {
        //     name: 'forms',
        //   },
        // }
      ],
    },
  ] as INavigationRoute[],
}

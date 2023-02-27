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
        icon: 'fa-diagram-project',
      },
    },
    {
      name: 'taxons',
      displayName: 'menu.taxons',
      meta: {
        icon: 'fa-circle-nodes',
      },
    },
    // {
    //   name: 'organisms',
    //   displayName: 'menu.organisms',
    //   meta: {
    //     icon: 'fa-paw',
    //     name: 'organisms',
    //   },
    //   children:[
    //     name:
    //   ]
    // },
    {
      name: 'organism-list',
      displayName: 'menu.organisms',
      meta: {
        icon: 'fa-paw',
        name: 'organisms',
      },
    },
    {
      name: 'assemblies',
      displayName: 'menu.assemblies',
      meta: {
        icon: 'fa-dna',
        name: 'assemblies',
      },
    },
    {
      name: 'reads',
      displayName: 'menu.reads',
      meta: {
        icon: 'fa-file-lines',
        name: 'reads',
      },
    },
    {
      name: 'biosamples',
      displayName: 'menu.biosamples',
      meta: {
        icon: 'fa-vial',
        name: 'biosamples',
      },
    },
    {
      name: 'status',
      displayName: 'menu.sequencingStatus',
      meta: {
        icon: 'fa-list-check',
        name: 'status',
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

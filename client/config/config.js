export default {
  singular: true,
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      locale: {
        enable: true,
      },
    }],
  ],
  routes: [
    {
      path: '/',
      component: '../layout',
      routes: [
        {
          path: '/',
          component: './index.js'
        },
        { path: 'owners', component: './lists/owners.js' },
        { path: 'owners/:id', component: './lists/owners.js' },
        { path: 'ownercards', component: './cards/owners.js' },
        { path: 'typescript', component: './tsdemo' },
        { path: 'locale', component: './locale' }
      ]
    }
  ],
  
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    },
  },
};


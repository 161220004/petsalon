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
        { path: 'owners/:id', component: './lists/ownerdetails.js' },
        { path: 'pets', component: './lists/pets.js' },
        { path: 'pets/:id', component: './lists/petdetails.js' },
        { path: 'service', component: './lists/service.js' },
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


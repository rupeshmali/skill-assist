export default {
    home: {
      route: '/',
      exact: true,
      isProtected: true
    },
    about: {
      route: '/about',
      props: {
        title: 'This is about page'
      },
      isProtected: false
    },
    landing: {
      route: '/landing',
      isProtected: false
    }, 
    profile: {
      route: '/profile',
      isProtected: true
    },
    sellerForm: {
      route: '/become-a-seller',
      isProtected: true
    },
    sellerDashboard: {
      route: '/seller-dashboard',
      isProtected: true
    },
    addService: {
      route: '/add-service/:userId',
      isProtected: true
    },
    service :{
      route:'/service/:id',
      isProtected:true
    }
  };
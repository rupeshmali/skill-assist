import Home from "@pages/Home";
import routeConstants from "@utils/routeConstants";
import About from "@pages/About";
import Landing from "@pages/Landing";
import Profile from "@pages/Profile";
import SellerForm from "@pages/SellerForm";
import SellerDashboard from "@pages/SellerDashboard";
import AddService from "@pages/AddService";
import Service from "@pages/Service";

export const routeConfig = {
    home: {
        component: Home,
        ...routeConstants.home
    },
    about: {
        component: About,
        ...routeConstants.about
    },
    landing: {
        component: Landing,
        ...routeConstants.landing
    },
    profile: {
        component: Profile,
        ...routeConstants.profile
    },
    sellerForm: {
        component: SellerForm,
        ...routeConstants.sellerForm
    },
    SellerDashboard: {
        component: SellerDashboard,
        ...routeConstants.sellerDashboard
    },
    addService: {
        component: AddService,
        ...routeConstants.addService
    },
    service:{
        component:Service,
        ...routeConstants.service
    }


}
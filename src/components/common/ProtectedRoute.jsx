import { routeConfig } from '@/route.config';
import routeConstants from '@utils/routeConstants';
import React from 'react'
import { Route } from 'react-router-dom';
export default function ProtectedRoute({ decider, isProtected, path, exact, render: C }) {
    const isProtectedRoutes = Object.keys(routeConfig).filter(route => routeConfig[route].isProtected).map(route => routeConstants[route].route).includes(path);
    return <Route path={path} render={handleRedirection} /> 
}

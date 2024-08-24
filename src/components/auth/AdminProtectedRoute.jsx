import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const adminProtectedRoute = ({ children, isAdmin, redirect = "/admin" }) => {
    if (!isAdmin) return <Navigate to={redirect} />
    return (
        children ? children : <Outlet />
    )
}

export default adminProtectedRoute

//  @@@@@@@@@@@@@@@@@@@@@@@ UNUSED
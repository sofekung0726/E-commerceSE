import React from 'react'
import {createBrowserRouter} from "react-router-dom";
import Main from '../layout/Main';
import Home from '../pages/home/Home';
import ProductList from '../pages/shop/ProductList';
import SignUp from '../components/SignUp';
import Signin from '../components/Signin';
import UpdateProfile from '../pages/dashboard/UpdateProfile';
import ProtectedRoute from '../pages/Routes/ProtectRoute';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children:[
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/shop",
            element: <ProtectedRoute> <ProductList/> </ProtectedRoute>
        },
        {
            path: "/update-profile",
            element: <UpdateProfile/>
        },
        {
          path:"/signin",
          element:<Signin/>
        }
      ]
    },
    {
      path:"/signup",
      element:<SignUp/>
    },
    
  ]);



export default router
import React from "react";
import { FaBorderAll } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";
import { IoMdAddCircle } from "react-icons/io";
import { HiTemplate } from "react-icons/hi";
import { FaUserEdit } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { BiNavigation } from "react-icons/bi";
import { MdContactSupport } from "react-icons/md";
import addProduct from "./addProduct";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import { Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";



const Admin = () => {
  const [isAdmin , isAdminLoading] = useAdmin()
  
  return (
    <div >
    {isAdmin? (
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center my-2">
            <div className="flex items-center justify-between mx-4">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-primary drawer-button lg:hidden"
            >
              <FaBorderAll />
            </label>
            <button class="btn btn-outline btn-sx sm:btn-sm lg:btn-lg sm:hidden flex items-center gap-2 btn-info">
            <FaUser />    Logout
              </button>
          </div>
          <div className=""> 
            Content
            <Outlet/>
          </div>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer-2"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            <Link to={"/dashboard"}>
              <div className="flex flex-row items-center ">
            
                <img src="/logo.png"  alt="" className="h-20 mx-0" />
             
                <button className="btn btn-sm btn-primary rounded-full">
                  Admin
                </button>
                
              </div>
              </Link>
              {/* Sidebar content here */}
              <hr class="h-px my-4 bg-gray-400 border-0 dark:bg-gray-300"></hr>
              <li className="border-0">
              <a><FaBorderAll />
                Dashboard</a>
              </li>
              <li>
                <a> <BsBagCheckFill />Manage Orders</a>
              </li>
              <li>
                <a href="/addProduct"> <IoMdAddCircle/>Add Product</a>
              </li>
              <li>
                <a> <HiTemplate/>Manage Item</a>
              </li>
              <li>
                <Link to={"/dashboard/allUser"}>
               <FaUserEdit/>All Users
                </Link> 
               
              </li>
              <hr class="h-px my-4 bg-gray-400 border-0 dark:bg-gray-300"></hr>
              <li >
                <a><FaHome/>Home</a>
              </li>
              <li>
                <a><FaCartShopping/>Product</a>
              </li>
              <li>
                <a><BiNavigation/>Order Tracking</a>
              </li>
              <li>
                <a><MdContactSupport/>Customer Support</a>
              </li>
            </ul>
          </div>
        </div>
     ) : (
      <button class="btn btn-outline btn-sx sm:btn-sm lg:btn-lg sm:hidden flex items-center gap-2  btn-warning">
      <FaUser />    Logout
        </button> )}
    </div>
  );
};

export default Admin;
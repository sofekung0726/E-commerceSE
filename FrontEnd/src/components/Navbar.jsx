import React from 'react'

const Navbar = () => {
    const navItem = (
        <>
            <li><a>Home </a></li>
            <li tabIndex={0}>
                <details>
                    <summary>Category</summary>
                    <ul className="p-2">
                        <li><a>All</a></li>
                        <li><a>Clothing</a></li>
                        <li><a>Accessories</a></li>
                        <li><a>Gadgets</a></li>
                        <li><a>Swag</a></li>
                    </ul>
                </details>
            </li>

            <li tabIndex={0}>
                <details>
                    <summary>Service</summary>
                    <ul className="p-2">
                        <li><a>Order Online</a></li>
                        <li><a>Order Tracking</a></li>

                    </ul>
                </details>
            </li>
            <li><a>Promotion</a></li>
        </>
    )
    return (
        <header className='max-w-screen-2x1 container mx-auto fixed top-0 left-0 right-0 translate-all duration-300 ease-in-out'>
            <div className='navbar xl:px-24'>
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navItem}
                            </ul>
                        </div>
                        <a className="btn btn-ghost text-xl">
                            <img src="/logo.png" alt="" className='h-12 pr-1 mx-auto' />
                            <span className='text-red'>Test </span> SE Souvenir Shop
                        </a>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navItem}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle lg:flex mr-3 items-center justify-center hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle hidden sm:flex">
                            <div className="indicator">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                <span className="badge badge-sm indicator-item">8</span>
                            </div>
                        </div>
                        <a className="btn bg-red rounded-full text-white flex items-center gap-2 ">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75
                                 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375
                                  0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1
                                   .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 
                                   48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                            </svg>
                            Contact</a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar
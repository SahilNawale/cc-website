/*eslint-disable*/
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import axiosInstance from "AxiosInstance";



export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const history = useHistory();
  const [loggedIn,setLoggedIn] = useState(false);

  useEffect(() => {
    axiosInstance.post('verify/').then((res)=>{
      if(res.data=="True") setLoggedIn(true)
    })
  }, [])
      
  const handleLogout = ()=>{
    axiosInstance.post('logout/').then(()=>{
      window.location.href='/'
    });
  }

  const changeRoute= (a)=>{
    if(a==0){
      history.push('/auth/login')
    }
    else if(a==1){
      history.push('/auth/register')
    }
    else if(a==2){
      history.push('/companies')
    }
    else if(a==3){
      history.push('/network')
    }
    else if(a==4){
      history.push('/events')
    }
    else if(a==5){
      history.push('/profile')
    }


  }


  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-white text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            >
              Consulting Club
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              
            {loggedIn?<li className="flex items-center">
                <PagesDropdown />
              </li>:null}
              
              {loggedIn?
              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(3)}
                >
                  <i className="fas fa-solid fa-network-wired"></i> S.P.I.T Network
                </button>
              </li>:null}

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(2)}
                >
                  <i className="fas fa-solid fa-building"></i> Companies
                </button>
              </li>

              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(4)}
                >
                  <i className="fas fa-solid fa-calendar"></i> Events
                </button>
              </li>
              {loggedIn?
              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(5)}
                >
                  <i className="fas fa-solid fa-id-badge"></i> My Profile
                </button>
              </li>:null}
              {!loggedIn?
              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(0)}
                >
                  <i className="fas fa-solid fa-key"></i> Login
                </button>
              </li>:null}
              {!loggedIn?
              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={() => changeRoute(1)}
                >
                  <i className="fas fa-solid fa-user-plus"></i> Signup
                </button>
              </li>:null}
              {loggedIn?
              <li className="flex items-center">
                <button
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button" onClick={handleLogout}
                >
                  <i className="fas fa-sign-out-alt fa-solid"></i> Logout
                </button>
              </li>:null}


            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

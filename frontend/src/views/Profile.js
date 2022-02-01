import React,{useEffect,useState} from "react";
import {useHistory } from "react-router-dom";
import axios from 'axios'

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MoreIcon from '@mui/icons-material/More';
import axiosInstance from "AxiosInstance";
import { BaseUrl } from "AxiosInstance";

export default function Profile() {
  const history = useHistory();
  const[message,setMessage]=useState('');

  useEffect(() => {
    axiosInstance.get('profile/')
      // axios.get('http://127.0.0.1:5000/getMyprofile')
      .then(response => {
        console.log(response.data)
          setMessage(response.data)
      })
      .catch(error => {
        console.log(error)
      })
      
  }, [])



  return (
    <>
      <Navbar transparent />
      {message?<><main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
              "url(" + require("assets/img/wallpaper.png").default + ")",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={BaseUrl+"media/"+message['profilePic']}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-6 mt-32 sm:mt-0">
                      
                        <button
                        className="bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="button" style={{backgroundColor:'#041C32'}} onClick={()=>history.push('/editProfile')}
                      >
                        Edit
                      </button>
                      

                      
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        
                        {message['social'].map((elm,index)=>{
                          if(elm.includes('github')){
                            return <>{console.log(elm)}<a href={elm} className="px-4 py-2" type="button" key={index} target="_blank"><GitHubIcon fontSize='large'/></a></>
                          }
                          else if(elm.includes('linkedin')){
                            return <><a  href={elm} className="px-4 py-2" type="button" key={index} target="_blank"><LinkedInIcon fontSize='large'/></a></>
                          }
                          else{
                            return <><a href={elm} className="px-4 py-2" type="button" key={index} target="_blank"><MoreIcon fontSize='large'/></a></>
                          }
                      })}
                      
                      </div>
                      
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                   {message['name']}  
                   
                  </h3>
                 
                  <div className="text-sm leading-normal mt-0 mb-2 text-black font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-black"></i>{" "}
                    {message['city']}, {message['state']} &nbsp;
                    
                  </div>
                  <div className="mb-2 text-black font-bold mt-10" style={{fontSize:'20px'}}>
                    <i className="fas fa-briefcase mr-2 text-lg text-black"></i>
                    {message['role']} - {message['currentCompany']}&nbsp; 
                    
                  </div>
                  <div className="mb-2 font-bold text-black">
                    <i className="fas fa-university mr-2 text-lg text-black"></i>
                    S.P.I.T &nbsp; {message['passoutYear']-4}-{message['passoutYear']} &nbsp; ({message['branch']})&nbsp; 
                    
                  </div>
                  <div className="mb-2 text-black font-bold mt-10" style={{fontSize:'20px'}}>
                    <i className="fas fa-laptop-code mr-2 text-lg text-black"></i>
                    Skills : <span className="mb-2 text-black font-bold mt-10" style={{fontSize:'17px'}}>{message['skills']}</span>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-black text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-black font-bold">
                        {message['description']}&nbsp; 
                        
                      </p>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      </>
      :<></>}
      
      <Footer />
    </>
  );
}

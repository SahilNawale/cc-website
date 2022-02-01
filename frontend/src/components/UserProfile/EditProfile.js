import React,{useEffect,useState,useRef} from "react";
import axios from 'axios'

import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MoreIcon from '@mui/icons-material/More';


import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import axiosInstance from "AxiosInstance";
import allSkills from "./skills";
import { useHistory } from "react-router";



export default function EditProfile() {
  const [open, setOpen] = useState(true);//this is for the alert of skills
  const [open1, setOpen1] = useState(true);//this is for the alert of past companies
  const[alert1,setAlert1] = useState(0)
  const[alert2,setAlert2] = useState(0)
  const history = useHistory()


  const[message,setMessage]=useState(''); //for storing the initial profile info
  const [selectedOptions, setSelectedOptions] = useState([]);
  const[dumb,setDumb]= useState(0)
  const [companies, setCompanies] = useState([]);
  const[dumbo,setDumbo]= useState(0)
  const[image,setImage] = useState(null);
  
  
  const fnameref = useRef()
  const lnameref = useRef()
  const yearref
   = useRef()
  const cityref = useRef()
  const stateref = useRef()
  const countryref= useRef()
  const gitref = useRef()
  const linkref = useRef()
  const webref = useRef()
  const currcompref = useRef()
  const roleref = useRef()
  const descref = useRef()
  

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

  const handleChange = (event, value) => {

    if(value.length===3){
      setAlert1(1)
      setOpen(true)
      setDumb(0)
      setSelectedOptions(value)
    }
    else if(value.length<3){
      setDumb(1)
      setAlert1(0)
      setOpen(false)
      setSelectedOptions(value)
    }
    else{
      setSelectedOptions(value);
    }
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  };

  const handleChange2 = (event, value) => {

    if(value.length===3){
      setAlert2(1)
      setOpen1(true)
      setDumbo(0)
      setCompanies(value)
    }
    else if(value.length<3){
      setAlert2(0)
      setOpen1(false)
      setDumbo(1)
      setCompanies(value)
    }
    else{
      setCompanies(value);
    }
  }

  const handleSubmit =async (e) => {
    e.preventDefault();
    let formData = new FormData();
    var pastcomps=""

    if(image){
      formData.append('profilePic', image, image.name);
      // console.log(formData.get('profilepic'))
    }
    
    if(fnameref.current.value.concat(" ", lnameref.current.value)!==message['name']){
      formData.append('name',fnameref.current.value.concat(" ", lnameref.current.value))
    }
    if(yearref
      .current.value!==message['email']){
      formData.append('passoutYear',yearref
      .current.value)
    }
    if(cityref.current.value!==message['city']){
      formData.append('city',cityref.current.value)
    }
    if(stateref.current.value!==message['state']){
      formData.append('state',stateref.current.value)
    }
    if(countryref.current.value!==message['country']){
      formData.append('country',countryref.current.value)
    }
          formData.append("githubProfile",gitref.current.value)

          formData.append("linkedInProfile",linkref.current.value)

          formData.append("otherLinks",webref.current.value)

    if(currcompref.current.value!==message['company']){
      formData.append('currentCompany',currcompref.current.value)
    }
    if(roleref.current.value!==message['role']){
      formData.append('role',roleref.current.value)
    }
    if(descref.current.value!==message['description']){
      formData.append('description',descref.current.value)
    }

    let skills = ""

    selectedOptions.map((option,key)=>{
      if(option!==undefined){
        skills = skills + (key!==0?",":"")+option
      }
    })

    if(skills===""){
      formData.append('skills',message['skills'])
    }
    else{
      formData.append('skills',skills)
    }
    

    companies.map((option,key)=>{
      if(option!==undefined){
        pastcomps = pastcomps + (key!==0?",":"")+option
      }
    })
    if(pastcomps===""){
      formData.append('workExperience',message['workExperience'])
    }
    else{
      formData.append('workExperience',pastcomps)
    }

    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  }
    
    axiosInstance.post('update-profile/',formData, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
    .then(res => {
        console.log(res.data);
        if(res.data==="Profile updated successfully"){
          history.push('/profile')
        }
    })
    .catch(err => console.log(err))
  }


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
          <div className="container mx-auto px-4 items-center">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 ">
              <div className="px-6 rounded-t bg-blueGray-200">
              <div className="flex-1 px-4 lg:px-10 py-10 text-center">
                {/* mera wala */}


                <div className="max-w-screen-md mx-auto p-5" >
                  <div className="text-center mb-12">
                    <p className="mt-4 text-2xl leading-7 text-black font-bold uppercase">
                        Edit Profile
                      </p>
                      <hr className="mt-6 border-b-1 border-blueGray-300" />
                      
                  </div>
                  
                  <form className="w-full" onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="lg:w-1/4 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-first-name">
                        First Name
                      </label>
                      <input ref={fnameref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-first-name" defaultValue={message['name'].split(" ")[0]} type="text" placeholder="Jane"/>
                    </div>

                    <div className="lg:w-1/4 md:w-6/12 sm:w-full xs:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-last-name">
                        Last Name
                      </label>
                      <input ref={lnameref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-last-name" defaultValue={message['name'].split(" ")[1]} type="text" placeholder="Doe"/>
                    </div>

                    <div className="lg:w-1/4 md:w-6/12 sm:w-full xs:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-year">
                        Passout Year
                      </label>
                      <input ref={yearref
                      } className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-year" defaultValue={message['passoutYear']} type="number" placeholder="2020"/>
                    </div>

                    <div className="lg:w-1/4 md:w-6/12 sm:w-full xs:w-full px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-email">
                        Profile Image
                      </label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          id="contained-button-file"
                          className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      
                        
                    </div>


                    
                  </div>


                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="lg:w-1/3 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-city">
                        City
                      </label>
                      <input ref={cityref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-city" defaultValue={message['city']} type="text" placeholder="Mumbai"/>
                    </div>

                    <div className="lg:w-1/3 md:w-6/12 sm:w-full xs:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-state">
                        State
                      </label>
                      <input ref={stateref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-state" defaultValue={message['state']} type="text" placeholder="Maharashtra"/>
                    </div>

                    <div className="lg:w-1/3 md:w-6/12 sm:w-full xs:w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-country">
                        Country
                      </label>
                      <input ref={countryref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-country" defaultValue={message['country']} type="text" placeholder="India"/>
                    </div>
                    
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    {message['social'].map((item,index)=>{
                      if(item.includes('github')){
                        return (
                        <div key={index} className="lg:w-1/3 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                          <GitHubIcon fontSize='large' className="mb-2"/>
                          <input ref={gitref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  type="text" defaultValue={item.slice(2)} placeholder="www.github.com"/>
                        </div>)
                      }
                      else if(item.includes('linkedin')){
                        return (
                        <div key={index} className="lg:w-1/3 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                          <LinkedInIcon fontSize='large' className="mb-2"/>
                          <input ref={linkref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  type="text" defaultValue={item.slice(2)} placeholder="www.github.com"/>
                        </div>)
                      }
                      else{
                        return (
                          <div key={index} className="lg:w-1/3 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                            <MoreIcon fontSize='large' className="mb-2"/>
                            <input ref={webref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"  type="text" defaultValue={item.slice(2)} placeholder="www.github.com"/>
                          </div>)
                      }
                      

                    })}
                    
                  </div>


                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="lg:w-6/12 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-curr">
                        Current Company
                      </label>
                      <input ref={currcompref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-curr" type="text" defaultValue={message['currentCompany']} placeholder="My Company"/>
                    </div>

                    <div className="lg:w-6/12 md:w-6/12 sm:w-full xs:w-full px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-role">
                        Role (Current)
                      </label>
                      <input ref={roleref} className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" id="grid-role" type="text" defaultValue={message['role']} placeholder="Software Developer"/>
                    </div>
                  </div>

                  <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="lg:w-6/12 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                    {alert1?<Collapse in={open}>
                                <Alert
                                severity="warning"
                                  action={
                                    <IconButton
                                      aria-label="close"
                                      color="inherit"
                                      size="small"
                                      onClick={() => {
                                        setOpen(false);
                                      }}
                                    >
                                      <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                  }
                                  sx={{ mb: 2 }}
                                >
                                  You can only enter 3 entries!
                                </Alert>
                              </Collapse>:null}
                    <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="tags-standard">
                        Skills
                      </label>
                    <Autocomplete
                      multiple
                      id="tags-standard"
                      options={dumb ? allSkills : none}
                      limitTags={2}
                      onChange={handleChange}
                      getOptionLabel={(option) => option}
                      defaultValue={message['skills'].split(",").map((skill)=>(
                        skill
                      ))}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          size="small"
                          placeholder="Skills"
                          className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        />
                      )}
                    />
                    </div>

                    <div className="lg:w-6/12 md:w-6/12 sm:w-full xs:w-full px-3 mb-6 md:mb-0">
                    {alert2?<Collapse in={open1}>
                                <Alert
                                severity="warning"
                                  action={
                                    <IconButton
                                      aria-label="close"
                                      color="inherit"
                                      size="small"
                                      onClick={() => {
                                        setOpen1(false);
                                      }}
                                    >
                                      <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                  }
                                  sx={{ mb: 2 }}
                                >
                                  You can only enter 3 entries!
                                </Alert>
                              </Collapse>:<></>}
                      <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="tags-standard">
                          Past Companies
                      </label>
                      <Autocomplete
                        multiple
                        limitTags={2}
                        id="tags-standard"
                        options={none}
                        onChange={handleChange2}
                        defaultValue={message['workExperience'].map((exp)=>(
                          exp
                        ))}
                        freeSolo={dumbo?true:false}
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                          ))
                        }
                        
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            size="small"
                            placeholder="Companies"
                            className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                          />
                        )}
                      />
                    </div>
                  </div>
                  
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-md font-bold mb-2" htmlFor="grid-description">
                          Description
                        </label>
                        <textarea ref={descref} rows="10" className="border-0 px-3 py-3 placeholder-black text-blueGray-600 bg-white rounded text-md shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" defaultValue={message['description']}>
                          
                        </textarea>
                      </div>
                      <div className="flex justify-between w-full px-3">
                        
                        <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 mt-4 w-48 ease-linear transition-all duration-150"
                        type="submit">Save</button>
                      </div>
                      
                  </div>
                    
                </form>
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

const none=[]

const skills = [
  'The Shawshank Redemption',
  'The Godfather',
  'The Godfather: Part II',
];

import React,{Fragment, useEffect,useState} from 'react'
import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer.js";
import Container from '@material-ui/core/Container';
import '../../assets/styles/eventcards.css'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import DispYear from './DispYear'
import Button from '@mui/material/Button';
import axiosInstance from 'AxiosInstance';

const Network = () => {

    const [message,setMessage] = useState([])
    const [profile,setProfile] = useState([])
    const [dummy,setDummy] = useState(1)
    const [loggedIn,setLoggedIn] = useState(false)

    useEffect(() => {
        axiosInstance.get('network/get-years')
        .then(response => {
            setMessage(response.data)
            console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
        axiosInstance.post('verify/').then((res)=>{
            if(res.data=="True") setLoggedIn(true)
          })
    }, [])

    const handleClick = (index)=>{
        var ele=index
        axiosInstance.get(`network/${ele}`)
         .then(function(response) {
            console.log(response.data);
            setProfile(response.data)
         })
         .catch(function(error) {
            console.log(error);
         });
        setDummy(0)
    }

    if(!loggedIn){
        return <h1>Login First</h1>
      }

    return (
        <Fragment>
        <Navbar transparent />
            <main style={{'paddingBottom':'20px',marginBottom:'40px'}}>
                <div style={{backgroundImage:"url(" + require("assets/img/wallpaper.png").default + ")",backgroundColor:'black',backgroundRepeat:'no-repeat',backgroundSize:'100%'}}>
                <Container>
                
                <section className="dark" style={{paddingTop:'120px'}}>
                    <div className="container py-4">
                    
                   
                        <Grid container spacing={4} style={{'marginBottom':'10px','marginTop':'10px'}}>
                            
                            {message?message.map((item,index)=>{
                                return(
                                    <Fragment>
                                        <Button key={index} style={{backgroundColor:'white',color:'black',fontFamily:'inherit',fontWeight:'bold',height:'70px',margin:'10px',width:'120px'}} onClick={()=>handleClick(item['passoutYear'])}>{item['passoutYear']-4}-{item['passoutYear']}</Button>
                                    </Fragment>
                                )
                            }):null}
                            
                        </Grid>
                        
                        {!dummy?<DispYear data={profile}/>:null}

                    </div>
                    
                </section>
                </Container>
                {dummy?<div style={{margin:'0 auto',height:'400px'}}></div>:null}
                </div>
                
            </main>
            
        <Footer/>
        </Fragment>
    )
}

export default Network

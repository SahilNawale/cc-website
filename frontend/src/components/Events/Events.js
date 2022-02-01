import React,{useEffect,useState} from 'react'
import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer.js";
import Container from '@material-ui/core/Container';
import '../../assets/styles/eventcards.css'
import Event from './Event';
import axios from 'axios'
import axiosInstance from 'AxiosInstance';

const Events = () => {
    
    const [message,setMessage] = useState('')

    useEffect(() => {
        axiosInstance.get('event/all')
        // axios.get('http://127.0.0.1:5000/getEvents')
        .then(response => {
            setMessage(response.data)
            console.log(response.data)
            // setMessage(response.data.data)
        })
        .catch(error => {
          console.log(error)
        })
    }, [])

    return (
        <>
        <Navbar transparent />
        <main >
        <div style={{backgroundImage:"url(" + require("assets/img/comapnybackgif.gif").default + ")",backgroundColor:'black',}}>
            <Container>
            <section className="dark" style={{paddingTop:'120px'}}>
                <div className="container py-4">
                    
                   {message? <Event arr={message}/>:<></>}

                </div>
            </section>
            </Container>
            </div>
            </main>
            
        
        <Footer/>
        </>
    )
}

export default Events

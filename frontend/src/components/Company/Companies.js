import React,{useEffect, useState} from 'react'
// import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import DispCard from './DispCard';
// components
import Navbar from "components/Navbars/AuthNavbar";
import Footer from "components/Footers/Footer.js";
import axios from 'axios';
import axiosInstance from 'AxiosInstance';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      
    }
  }));

const Companies = () => {
    const classes = useStyles();
    const [message,setMessage] = useState('')

    useEffect(() => {
      axiosInstance.get('project/all')
      // axios.get('http://127.0.0.1:5000/getCompanies')
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
        <main>
          <div style={{backgroundImage:"url(" + require("assets/img/comapnybackgif.gif").default + ")",backgroundColor:'black'}}>
            <Container className={classes.cardGrid} maxWidth="lg">
              {message ? <DispCard data={message} />:<></>}
            </Container>
          </div>
        </main>
        <Footer/>
        </>
    )
}

export default Companies

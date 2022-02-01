import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router'
import Navbar from "../Navbars/AuthNavbar";
import Container from '@material-ui/core/Container';
import Footer from "../Footers/Footer.js";
import QuestionCard from './QuestionCard';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
import axiosInstance from 'AxiosInstance';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      
    }
  }));


const QuestionMain = () => {
    const classes = useStyles();
    let {id} = useParams()
    const [questions,setQuestions] = useState([])
    const [loggedIn,setLoggedIn] = useState(false)

    useEffect(() => {
      axiosInstance.post('verify/').then((res)=>{
        if(res.data=="True") setLoggedIn(true)
      })
    }, [])    

    useEffect(()=>{
        axiosInstance.get(`question/${id}`,)
        // axios.post('http://127.0.0.1:5000/getQuestionCompanyName', {'name':name})
         .then(function(response) {
            console.log(response.data);
            setQuestions(response.data)
         })
    },[id])
    if(!loggedIn){
      return <h1>Login First</h1>
    }
    return (
        <>
        <Navbar transparent />
        <main>
          <div style={{backgroundImage:"url(" + require("assets/img/comapnybackgif.gif").default + ")",backgroundColor:'black'}}>
            <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4} style={{'marginBottom':'70px','marginTop':'70px','marginLeft':'auto'}} >
              {questions.length!==0?
                questions.map((q,key)=>(
                  <QuestionCard key={key} question={q}/>  
                ))
                :null}
            </Grid>  
            </Container>
          </div>
        </main>
        <Footer/>
        </>
    )
}

export default QuestionMain

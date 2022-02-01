import React, { Fragment, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { blue } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axiosInstance from 'AxiosInstance';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest
  })
}));



const QuestionCard = (props) => {
  const [selectedIndex, setSelectedIndex] = useState("")

  const handleClick = index => {
    if (selectedIndex === index) {
      setSelectedIndex("")
    } else {
      setSelectedIndex(index)
    }
  }
  let item = props.question

  const [answer,setAnswer] = useState()

  useEffect(() => {
    axiosInstance.get(`answer/${item.question_id}`).then(res=>{setAnswer(res.data);console.log(res.data)})
  }, [item.question_id])

  return (
    <Grid item xs={8} md={3}>
      <Card sx={{ maxWidth: 345 }} style={{ fontFamily: 'inherit' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: blue[200] }} aria-label="recipe">
              {item['name'][0]}
            </Avatar>
          }
          // action={
          // <IconButton aria-label="settings">
          //     <MoreVertIcon />
          // </IconButton>
          // }
          title={"Question No : " + item['question_id']}
          subheader={item['date']}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary" style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 'bold' }}>
            {item['question']}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <ExpandMore
            expand={1 === selectedIndex}
            onClick={() => handleClick(1)}
            aria-label="show more"
          >
          {item['upvote']}
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={1 === selectedIndex} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 'bold' }}>Answer:</Typography>
            <Typography paragraph style={{ fontFamily: 'inherit', fontSize: '15px', fontWeight: 'bold' }}>

              {answer?answer.map((ans,key)=>(<li key={key}>{ans.answer}</li>)):null}

            </Typography>


          </CardContent>
        </Collapse>
      </Card>
    </Grid>
  )
}

export default QuestionCard

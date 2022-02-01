import React from 'react'
import "../../assets/styles/network.css"
import Grid from '@material-ui/core/Grid';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Stack from '@mui/material/Stack';
import MoreIcon from '@mui/icons-material/More';
import { Container } from '@material-ui/core';
import { BaseUrl } from 'AxiosInstance';

const DispYear = (props) => {
    return (
        <>
            <Grid container spacing={4} style={{ 'marginBottom': '20px', 'marginTop': '20px' }}>
                {props.data.map((item, index) => {
                    return (
                        <Flippy
                            key={index}
                            flipOnHover={true} // default false
                            flipOnClick={false} // default false
                            flipDirection="horizontal" // horizontal or vertical
                            style={{ width: '300px', height: '400px', marginRight: '10px', marginBottom: '10px', }} /// these are optional style, it is not necessary
                        >
                            <FrontSide style={{ backgroundColor:"white",backgroundImage: "url("+BaseUrl + "media/" + item['profilePic'] +")", color: 'white', marginLeft: '20px',backgroundSize:"contain",backgroundRepeat:"no-repeat",backgroundPosition:"center" }}>
                                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', padding: '10px', marginTop: '300px', background: 'linear-gradient(90deg, #041C32 0%, #406882 100%)', borderRadius: '20px' }}>{item.name}</div>
                            </FrontSide>
                            <BackSide style={{ background: 'linear-gradient(90deg, #041C32 0%, #406882 100%)', color: 'white', marginLeft: '20px' }}>
                                <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '20px', padding: '10px' }}>Branch : {item.branch}<br /><br />Company : {item.currentCompany}
                                    <br /><br />Skills : <ul>{item.skills.split(",").map((item, key) => {
                                        return <li style={{ fontWeight: 'bold', fontSize: '15px', padding: '2px' }} key={key}>{item}</li>
                                    })}</ul>
                                </div>



                                <Container>
                                    <Stack direction="row" spacing={4} alignItems="center" style={{ marginTop: '60px', }}>
                                        {item['githubProfile'] !== "" ?
                                            <a type="button" key={index} target="_blank" href={item['githubProfile']}><GitHubIcon fontSize='large' /></a> : null}
                                        {item['linkedInProfile'] !== "" ?
                                            <a type="button" key={index} target="_blank" href={item['linkedInProfile']}><LinkedInIcon fontSize='large' /></a> : null}
                                        {item['otherLinks'] !== "" ?
                                            <a type="button" key={index} target="_blank" href={item['otherLinks']}><MoreIcon fontSize='large' /></a> : null}
                                    </Stack>
                                </Container>



                            </BackSide>
                        </Flippy>
                    )
                })}



            </Grid>
        </>

    )
}

export default DispYear

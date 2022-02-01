import React, { useState } from 'react'
import { Button, Chip, FormControl, Grid, IconButton, InputAdornment, InputLabel, LinearProgress, makeStyles, MenuItem, Paper, Select, Snackbar, TextField, Typography } from '@material-ui/core'
import BackupIcon from '@material-ui/icons/Backup';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import CloseIcon from '@material-ui/icons/Close';
import axiosInstance from '../Axios';


function CreateProduct() {
    const classes = useStyles();
    const [productImage,setImage] = useState("");
    const [loaded,setLoaded] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [tagDetail, setTagDetail] = React.useState("");
    const [popupMsg,setPopupMsg] = useState();
    const handleDelete = (chipToDelete) => () => {
      setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    };
    const [chipData, setChipData] = React.useState([]);
    const [productDetails,setProductDetails] = useState(
      {
        title:"",
        description:"",
        price:"",
        category:"",
      }
    );

   const handleTagDetailChange=(event)=>{
     setTagDetail(event.target.value);
   }   

   const handleAddTag=()=>{
     if ((tagDetail).length===0){
       setPopupMsg("Please add a tag");
       setOpen(true);
     }
     else if(chipData.length>10){
      setPopupMsg("Tag limit reached");
      setOpen(true);
     }
     else{
    setChipData([...chipData,{key:chipData.length+1,label:tagDetail}]);
    setTagDetail('');
     }
   }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleImage=(event)=>{
        setImage({
            img:event.target.files[0],
        });
    }  
    
    const handleDetails = (event)=>{
        setProductDetails({
            ...productDetails,
            [event.target.name]:event.target.value,
        });
    }

    const handleSubmit =()=>{
        let formData = new FormData();
        let tag_string = "-";
        for(const chipX in chipData){
          tag_string = tag_string+"-"+chipData[chipX].label; 
        }
        formData.append('title',productDetails.title);
        formData.append('price',productDetails.price);
        formData.append('description',productDetails.description);
        formData.append('category',productDetails.category);
        formData.append('img',productImage.img);
        formData.append('tags',tag_string);
        axiosInstance.post("/productapi/",formData,{onUploadProgress:(event)=>{setLoaded(Math.round(event.loaded/event.total*100))}}).then((res)=>{
          setPopupMsg(res.data);
          setOpen(true);
          if(res.data!=='Product created successfully'){
            setLoaded(0);
          }
        });
        setOpen(true);
    }

    if(chipData!==undefined)
    return (
        <React.Fragment>
            <Paper elevation={6} style={{margin:'20px',padding:'10px',fontWeight:'500',textAlign:'center',color:'rgb(22,15,15)'}}>
            <Paper className={classes.header} elevation={2} style={{margin:'20px',padding:'10px',textAlign:'center'}}><Typography>PRODUCT DETAILS</Typography></Paper>
            <Grid container direction='row' spacing={2} justify="space-evenly">
                <Grid item xs={12} sm={6}>
                    <Grid container direction='column' alignItems='stretch' spacing={1}>
                        <Grid item><TextField name='title' onChange={handleDetails} fullWidth id="filled-basic" label="Title" variant="filled" /></Grid>
                        <Grid item><TextField name='price' onChange={handleDetails} fullWidth id="filled-basic" type='number' label="Price" variant="filled" InputProps={{startAdornment: <InputAdornment position="start">₹</InputAdornment>}}/></Grid>
                        <Grid item>
                        <FormControl fullWidth variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Category</InputLabel>
                        <Select name='category' onChange={handleDetails}>
                          <MenuItem value="electronics">Electronics</MenuItem>
                          <MenuItem value="sports">Sports</MenuItem>
                          <MenuItem value="mobiles">Mobiles</MenuItem>
                          <MenuItem value="grocery">Grocery</MenuItem>
                          <MenuItem value="fashion">Fashion</MenuItem>
                        </Select>
                        </FormControl>
                        </Grid> 
                        <Paper component="ul" className={classes.root}>
                          {chipData.length===0?<Typography>Please Add A Tag</Typography> : chipData.map((data) => {
                            return (
                              <li key={data.key}>
                                <Chip
                                  onDelete={handleDelete(data)}
                                  label={data.label}
                                  className={classes.chip}
                                />
                              </li>
                            );
                          })}
                          <br/>
                          </Paper>
                          <Grid item>
                            <TextField 
                              label='Add Tag' 
                              variant='filled' 
                              fullWidth 
                              value={tagDetail}
                              onChange={handleTagDetailChange}
                              InputProps={{endAdornment: <InputAdornment position="end"><Button size='small' onClick={handleAddTag}>ADD TAG</Button></InputAdornment>}}
                              />
                          </Grid>
                        <Grid item><Button fullWidth startIcon={<BackupIcon/>} variant="contained" component="label" onChange={handleImage}>Upload Image<input type="file" hidden/></Button></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={5}>
                <TextField name='description' onChange={handleDetails} fullWidth multiline label="Description" rows={8} variant="outlined"/>
                <Button onClick={handleSubmit} fullWidth startIcon={<AttachMoneyIcon/>} style={{margin:'8px 0px'}} component="label">Start Selling</Button>
                </Grid>
            </Grid>
            <hr/>
            <Grid container alignItems="center" spacing={2}>
            <Grid item xs={2} sm={1} md={1}>&nbsp; <BackupIcon/></Grid>
            <Grid item xs={8} sm={10} md={10}><LinearProgress variant='determinate' value={loaded}/></Grid>
            <Grid item xs={2} sm={1} md={1}>{loaded}%</Grid>
            </Grid>
            <hr/>
            </Paper>
        </React.Fragment>
    )
}

export default CreateProduct
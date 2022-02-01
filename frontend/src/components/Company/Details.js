import React from 'react'
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };

const Details = (props) => {
    return (
        <BootstrapDialog
        onClose={props.funcClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={props.funcClose} style={{fontWeight:'bold', fontFamily:'inherit'}}>
            Project Details
            </BootstrapDialogTitle>
            <DialogContent dividers style={{ color:'white',backgroundImage: "linear-gradient(to right, #142F43, #71DFE7)"}}>
                <Typography gutterBottom>
                    <Box style={{fontSize:'20px',fontfamily:'inherit'}}>{props.long}</Box>
                    <Box>{props.formLink}</Box>
                </Typography>
                {/* <Typography gutterBottom>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                    Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                </Typography>
                <Typography gutterBottom>
                    Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                    magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                    ullamcorper nulla non metus auctor fringilla.
                </Typography> */}
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={props.funcClose} style={{color:'white',backgroundColor:'#142F43'}}>
                Cool
            </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}

export default Details

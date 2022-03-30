import React from "react";
import { lazy } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LazyLoadComponent from 'components/common/LazyLoadComponent';
import { Grid } from '@material-ui/core';


let passcodeInput = React.createRef();
const divStyle = {
  
  backgroundColor: 'black',
 
};
const password_wrapper = {
  width:"100%",
  height:"100vh",
  position:"fixed",
  top:"0",
  left:"0",
  // opacity:"0.99",
  zIndex:"1500",
  background:"white",
  display:"flex",
  justifyContent: "center",
  alignItems: "center",
  

};

const MapContainer = lazy(() =>
  import(/* webpackChunkName: 'map-container' */ 'components/views/main/MapContainer')
);
const Sidebar = lazy(() =>
  import(/* webpackChunkName: 'sidebar' */ 'components/views/main/Sidebar')
);
const ErrorSnackbar = lazy(() =>
  import(/* webpackChunkName: 'error-snackbar' */ 'components/common/ErrorSnackbar')
);
function onSubmit8(e){
    console.log('change');
    console.log(passcodeInput.current.value);
    var val = passcodeInput.current.value;
    if(val == '123456'){
      var password_wrap = document.getElementById('password-wrapper');
      password_wrap.classList.add("d-none");
    }
}

const useStyles = makeStyles((theme) => ({
  main: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
}));

export default function Main() {
  const classes = useStyles();

  // [hygen] Add useEffect

  return (
  
    <Grid container direction='row' alignItems='stretch' item xs className={classes.main}>
      {/* <div style={divStyle}>Hello World!</div> */}
      <div id='password-wrapper' className='d-none' style={password_wrapper}>
        <div>
            <img className="img-fluid" src={'img/LEEP_RGB.png'}/>
            <input type="password" className="form-control" onChange={onSubmit8} ref={passcodeInput} placeholder="Enter the passcode"></input>
       </div>
    </div>
    
      <LazyLoadComponent>
      {/* <div style={password_wrapper}>
        <img className="img-fluid" src={'img/LEEP_RGP.png'}/>
        <input type="password" className="form-control col-md-6 col-8" placeholder="Enter the passcode"></input>

      </div> */}
        <MapContainer />
        <Sidebar />
        
        <ErrorSnackbar />
      </LazyLoadComponent>
    </Grid>
  );
}

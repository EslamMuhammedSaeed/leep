import React from "react";
import { useEffect, useState } from 'react';

import { BASEMAP_LAYER_ID } from 'components/layers/BasemapLayer';
import startups10Source from 'data/sources/startups10Source';
import { STARTUPS10_LAYER_ID } from 'components/layers/Startups10Layer';
import startups8Source from 'data/sources/startups8Source';
import { STARTUPS9_LAYER_ID } from 'components/layers/Startups9Layer';
import { STARTUPS11_LAYER_ID } from 'components/layers/Startups11Layer';

import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import {
  AppBar,
  Drawer,
  Divider,
  Hidden,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Link,
  makeStyles,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import SearchIcon from '@material-ui/icons/Search';
import { NavLink, useLocation } from 'react-router-dom';
import { ReactComponent as CartoLogo } from 'assets/img/carto-logo.svg';
import { ReactComponent as CartoLogoXS } from 'assets/img/carto-logo-xs.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@carto/react-redux';
import { ROUTE_PATHS } from 'routes';

const useStylesCommon = makeStyles((theme) => ({
  title: {
    '& h1': {
      display: 'flex',
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.common.white,

      '& strong': {
        marginRight: theme.spacing(0.5),
      },

      '& svg': {
        height: `${theme.typography.subtitle1.lineHeight}em`,
        marginRight: theme.spacing(1.5),
        width: 'auto',
        verticalAlign: 'bottom',
      },
    },
  },
}));

const useStyles = makeStyles((theme) => ({
  header: {
    boxShadow: 'none',
    zIndex: theme.zIndex.modal + 1,
    overflow: 'hidden',
  },
}));

const background_white = {
  background:"rgba(0,0,0,0)",
  color:"black",
  float:"right",
  width:"80%",
};
const card_header = {
  float:"right",
  fontWeight:"bold",
  fontSize:"14px",
};
const searchStyle = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  maxWidth:"200px",
  display:"inline",
  // color:"white"

};
const searchStyleMobile = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  fontSize:"12px",
  height:"30px",
  maxWidth:"200px",
  display:"inline",
  // color:"white"

};
const submitStyle = {
  background:"#2CA58D",
  color:"white",
  // border: "0",
  // borderBottom:"1px solid white",
  // maxWidth:"230px",
  display:"inline",
  marginLeft:"5px",
  marginBottom:"4px",
  // color:"white"

};
const submitStyleMobile = {
  background:"#2CA58D",
  color:"white",
  fontSize:"12px",
  // border: "0",
  // borderBottom:"1px solid white",
  // maxWidth:"230px",
  display:"inline",
  marginLeft:"5px",
  
  // color:"white"

};
let searchInput = React.createRef();
let searchInput3 = React.createRef();


export default function Header() {
  const classes = useStyles();
   

  return (
    <AppBar position='static' className={classes.header}>
      <Toolbar variant='dense'>
        <Mobile />
        <Desktop />
      </Toolbar>
    </AppBar>
  );
}

const useStylesDesktop = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(0, 3),
  },
}));

function Desktop() {
  const location = useLocation();
  const classes = {
    ...useStylesCommon(),
    ...useStylesDesktop(),
  };

  const pathname = location.pathname.split('/')[1];

  return (
    <Hidden xsDown>
      <Link component={NavLink} to={ROUTE_PATHS.DEFAULT} className={classes.title}>
        <Typography component='h1' variant='subtitle1' noWrap>
          <CartoLogo />
          <AppName />
        </Typography>
      </Link>
      <Divider orientation='vertical' className={classes.divider} light></Divider>
      <NavigationMenu pathname={pathname} />
      <Grid container item xs justifyContent='flex-end'>
        <UserMenu />
      </Grid>
    </Hidden>
  );
}

const useStylesMobile = makeStyles((theme) => ({
  menuButton: {
    margin: theme.spacing(0, 0.75, 0, -1.25),

    '& + hr': {
      marginRight: theme.spacing(1.5),
    },
  },
  drawer: {
    minWidth: 260,
  },
}));

function Mobile() {
  const dispatch = useDispatch();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  

  // const handleDrawerToggle = () => {
  //   setDrawerOpen(!drawerOpen);
  // };
  
  function onSubmit(e){
  // navigation.goBack();
  // console.log('hi');
  // setDrawerOpen(false); 
  // setDrawerOpen(!drawerOpen);
  
  console.log(searchInput3.current.value);
  var val = searchInput3.current.value;
  var val2 = capitalizeFirstLetter(val);
  console.log(val2);
  startups10Source.data=  "select cartodb_id, name, gov_name,sector ,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%')"  ;
  console.log(startups10Source.data);
  dispatch(
    addSource(startups10Source)
  );
  
  dispatch(
    addLayer({
      id: STARTUPS10_LAYER_ID,
      source: startups10Source.id,
    })
  );
  // navigate('/'+val);
  }
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const classes = {
    ...useStylesCommon(),
    ...useStylesMobile(),
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Hidden smUp>
      {/* <IconButton
        className={classes.menuButton}
        color='inherit'
        aria-label='menu'
        onClick={handleDrawerToggle}
      >
        {drawerOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton> */}
      <Divider orientation='vertical' light />
      <Link component={NavLink} to={ROUTE_PATHS.STARTUPS8} className={classes.title}>
        <Typography component='h1' variant='subtitle1' noWrap>
          <Hidden smUp>
            {/* <CartoLogoXS /> */}
            <span className="d-flex align-items-center mr-2">LOGO</span>
            <Divider orientation='vertical' light />
          </Hidden>
          {/* <AppName/> */}
          {/* <div className="pl-2 py-2 pt-md-0 d-flex align-items-end w-100">
            <div className="pr-2 ">
                  <input type="text" className=" mb-md-0 ml-md-4 form-control mr-0" style={searchStyleMobile} placeholder="search" ref={searchInput3} id='search' ></input>
            </div>
            <div className="">
                <button class="btn ml-md-2 ml-0 mr-1 pt-1" style={submitStyleMobile} onClick={onSubmit} >submit</button>
            </div>
          </div> */}
        </Typography>
        
      </Link>
      <Drawer
        variant='temporary'
        anchor='left'
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        PaperProps={{
          className: classes.drawer,
        }}
      >
        <Toolbar variant='dense' />
        <Grid container direction='column' justifyContent='space-between' item xs>
          <NavigationMenu column={true} />
          
        </Grid>
        
      </Drawer>
    </Hidden>
  );
}

function AppName() {
  return (
    <>
      {/* <img width={"47px"} src={'img/leep_logo.png'} /> */}
      {/* <strong>RISE</strong> Innovation Map */}
      
    </>
  );
}

const useStylesNavigationMenu = makeStyles((theme) => ({
  navTabs: {
    '& .MuiTabs-indicator': {
      // top:"0px",
      backgroundColor:
        "#2c3032",
        // theme.palette.appBar?.contrastText || theme.palette.primary?.contrastText,
    },
  },
}));

function NavigationMenu({ column: vertical }) {
  const location = useLocation();
  const classes = useStylesNavigationMenu();

  const dispatch = useDispatch();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const [drawerOpen, setDrawerOpen] = useState(false);
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  // const handleDrawerToggle = () => {
  //   setDrawerOpen(!drawerOpen);
  // };
  
  function onSubmit(e){
  // navigation.goBack();
  // console.log('hi');
  // setDrawerOpen(false); 
  // setDrawerOpen(!drawerOpen);
  
  console.log(searchInput.current.value);
  var val = searchInput.current.value;
  var val2 = capitalizeFirstLetter(val);
  console.log(val2);
  startups10Source.data=  "select cartodb_id, name, gov_name,sector ,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%')"  ;
  console.log(startups10Source.data);
  dispatch(
    addSource(startups10Source)
  );
  
  dispatch(
    addLayer({
      id: STARTUPS10_LAYER_ID,
      source: startups10Source.id,
    })
  );
  // navigate('/'+val);
  }

  const pathname = location.pathname.split('/')[1] || false;

  return (
    <Grid
      container
      direction={vertical ? 'column' : 'row'}
      className={!vertical ? classes.navTabs : ''}
    >
      <Tabs
        value={pathname}
        textColor={vertical ? 'primary' : 'inherit'}
        orientation={vertical ? 'vertical' : 'horizontal'}
        variant={vertical ? 'fullWidth' : 'standard'}
      >
        {/* <Tab label='Home' value='' component={NavLink} to={ROUTE_PATHS.DEFAULT} /> */}
        {/* [hygen] Import links */}
        {/* <Tab
          label='Startups'
          value='startups'
          component={NavLink}
          to={ROUTE_PATHS.STARTUPS}
          className={classes.navLink}
        />
        <Tab
          label='Startups2'
          value='startups2'
          component={NavLink}
          to={ROUTE_PATHS.STARTUPS2}
          className={classes.navLink}
        />
        <Tab
          label='Startups3'
          value='stratups3'
          component={NavLink}
          to={ROUTE_PATHS.STARTUPS3}
          className={classes.navLink}
        />
        <Tab
          label='Startups4'
          value='startups4'
          component={NavLink}
          to={ROUTE_PATHS.STARTUPS4}
          className={classes.navLink}
        /> */}
        {/* <Tab
          label='LEEP innovation map'
          value='startups5'
          component={NavLink}
          to={ROUTE_PATHS.STARTUPS5}
          className={classes.navLink}
        /> */}
        {/* <Tab
          label='Startups6'
          value='startups6'
          component={NavLink}
          to={ROUTE_PATHS.STARTUPS6}
          className={classes.navLink}
        /> */}
        <Tab
          label='Egypt Innovation Map'
          value='startups8'
          component={NavLink}
          to={ROUTE_PATHS.STARTUPS8}
          className={classes.navLink+" text-md-white text-decoration-none  text-white border-0"}
        />
      </Tabs>
      {/* <div className="row pl-2 pt-3 pt-md-0 d-none d-md-block">
        <div className="col-7 pr-0">
              <input type="text" className="mb-2 mb-md-0 ml-md-4 form-control mr-0" style={searchStyle} placeholder="search" ref={searchInput} id='search' ></input>
        </div>
        <div className="col-5">
             <button class="btn ml-md-2 ml-0 mr-1 " style={submitStyle} onClick={onSubmit}>submit</button>
        </div>
        
        
      </div> */}
      {/* <div className="border-0 pl-2 pr-0 row" style={background_white}>
             
              <input type="text col-8" className="mb-2 mb-md-0 ml-md-4 form-control" style={searchStyle} placeholder="search" ref={searchInput} id='search' ></input>
              <button class="btn ml-md-2 col-4 " style={submitStyle} onClick={onSubmit}>submit</button>
      </div> */}
    </Grid>
  );
}

const useStylesUserMenu = makeStyles((theme) => ({
  avatar: {
    cursor: 'pointer',
    width: theme.spacing(4.5),
    height: theme.spacing(4.5),
    marginLeft: theme.spacing(1),
  },
}));

function UserMenu() {
  const dispatch = useDispatch();
  const oauthApp = useSelector((state) => state.oauth.oauthApp);
  const user = useSelector((state) => state.oauth.userInfo);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStylesUserMenu();
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  
  // If no OAuthApp has been configured, no user-related controls are displayed
  // or
  // User is NOT logged in, so display nothing
  if (!oauthApp || !user) {
    return null;
  }

  // At this point, there is an oauthApp and the user has logged in (forceOAuthLogin mode).
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    if (!anchorEl) {
      setAnchorEl(event.currentTarget);
    } else {
      setAnchorEl(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };

  const goToCarto = () => {
    const url = user.api_endpoints.builder;
    window.open(url);
  };

  // Display User menu, with name, avatar + an attached menu for user-related options
  return (
    <>
      <Link
        edge='end'
        aria-label='account of current user'
        aria-controls='menu-login'
        aria-haspopup='true'
        onClick={handleMenu}
        color='inherit'
      >
        <Grid container alignItems='center' item wrap='nowrap'>
          <Hidden smDown>
            <Typography variant='caption' color='inherit' noWrap>
              {user.username}
            </Typography>
          </Hidden>
          <Avatar className={classes.avatar} src={user.avatar_url} />
        </Grid>
      </Link>
      <Menu
        id='menu-login'
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={goToCarto}>Go to CARTO</MenuItem>
      </Menu>
    </>
  );
}

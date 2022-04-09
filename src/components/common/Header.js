import React from "react";
import { useEffect, useState } from 'react';

import { BASEMAP_LAYER_ID } from 'components/layers/BasemapLayer';
import { UNEMPLOYMENT_LAYER_ID } from 'components/layers/UnemploymentLayer';
import startups10Source from 'data/sources/startups10Source';
import pollutionSource from 'data/sources/pollutionSource';
import { PUBLIC_INNOVATIONS_LAYER_ID } from 'components/layers/PublicInnovationsLayer';

// import startups13Source from 'data/sources/startups13Source';
// import { SDG_LAYER_ID } from 'components/layers/SdgLayer';
import startups14Source from 'data/sources/startups14Source';
import { SDG2_LAYER_ID } from 'components/layers/Sdg2Layer';
import sdGsSource from 'data/sources/sdGsSource';

import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';
import {
  AppBar,
  Drawer,
  
  Hidden,
  IconButton,
  Tab,
  Tabs,
  Toolbar,
  Link,
  
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
import { useSelector } from 'react-redux';
import { logout } from '@carto/react-redux';
import { ROUTE_PATHS } from 'routes';


import developmentSource from 'data/sources/developmentSource';
import { STARTUPS10_LAYER_ID } from 'components/layers/Startups10Layer';
import { POVERTY_LAYER_ID } from 'components/layers/PovertyLayer';
import { POPULATION_LAYER_ID } from 'components/layers/PopulationLayer';
import { HOUSEHOLD_LAYER_ID } from 'components/layers/HouseholdLayer';
import { HOUSEHOLD2_LAYER_ID } from 'components/layers/Household2Layer';
import { HOUSEHOLD3_LAYER_ID } from 'components/layers/Household3Layer';
import { HOUSEHOLD4_LAYER_ID } from 'components/layers/Household4Layer';
import { HOUSEHOLD5_LAYER_ID } from 'components/layers/Household5Layer';
import { HOUSEHOLD6_LAYER_ID } from 'components/layers/Household6Layer';
import { HOUSEHOLD7_LAYER_ID } from 'components/layers/Household7Layer';
import { HOUSEHOLD8_LAYER_ID } from 'components/layers/Household8Layer';
import { HOUSEHOLD9_LAYER_ID } from 'components/layers/Household9Layer';
import { HOUSEHOLD10_LAYER_ID } from 'components/layers/Household10Layer';
import { HOUSEHOLD11_LAYER_ID } from 'components/layers/Household11Layer';
import { HOUSEHOLD12_LAYER_ID } from 'components/layers/Household12Layer';
import { HOUSEHOLD13_LAYER_ID } from 'components/layers/Household13Layer';
import { POLLUTION_LAYER_ID } from 'components/layers/PollutionLayer';

import startups8Source from 'data/sources/startups8Source';
import { STARTUPS9_LAYER_ID } from 'components/layers/Startups9Layer';
import { STARTUPS11_LAYER_ID } from 'components/layers/Startups11Layer';
import { useDispatch } from 'react-redux';
import { getData } from 'data/models/model';
import { LegendWidget } from "@carto/react-widgets";
import { PieWidget } from "@carto/react-widgets";
import { HistogramWidget } from "@carto/react-widgets";


// import {
//   addLayer,
//   removeLayer,
//   addSource,
//   removeSource,
// } from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import { Divider } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget } from '@carto/react-widgets';
import { currencyFormatter } from 'utils/formatter';
// import { useNavigation } from '@react-navigation/native';
import {useNavigate} from 'react-router-dom';
// import {  useState } from 'react';
import { Sync } from "@material-ui/icons";
import exportFromJSON from 'export-from-json'
const sectors2 = [
  {name: 'Creative Industries'},
  {name2: 'Education'},
  {name: 'Environment'},
  {name2: 'Health'},
  {name: 'Inclusive Services & Technology'},
  {name2: 'Infrastructure & Transport'},
  {name: 'Tourism'},
  {name2: 'Other'},
];

var data = [{name: 'Creative Industries'},
{name2: 'Education'},
{name: 'Environment'},
{name2: 'Health'},
{name: 'Inclusive Services & Technology'},
{name2: 'Infrastructure & Transport'},
{name: 'Tourism'},
{name2: 'Other'},
]  
const fileName = 'Development_Data'  ;
const exportType = exportFromJSON.types.xls; 

// var sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
// var sql_main2 = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";




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

// const background_white = {
//   background:"rgba(0,0,0,0)",
//   color:"black",
//   float:"right",
//   width:"80%",
// };
const legendFloat={
  position:"fixed",
  right :"360px",
  top:"120px",
};
const exportButton={
  borderRadius :"0px",
  // position:"fixed",
  // right :"366px",
  // top:"54px",
  marginLeft:"10px",
  height:"34px",
  opacity:"0.8",
  fontSize:"13px"
};

const ignore = {
  width:"350px",
  height:"50px",
  

}
const sdg_float = {
  background:"rgb(255, 255, 255)",
  // position:"fixed",
  // top: "48px",
  // left: "0px",
  
  display:"flex",
  padding:"2px",
  paddingTop: "6px",
  paddingLeft:"5px",
  height:"50px",
  // width:window.innerWidth-350+"px",
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
const filters_wrap = {
  width:"99%",
  position:"fixed",
  display:"flex",
  top: "48px",
  left: "0px",
  background:"white",
  flexDirection:"row",
  zIndex:"800",
 
}
const searchStyle2 = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  fontFamily:'Arial',
  height:"20px",
  width:"200px",
  // height:"80px",
  display:"inline",
  background:"rgba(255, 255, 255, 0.356)",
  borderTop:"0px",
  borderRight:"0px",
  borderLeft:"0px",
  borderBottom:"0px",
  borderRadius:"0px",
  margin:"3px",
  fontSize:"12px"
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
const style2 ={
  multiselectContainer: { 
    marginLeft:"15px",
    margin:"0px 10px 10px 15px",
    width:"178px",
    background:"white",
    fontSize:"0.7rem",
    color:"black",
    // paddingRight:"20px"
  },
  searchBox: { // To change search box element look
    minHeight: "33px",
    width:"178px",
    fontSize:"0.8rem"
	
	
  },
  chips: {
     background: "#FAA63D",
     color: "white",
     whiteSpace: "normal",
     display:"none",
     
  }
  
}
const search_float2 = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  background:"rgba(255, 255, 255)",
  position:"fixed",
  bottom: "30px",
  right: "360px",
  padding:"7px",
  // width:"300px"
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
const background_white = {
  background:"rgba(255, 255, 255, 0.356)",
  color:"black"
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
let searchInput6 = React.createRef();
let searchInput6Public = React.createRef();


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
          {/* <CartoLogo /> */}
          <img src={'img/LEEP_white.png'}/>

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
  function onSubmit6(e){
    // navigation.goBack();
    console.log('hi');
    
    console.log(searchInput6.current.value);
    var val = searchInput6.current.value;
    var val2 = capitalizeFirstLetter(val);
    console.log(val2);
    var data1=  "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%') OR LOWER(gov_name) LIKE LOWER('%"+val+"%') OR LOWER(sector) LIKE LOWER('%"+val+"%') OR LOWER(sector_primary_secondary) LIKE LOWER('%"+val+"%') OR LOWER(sub_sector) LIKE LOWER('%"+val+"%') OR LOWER(description) LIKE LOWER('%"+val+"%') OR LOWER(website) LIKE LOWER('%"+val+"%') OR LOWER(facebook_link) LIKE LOWER('%"+val+"%') OR LOWER(country) LIKE LOWER('%"+val+"%') OR LOWER(full_address) LIKE LOWER('%"+val+"%')";
    var data2 = data1+ " OR LOWER(sdgs) LIKE LOWER('%"+val+"%') OR LOWER(innovation_type) LIKE LOWER('%"+val+"%') OR LOWER(innovation_stage) LIKE LOWER('%"+val+"%') OR LOWER(active_inactive_status) LIKE LOWER('%"+val+"%') OR LOWER(operation_cities_governorates) LIKE LOWER('%"+val+"%') OR LOWER(area_of_social_impact) LIKE LOWER('%"+val+"%') OR LOWER(organisation_phone_no) LIKE LOWER('%"+val+"%') OR LOWER(organisation_email) LIKE LOWER('%"+val+"%') OR LOWER(stage_investment_readiness) LIKE LOWER('%"+val+"%')";
    startups10Source.data=  data2;
    // startups10Source.data=  "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%') OR LOWER(gov_name) LIKE LOWER('%"+val+"%') OR LOWER(sector) LIKE LOWER('%"+val+"%') OR LOWER(innovation_type) LIKE LOWER('%"+val+"%')"  ;
    // console.log(startups10Source.data);
    dispatch(
      addSource(startups10Source)
    );
    dispatch(
      addLayer({
        id: STARTUPS10_LAYER_ID,
        source: startups10Source.id,
      })
    );
    }  
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
      <img className="mr-3" src={'img/LEEP_RGB2.png'}/>

      <Divider orientation='vertical' light />
      
      <Link component={NavLink} to={ROUTE_PATHS.STARTUPS8} className={classes.title}>
        <Typography component='h1' variant='subtitle1' noWrap>
          <Hidden smUp>
            {/* <CartoLogoXS /> */}
            <span className="text-white ml-3">Egypt Innovation Map</span>
            {/* <img src={'img/LEEP_white.png'}/> */}
            {/* <span className="d-flex align-items-center mr-2">LOGO</span> */}
            
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
  const sectors2 = [
    {name: 'Creative Industries'},
    {name2: 'Education'},
    {name: 'Environment'},
    {name2: 'Health'},
    {name: 'Inclusive Services & Technology'},
    {name2: 'Infrastructure & Transport'},
    {name: 'Tourism'},
    {name2: 'Other'},
  ];
  
  var data = [{name: 'Creative Industries'},
  {name2: 'Education'},
  {name: 'Environment'},
  {name2: 'Health'},
  {name: 'Inclusive Services & Technology'},
  {name2: 'Infrastructure & Transport'},
  {name: 'Tourism'},
  {name2: 'Other'},
  ]  
  var fileName2= 'Development_Data_Export';
  var fileName = 'Egypt_Innovation_Map_Export'  ;
  const exportType = exportFromJSON.types.xls; 
  
  // var sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  var sql_main = "select cartodb_id, sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,gov_name,innovation_stage,innovation_type,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  var sql_main2 = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  var sql_main_public ="select cartodb_id, sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,gov_name,innovation_stage,innovation_type,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  var sql_main_2_public ="select cartodb_id,gov_name_en,female_graduation_rate_in_high_school,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
  var global_data =[];
  const customFormatter = (value) => `${value} Years`;
  const sectors = [
    {name: 'Creative Industries', id: 1},
    {name: 'Education', id: 2},
    {name: 'Environment', id: 3},
    {name: 'Health', id: 4},
    {name: 'Inclusive Services & Technology', id: 5},
    {name: 'Infrastructure & Transport', id: 6},
    {name: 'Tourism', id: 7},
    {name: 'Other', id: 8},
    // {name: 'Health', id: 4},
  ];
  
  
  
  const innovation_type = [
    {name: 'For-profit enterprise', id: 1},
    {name: 'Nonprofit enterprise', id: 2},
    {name: 'Traditional SME', id: 3},
    {name: 'Micro-enterprise', id: 4},
    {name: 'Support organization', id: 5},
    {name: 'National awareness campaign', id: 6},
    {name: 'Local community initiative', id: 7},
    {name: 'Other', id: 8},
    // {name: 'Health', id: 4},
  ];
  const SDGs = [
    
    {name: 'GOAL 1: No Poverty', id: 1},
    {name: 'GOAL 2: Zero Hunger', id: 2},
    {name: 'GOAL 3: Good Health & Well-being', id: 3},
    {name: 'GOAL 4: Quality Education', id: 4},
    {name: 'GOAL 5: Gender Equality', id: 5},
    {name: 'GOAL 6: Clean Water and Sanitation', id: 6},
    {name: 'GOAL 7: Affordable and Clean Energy', id: 7},
    {name: 'GOAL 8: Decent Work and Economic Growth', id: 8},
    {name: 'GOAL 9: Industry, Innovation AND Infrastructure', id: 9},
    {name: 'GOAL 10: Reduced Inequalities', id: 10},
    {name: 'GOAL 11: Sustainable Cities and Communities', id: 11},
    {name: 'GOAL 12: Responsible Consumption and Production', id: 12},
    {name: 'GOAL 13: Climate Action', id: 13},
    {name: 'GOAL 14: Life Below Water', id: 14},
    {name: 'GOAL 15: Life On Land', id: 15},
    {name: 'GOAL 16: Peace, Justice and Strong Institutions', id: 16},
    {name: 'GOAL 17: Partnerships for the Goals', id: 17}, 
  ]
  const development_data = [
    
    {name: 'Access to Hospitals', id: 1},
    {name: 'Dropout in Preparatory Education', id: 2},
    {name: 'Dropout in Primary Education', id: 3},
    {name: 'Garbage', id: 4},
    {name: 'Access to Electricity', id: 5},
    {name: 'Access to Sewage', id: 6},
    {name: 'Access to Water', id: 7},
    {name: 'Illiteracy', id: 8},
    {name: 'Municipal Waste', id: 9},
    {name: 'Landline Phone Connectivity', id: 10},
    {name: 'Pollution', id: 11},
    {name: 'Population', id: 12},
    {name: 'Poverty', id: 13},
    {name: 'Total GDP', id: 14},
    {name: 'Unemployment', id: 15}, 
     
  ]
  
  const options = [
  {name: 'Alexandria', id: 1},
  {name: 'Assiut', id: 2},
  {name: 'Aswan', id: 3},
  {name: 'Bani Swif', id: 4},
  {name: 'Behera', id: 5},
  
  {name: 'Cairo', id: 6},
  {name: 'Dakahlia', id: 7},
  {name: 'Domiat', id: 8},
  {name: 'Fayoum', id: 9},
  {name: 'Gharbia', id: 10},
  {name: 'Giza', id: 11},
  {name: 'Ismailia', id: 12},
  {name: 'Kafr Sheikh', id: 13},
  {name: 'Luxor', id: 14},
  {name: 'Marsa Matrooh', id: 15},
  {name: 'Menia', id: 16},
  {name: 'Menoufia', id: 17},
  {name: 'New Valley', id: 18},
  {name: 'North Sinai', id: 19},
  {name: 'Port Said', id: 20},
  {name: 'Qaluobia', id: 21},
  {name: 'Qena', id: 22},
  {name: 'Red Sea', id: 23},
  {name: 'Sharkia', id: 24},
  {name: 'Sohag', id: 25},
  {name: 'South Sinai', id: 26},
  {name: 'Suez', id: 27}
  ];
  
  const ExportToExcel=async() =>{ 
    
    const credentials = {
      username: "riseegypt",
      apiKey: "7ecefb7b10b21eef2a24815d552b9bded4183933",
      serverUrlTemplate: 'https://riseegypt.carto.com'
    };
    const opts = {
      // format:"CSV"
    };
    console.log(sql_main_2_public);
    console.log(developmentSource.data);
    var query = developmentSource.data;
    query = developmentSource.data.replace(",the_geom_webmercator",'');
  if(developmentSource.data != 'development_data_dataset_final_review_12_2_2021'){
    const fetched_data = await getData({credentials, opts,query});
    data =fetched_data;
    fileName = 'Development_Data';
    exportFromJSON({ data, fileName, exportType });
  }
  query = sql_main;
  query = sql_main.replace(",the_geom_webmercator",'');
  query = query.replace("cartodb_id,",'');
  const fetched_data_2 = await getData({credentials, opts,query});
 
  data =fetched_data_2;
  // const fetched_data_2= await getData({credentials, opts,query2});
  fileName = 'Egypt_Innovation_Map_Export';
  // data = fetched_data_2;
  exportFromJSON({ data, fileName, exportType });
}

//===============================================public===========================================
const ExportToExcelPublic=async() =>{ 
    
  const credentials = {
    username: "riseegypt",
    apiKey: "7ecefb7b10b21eef2a24815d552b9bded4183933",
    serverUrlTemplate: 'https://riseegypt.carto.com'
  };
  const opts = {
    // format:"CSV"
  };
  
  var query = sql_main_public;
  query = sql_main_public.replace(",the_geom_webmercator",'');
  query = query.replace("cartodb_id,",'');

  var query2 = developmentSource.data;
  query2 = sql_main_public.replace(",the_geom_webmercator",'');
  query2 = query.replace("cartodb_id,",'');
  // query = startups10Source.data;
  // console.log(query);
  const fetched_data = await getData({credentials, opts,query});
  const fetched_data_2 = await getData({credentials, opts,query2});
  // console.log(fetched_data);
  data =fetched_data;
  const data2 = fetched_data_2;
  // console.log(global_data);
  // console.log(fetched_data[0]);
  // setGovern({
  //   fetched_data
  // });
  // console.log(data);
  // data=startups10Source.data;
  const fileName2= 'Development_Data_Export'

exportFromJSON({ data, fileName, exportType });
exportFromJSON({ data2, fileName2, exportType });
}
const governOnSelectHandler2 = (selectedList, selectedItem)=>{

  if(sql_main_public.indexOf("WHERE (gov_name")>0 || sql_main_public.indexOf("WHERE(gov_name")>0){
    var index = sql_main_public.indexOf("(gov_name");
    sql_main_public = insert(sql_main_public,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main_public);
    // sql_main=sql_main+" WHERE sector='"+selectedItem.name+"'";
  }
  else if(sql_main_public.indexOf("WHERE( gov_name")>0){
    var index = sql_main_public.indexOf("( gov_name");
    sql_main_public = insert(sql_main_public,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main_public);
    
  }else if(sql_main_public.indexOf("WHERE ( gov_name")>0){
    var index = sql_main_public.indexOf("( gov_name");
    sql_main = insert(sql_main_public,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main_public);
    
  }else if(sql_main_public.indexOf("gov_name=")>0){
    var index = sql_main_public.indexOf("(gov_name");
    sql_main_public = insert(sql_main_public,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main_public);
  }else if(sql_main_public.indexOf("WHERE")>0){
    sql_main_public=sql_main_public+"AND (gov_name='"+selectedItem.name+"')";
    console.log(sql_main_public);
  }else{
    sql_main_public=sql_main_public+" WHERE (gov_name='"+selectedItem.name+"')";
    console.log(sql_main_public);
  }
        startups10Source.data=  sql_main_public;
        dispatch(
          addSource(startups10Source)
        );
    
        dispatch(
          addLayer({
            id: PUBLIC_INNOVATIONS_LAYER_ID,
            source: startups10Source.id,
          })
        );
};

function governOnRemoveHandler2(selectedList, selectedItem){
       
  console.log(selectedList);
  console.log(selectedItem.name);
  var sql ="";

  console.log(sql_main_public);
  sql_main_public = sql_main_public.replace(" OR gov_name='"+selectedItem.name+"'",'');
  sql_main_public = sql_main_public.replace(" OR gov_name ='"+selectedItem.name+"'",'');
  sql_main_public = sql_main_public.replace("gov_name='"+selectedItem.name+"'",'');
  sql_main_public = sql_main_public.replace("gov_name ='"+selectedItem.name+"'",'');
  sql_main_public = sql_main_public.replace("egypt_si_dataset_final_review_16112021   AND",'egypt_si_dataset_final_review_16112021   WHERE');

  sql_main_public = sql_main_public.replace("16112021AND",'16112021 WHERE');    
  
  
  
  
  sql_main_public = sql_main_public.replace(" WHERE ()",'');
  sql_main_public = sql_main_public.replace(" WHERE ( )",'');
  sql_main_public = sql_main_public.replace(" WHERE (  )",'');
  sql_main_public = sql_main_public.replace(" WHERE (   )",'');
  sql_main_public = sql_main_public.replace(" WHERE()",'');
  sql_main_public = sql_main_public.replace(" WHERE( )",'');
  sql_main_public = sql_main_public.replace(" WHERE(  )",'');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace(" OR OR",'OR');
  sql_main_public = sql_main_public.replace("WHERE OR",'WHERE');
  sql_main_public = sql_main_public.replace("WHERE (  OR ",'WHERE (');
  sql_main_public = sql_main_public.replace("OR  )",')');
  sql_main_public = sql_main_public.replace("OR  ",'OR ');
  sql_main_public = sql_main_public.replace("  OR",' OR');
  sql_main_public = sql_main_public.replace("16112021AND",'16112021 WHERE');
  sql_main_public = sql_main_public.replace("AND ( )",'');
  
 
  // if(sql_main_public.indexOf("gov_name=")>0)
  if(sql_main_public == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
    sql_main_public = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  }
  if(sql_main_public == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
    sql_main_public = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  }
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace(" OR OR",'OR');
  sql_main_public = sql_main_public.replace("AND ()",'');
  sql_main_public = sql_main_public.replace("AND ( )",'');
  sql_main_public = sql_main_public.replace(" AND ()",'');
  sql_main_public = sql_main_public.replace(" AND ( )",'');
  sql_main_public = sql_main_public.replace(" AND()",'');
  sql_main_public = sql_main_public.replace(" AND( )",'');
  sql_main_public = sql_main_public.replace(" AND(  )",'');
  console.log("removed");
  console.log(sql_main_public);

  
  startups10Source.data=  sql_main_public;
  dispatch(
    addSource(startups10Source)
  );

  dispatch(
    addLayer({
      id: PUBLIC_INNOVATIONS_LAYER_ID,
      source: startups10Source.id,
    })
  );
};

// function insert(main_string, ins_string, pos) {
// if(typeof(pos) == "undefined") {
//    pos = 0;
// }
// if(typeof(ins_string) == "undefined") {
//    ins_string = '';
// }
// return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
// }
function sectorOnSelectHandler2(selectedList, selectedItem){

//  console.log(selectedList);
//  var govern = selectedList[0].name;
if(sql_main_public.indexOf("WHERE (sector")>0|| sql_main_public.indexOf("WHERE(sector")>0|| sql_main_public.indexOf("WHERE( sector")>0){
var index = sql_main_public.indexOf("(sector");
sql_main_public = insert(sql_main_public,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main_public);
// sql_main_public=sql_main_public+" WHERE sector='"+selectedItem.name+"'";
}else if(sql_main_public.indexOf("WHERE( sector")>0){
var index = sql_main_public.indexOf("( sector");
sql_main_public = insert(sql_main_public,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main_public);

}else if(sql_main_public.indexOf("WHERE ( sector")>0){
var index = sql_main_public.indexOf("( sector");
sql_main_public = insert(sql_main_public,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main_public);

}else if(sql_main_public.indexOf("sector=")>0){
var index = sql_main_public.indexOf("(sector");
sql_main_public = insert(sql_main_public,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main_public);
}else if(sql_main_public.indexOf("WHERE")>0){
sql_main_public=sql_main_public+"AND (sector='"+selectedItem.name+"')";
console.log(sql_main_public);
}else{
sql_main_public=sql_main_public+" WHERE (sector='"+selectedItem.name+"')";
console.log(sql_main_public);
}
//  var sector_no = selectedList.length;
//  var sql="select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
//  for (let i = 0; i < sector_no; i++) {
//      if(i==0){
//        sql = sql+selectedList[i].name+"'";
//      }else{
//        sql = sql+"OR sector ='"+selectedList[i].name+"'";
//      }
 
//  }
//  console.log(sql);
startups10Source.data=  sql_main_public;
dispatch(
addSource(startups10Source)
);

dispatch(
addLayer({
 id: PUBLIC_INNOVATIONS_LAYER_ID,
 source: startups10Source.id,
})
);
};

function SDGsOnSelectHandler2(selectedList, selectedItem){

//  console.log(selectedList);
//  var govern = selectedList[0].name;
if(sql_main_public.indexOf("WHERE (sdgs")>0|| sql_main_public.indexOf("WHERE(sdgs")>0|| sql_main_public.indexOf("WHERE( sdgs")>0){
var index = sql_main_public.indexOf("(sdgs");
sql_main_public = insert(sql_main_public,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
//LOWER(name) LIKE LOWER('%"+val+"%')
console.log(sql_main_public);
// sql_main_public=sql_main_public+" WHERE sector='"+selectedItem.name+"'";
}else if(sql_main_public.indexOf("WHERE( LOWER(sdgs)")>0){
  var index = sql_main_public.indexOf("( LOWER(sdgs)");
  sql_main_public = insert(sql_main_public,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
  console.log(sql_main_public);
  
}else if(sql_main_public.indexOf("WHERE ( LOWER(sdgs)")>0){
  var index = sql_main_public.indexOf("( LOWER(sdgs)");
  sql_main_public = insert(sql_main_public,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
  console.log(sql_main_public);
  
}else if(sql_main_public.indexOf("LOWER(sdgs)")>0){
var index = sql_main_public.indexOf("(LOWER(sdgs)");
sql_main_public = insert(sql_main_public,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
console.log(sql_main_public);
}else if(sql_main_public.indexOf("WHERE")>0){
sql_main_public=sql_main_public+"AND (LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%'))";
console.log(sql_main_public);
}else{
sql_main_public=sql_main_public+" WHERE (LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%'))";
console.log(sql_main_public);
}
//  var sector_no = selectedList.length;
//  var sql="select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
//  for (let i = 0; i < sector_no; i++) {
//      if(i==0){
//        sql = sql+selectedList[i].name+"'";
//      }else{
//        sql = sql+"OR sector ='"+selectedList[i].name+"'";
//      }
   
//  }
//  console.log(sql);
startups10Source.data=  sql_main_public;
dispatch(
 addSource(startups10Source)
);

dispatch(
 addLayer({
   id: PUBLIC_INNOVATIONS_LAYER_ID,
   source: startups10Source.id,
 })
);
};

function sectorOnRemoveHandler2(selectedList, selectedItem){
   
console.log(selectedList);
console.log(selectedItem.name);
var sql ="";

console.log(sql_main_public);
sql_main_public = sql_main_public.replace(" OR sector='"+selectedItem.name+"'",'');
sql_main_public = sql_main_public.replace(" OR sector ='"+selectedItem.name+"'",'');
sql_main_public = sql_main_public.replace("sector='"+selectedItem.name+"'",'');
sql_main_public = sql_main_public.replace("sector ='"+selectedItem.name+"'",'');
sql_main_public = sql_main_public.replace("egypt_si_dataset_final_review_16112021   AND",'egypt_si_dataset_final_review_16112021   WHERE');

  sql_main_public = sql_main_public.replace("16112021AND",'16112021 WHERE');    
  
  
  
  sql_main_public = sql_main_public.replace(" AND ()",'');
  sql_main_public = sql_main_public.replace(" AND ( )",'');
  sql_main_public = sql_main_public.replace(" AND()",'');
  sql_main_public = sql_main_public.replace(" AND( )",'');
  sql_main_public = sql_main_public.replace(" AND(  )",'');
  sql_main_public = sql_main_public.replace(" WHERE ()",'');
  sql_main_public = sql_main_public.replace(" WHERE ( )",'');
  sql_main_public = sql_main_public.replace(" WHERE (  )",'');
  sql_main_public = sql_main_public.replace(" WHERE (   )",'');
  sql_main_public = sql_main_public.replace(" WHERE()",'');
  sql_main_public = sql_main_public.replace(" WHERE( )",'');
  sql_main_public = sql_main_public.replace(" WHERE(  )",'');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace(" OR OR",'OR');
  sql_main_public = sql_main_public.replace("WHERE OR",'WHERE');
  sql_main_public = sql_main_public.replace("WHERE (  OR ",'WHERE (');
  sql_main_public = sql_main_public.replace("OR  )",')');
  sql_main_public = sql_main_public.replace("OR  ",'OR ');
  sql_main_public = sql_main_public.replace("  OR",' OR');
  sql_main_public = sql_main_public.replace("16112021AND",'16112021 WHERE');
  sql_main_public = sql_main_public.replace("AND ( )",'');
  
  // if(sql_main_public.indexOf("gov_name=")>0)
if(sql_main_public == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
  sql_main_public = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}
if(sql_main_public == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
  sql_main_public = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}
sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace(" OR OR",'OR');
sql_main_public = sql_main_public.replace("AND ()",'');
sql_main_public = sql_main_public.replace("AND ( )",'');
sql_main_public = sql_main_public.replace(" AND ()",'');
  sql_main_public = sql_main_public.replace(" AND ( )",'');
  sql_main_public = sql_main_public.replace(" AND()",'');
  sql_main_public = sql_main_public.replace(" AND( )",'');
  sql_main_public = sql_main_public.replace(" AND(  )",'');
console.log("removed");
console.log(sql_main_public);


startups10Source.data=  sql_main_public;
dispatch(
  addSource(startups10Source)
);

dispatch(
  addLayer({
    id: PUBLIC_INNOVATIONS_LAYER_ID,
    source: startups10Source.id,
  })
);
};
function SDGsOnRemoveHandler2(selectedList, selectedItem){
   
console.log(selectedList);
console.log(selectedItem.name);
var sql ="";

console.log(sql_main_public);
sql_main_public = sql_main_public.replace("LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%')",'');
sql_main_public = sql_main_public.replace(" OR LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%')",'');
sql_main_public = sql_main_public.replace("LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%')",'');
// sql_main_public = sql_main_public.replace("sector ='"+selectedItem.name+"'",'');
sql_main_public = sql_main_public.replace("egypt_si_dataset_final_review_16112021   AND",'egypt_si_dataset_final_review_16112021   WHERE');

  sql_main_public = sql_main_public.replace("16112021AND",'16112021 WHERE');    
  
  
  
  sql_main_public = sql_main_public.replace(" AND ()",'');
  sql_main_public = sql_main_public.replace(" AND ( )",'');
  sql_main_public = sql_main_public.replace(" AND()",'');
  sql_main_public = sql_main_public.replace(" AND( )",'');
  sql_main_public = sql_main_public.replace(" AND(  )",'');
  sql_main_public = sql_main_public.replace(" WHERE ()",'');
  sql_main_public = sql_main_public.replace(" WHERE ( )",'');
  sql_main_public = sql_main_public.replace(" WHERE (  )",'');
  sql_main_public = sql_main_public.replace(" WHERE (   )",'');
  sql_main_public = sql_main_public.replace(" WHERE()",'');
  sql_main_public = sql_main_public.replace(" WHERE( )",'');
  sql_main_public = sql_main_public.replace(" WHERE(  )",'');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace(" OR OR",'OR');
  sql_main_public = sql_main_public.replace("WHERE OR",'WHERE');
  sql_main_public = sql_main_public.replace("WHERE (  OR ",'WHERE (');
  sql_main_public = sql_main_public.replace("OR  )",')');
  sql_main_public = sql_main_public.replace("OR  ",'OR ');
  sql_main_public = sql_main_public.replace("  OR",' OR');
  sql_main_public = sql_main_public.replace("16112021AND",'16112021 WHERE');
  sql_main_public = sql_main_public.replace("AND ( )",'');
  
  // if(sql_main_public.indexOf("gov_name=")>0)
if(sql_main_public == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
  sql_main_public = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}
if(sql_main_public == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
  sql_main_public = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}

sql_main_public = sql_main_public.replace("OR )",')');
sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace("( OR",'(');
  sql_main_public = sql_main_public.replace(" OR OR",'OR');
sql_main_public = sql_main_public.replace("AND ()",'');
sql_main_public = sql_main_public.replace("AND ( )",'');
sql_main_public = sql_main_public.replace(" AND ()",'');
  sql_main_public = sql_main_public.replace(" AND ( )",'');
  sql_main_public = sql_main_public.replace(" AND()",'');
  sql_main_public = sql_main_public.replace(" AND( )",'');
  sql_main_public = sql_main_public.replace(" AND(  )",'');
  sql_main_public = sql_main_public.replace("( OR",'(');
console.log("removed");
console.log(sql_main_public);


startups10Source.data=  sql_main_public;
dispatch(
  addSource(startups10Source)
);

dispatch(
  addLayer({
    id: PUBLIC_INNOVATIONS_LAYER_ID,
    source: startups10Source.id,
  })
);
};


  function onSubmit6Public(e){
    
    var val = searchInput6Public.current.value;
    var val2 = capitalizeFirstLetter(val);
    var data1=  "select cartodb_id, sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,gov_name,innovation_stage,innovation_type,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(gov_name) LIKE LOWER('%"+val+"%') OR LOWER(sector) LIKE LOWER('%"+val+"%') OR LOWER(sector_primary_secondary) LIKE LOWER('%"+val+"%') OR LOWER(sub_sector) LIKE LOWER('%"+val+"%')";
    var data2 = data1+ " OR LOWER(sdgs) LIKE LOWER('%"+val+"%') OR LOWER(innovation_type) LIKE LOWER('%"+val+"%') OR LOWER(innovation_stage) LIKE LOWER('%"+val+"%') OR LOWER(stage_investment_readiness) LIKE LOWER('%"+val+"%')";
    startups10Source.data=  data2;
    
    dispatch(
      addSource(startups10Source)
    );
    dispatch(
      addLayer({
        id: PUBLIC_INNOVATIONS_LAYER_ID,
        source: startups10Source.id,
      })
    );
    }
//=============================================end of public===============================================
const governOnSelectHandler = (selectedList, selectedItem)=>{

  if(sql_main.indexOf("WHERE (gov_name")>0 || sql_main.indexOf("WHERE(gov_name")>0){
    var index = sql_main.indexOf("(gov_name");
    sql_main = insert(sql_main,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main);
    // sql_main=sql_main+" WHERE sector='"+selectedItem.name+"'";
  }
  else if(sql_main.indexOf("WHERE( gov_name")>0){
    var index = sql_main.indexOf("( gov_name");
    sql_main = insert(sql_main,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main);
    
  }else if(sql_main.indexOf("WHERE ( gov_name")>0){
    var index = sql_main.indexOf("( gov_name");
    sql_main = insert(sql_main,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main);
    
  }else if(sql_main.indexOf("gov_name=")>0){
    var index = sql_main.indexOf("(gov_name");
    sql_main = insert(sql_main,"gov_name='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main);
  }else if(sql_main.indexOf("WHERE")>0){
    sql_main=sql_main+"AND (gov_name='"+selectedItem.name+"')";
    console.log(sql_main);
  }else{
    sql_main=sql_main+" WHERE (gov_name='"+selectedItem.name+"')";
    console.log(sql_main);
  }
        startups10Source.data=  sql_main;
        dispatch(
          addSource(startups10Source)
        );
    
        dispatch(
          addLayer({
            id: STARTUPS10_LAYER_ID,
            source: startups10Source.id,
          })
        );
};

function governOnRemoveHandler(selectedList, selectedItem){
       
  console.log(selectedList);
  console.log(selectedItem.name);
  var sql ="";

  console.log(sql_main);
  sql_main = sql_main.replace(" OR gov_name='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace(" OR gov_name ='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace("gov_name='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace("gov_name ='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace("egypt_si_dataset_final_review_16112021   AND",'egypt_si_dataset_final_review_16112021   WHERE');

  sql_main = sql_main.replace("16112021AND",'16112021 WHERE');    
  
  
  
  
  sql_main = sql_main.replace(" WHERE ()",'');
  sql_main = sql_main.replace(" WHERE ( )",'');
  sql_main = sql_main.replace(" WHERE (  )",'');
  sql_main = sql_main.replace(" WHERE (   )",'');
  sql_main = sql_main.replace(" WHERE()",'');
  sql_main = sql_main.replace(" WHERE( )",'');
  sql_main = sql_main.replace(" WHERE(  )",'');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace(" OR OR",'OR');
  sql_main = sql_main.replace("WHERE OR",'WHERE');
  sql_main = sql_main.replace("WHERE (  OR ",'WHERE (');
  sql_main = sql_main.replace("OR  )",')');
  sql_main = sql_main.replace("OR  ",'OR ');
  sql_main = sql_main.replace("  OR",' OR');
  sql_main = sql_main.replace("16112021AND",'16112021 WHERE');
  sql_main = sql_main.replace("AND ( )",'');
  
 
  // if(sql_main.indexOf("gov_name=")>0)
  if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
    sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  }
  if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
    sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  }
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace(" OR OR",'OR');
  sql_main = sql_main.replace("AND ()",'');
  sql_main = sql_main.replace("AND ( )",'');
  sql_main = sql_main.replace(" AND ()",'');
  sql_main = sql_main.replace(" AND ( )",'');
  sql_main = sql_main.replace(" AND()",'');
  sql_main = sql_main.replace(" AND( )",'');
  sql_main = sql_main.replace(" AND(  )",'');
  console.log("removed");
  console.log(sql_main);

  
  startups10Source.data=  sql_main;
  dispatch(
    addSource(startups10Source)
  );

  dispatch(
    addLayer({
      id: STARTUPS10_LAYER_ID,
      source: startups10Source.id,
    })
  );
};

function insert(main_string, ins_string, pos) {
if(typeof(pos) == "undefined") {
   pos = 0;
}
if(typeof(ins_string) == "undefined") {
   ins_string = '';
}
return main_string.slice(0, pos) + ins_string + main_string.slice(pos);
}
function sectorOnSelectHandler(selectedList, selectedItem){

//  console.log(selectedList);
//  var govern = selectedList[0].name;
if(sql_main.indexOf("WHERE (sector")>0|| sql_main.indexOf("WHERE(sector")>0|| sql_main.indexOf("WHERE( sector")>0){
var index = sql_main.indexOf("(sector");
sql_main = insert(sql_main,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main);
// sql_main=sql_main+" WHERE sector='"+selectedItem.name+"'";
}else if(sql_main.indexOf("WHERE( sector")>0){
var index = sql_main.indexOf("( sector");
sql_main = insert(sql_main,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main);

}else if(sql_main.indexOf("WHERE ( sector")>0){
var index = sql_main.indexOf("( sector");
sql_main = insert(sql_main,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main);

}else if(sql_main.indexOf("sector=")>0){
var index = sql_main.indexOf("(sector");
sql_main = insert(sql_main,"sector='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main);
}else if(sql_main.indexOf("WHERE")>0){
sql_main=sql_main+"AND (sector='"+selectedItem.name+"')";
console.log(sql_main);
}else{
sql_main=sql_main+" WHERE (sector='"+selectedItem.name+"')";
console.log(sql_main);
}
//  var sector_no = selectedList.length;
//  var sql="select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
//  for (let i = 0; i < sector_no; i++) {
//      if(i==0){
//        sql = sql+selectedList[i].name+"'";
//      }else{
//        sql = sql+"OR sector ='"+selectedList[i].name+"'";
//      }
 
//  }
//  console.log(sql);
startups10Source.data=  sql_main;
dispatch(
addSource(startups10Source)
);

dispatch(
addLayer({
 id: STARTUPS10_LAYER_ID,
 source: startups10Source.id,
})
);
};

function SDGsOnSelectHandler(selectedList, selectedItem){

//  console.log(selectedList);
//  var govern = selectedList[0].name;
if(sql_main.indexOf("WHERE (sdgs")>0|| sql_main.indexOf("WHERE(sdgs")>0|| sql_main.indexOf("WHERE( sdgs")>0){
var index = sql_main.indexOf("(sdgs");
sql_main = insert(sql_main,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
//LOWER(name) LIKE LOWER('%"+val+"%')
console.log(sql_main);
// sql_main=sql_main+" WHERE sector='"+selectedItem.name+"'";
}else if(sql_main.indexOf("WHERE( LOWER(sdgs)")>0){
  var index = sql_main.indexOf("( LOWER(sdgs)");
  sql_main = insert(sql_main,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
  console.log(sql_main);
  
}else if(sql_main.indexOf("WHERE ( LOWER(sdgs)")>0){
  var index = sql_main.indexOf("( LOWER(sdgs)");
  sql_main = insert(sql_main,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
  console.log(sql_main);
  
}else if(sql_main.indexOf("LOWER(sdgs)")>0){
var index = sql_main.indexOf("(LOWER(sdgs)");
sql_main = insert(sql_main,"LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%') OR ",index+1); 
console.log(sql_main);
}else if(sql_main.indexOf("WHERE")>0){
sql_main=sql_main+"AND (LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%'))";
console.log(sql_main);
}else{
sql_main=sql_main+" WHERE (LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%'))";
console.log(sql_main);
}
//  var sector_no = selectedList.length;
//  var sql="select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
//  for (let i = 0; i < sector_no; i++) {
//      if(i==0){
//        sql = sql+selectedList[i].name+"'";
//      }else{
//        sql = sql+"OR sector ='"+selectedList[i].name+"'";
//      }
   
//  }
//  console.log(sql);
startups10Source.data=  sql_main;
dispatch(
 addSource(startups10Source)
);

dispatch(
 addLayer({
   id: STARTUPS10_LAYER_ID,
   source: startups10Source.id,
 })
);
};

function sectorOnRemoveHandler(selectedList, selectedItem){
   
console.log(selectedList);
console.log(selectedItem.name);
var sql ="";

console.log(sql_main);
sql_main = sql_main.replace(" OR sector='"+selectedItem.name+"'",'');
sql_main = sql_main.replace(" OR sector ='"+selectedItem.name+"'",'');
sql_main = sql_main.replace("sector='"+selectedItem.name+"'",'');
sql_main = sql_main.replace("sector ='"+selectedItem.name+"'",'');
sql_main = sql_main.replace("egypt_si_dataset_final_review_16112021   AND",'egypt_si_dataset_final_review_16112021   WHERE');

  sql_main = sql_main.replace("16112021AND",'16112021 WHERE');    
  
  
  
  sql_main = sql_main.replace(" AND ()",'');
  sql_main = sql_main.replace(" AND ( )",'');
  sql_main = sql_main.replace(" AND()",'');
  sql_main = sql_main.replace(" AND( )",'');
  sql_main = sql_main.replace(" AND(  )",'');
  sql_main = sql_main.replace(" WHERE ()",'');
  sql_main = sql_main.replace(" WHERE ( )",'');
  sql_main = sql_main.replace(" WHERE (  )",'');
  sql_main = sql_main.replace(" WHERE (   )",'');
  sql_main = sql_main.replace(" WHERE()",'');
  sql_main = sql_main.replace(" WHERE( )",'');
  sql_main = sql_main.replace(" WHERE(  )",'');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace(" OR OR",'OR');
  sql_main = sql_main.replace("WHERE OR",'WHERE');
  sql_main = sql_main.replace("WHERE (  OR ",'WHERE (');
  sql_main = sql_main.replace("OR  )",')');
  sql_main = sql_main.replace("OR  ",'OR ');
  sql_main = sql_main.replace("  OR",' OR');
  sql_main = sql_main.replace("16112021AND",'16112021 WHERE');
  sql_main = sql_main.replace("AND ( )",'');
  
  // if(sql_main.indexOf("gov_name=")>0)
if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
  sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}
if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
  sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}
sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace(" OR OR",'OR');
sql_main = sql_main.replace("AND ()",'');
sql_main = sql_main.replace("AND ( )",'');
sql_main = sql_main.replace(" AND ()",'');
  sql_main = sql_main.replace(" AND ( )",'');
  sql_main = sql_main.replace(" AND()",'');
  sql_main = sql_main.replace(" AND( )",'');
  sql_main = sql_main.replace(" AND(  )",'');
console.log("removed");
console.log(sql_main);


startups10Source.data=  sql_main;
dispatch(
  addSource(startups10Source)
);

dispatch(
  addLayer({
    id: STARTUPS10_LAYER_ID,
    source: startups10Source.id,
  })
);
};
function SDGsOnRemoveHandler(selectedList, selectedItem){
   
console.log(selectedList);
console.log(selectedItem.name);
var sql ="";

console.log(sql_main);
sql_main = sql_main.replace("LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%')",'');
sql_main = sql_main.replace(" OR LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%')",'');
sql_main = sql_main.replace("LOWER(sdgs) LIKE LOWER('% "+selectedItem.id+",%')",'');
// sql_main = sql_main.replace("sector ='"+selectedItem.name+"'",'');
sql_main = sql_main.replace("egypt_si_dataset_final_review_16112021   AND",'egypt_si_dataset_final_review_16112021   WHERE');

  sql_main = sql_main.replace("16112021AND",'16112021 WHERE');    
  
  
  
  sql_main = sql_main.replace(" AND ()",'');
  sql_main = sql_main.replace(" AND ( )",'');
  sql_main = sql_main.replace(" AND()",'');
  sql_main = sql_main.replace(" AND( )",'');
  sql_main = sql_main.replace(" AND(  )",'');
  sql_main = sql_main.replace(" WHERE ()",'');
  sql_main = sql_main.replace(" WHERE ( )",'');
  sql_main = sql_main.replace(" WHERE (  )",'');
  sql_main = sql_main.replace(" WHERE (   )",'');
  sql_main = sql_main.replace(" WHERE()",'');
  sql_main = sql_main.replace(" WHERE( )",'');
  sql_main = sql_main.replace(" WHERE(  )",'');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace(" OR OR",'OR');
  sql_main = sql_main.replace("WHERE OR",'WHERE');
  sql_main = sql_main.replace("WHERE (  OR ",'WHERE (');
  sql_main = sql_main.replace("OR  )",')');
  sql_main = sql_main.replace("OR  ",'OR ');
  sql_main = sql_main.replace("  OR",' OR');
  sql_main = sql_main.replace("16112021AND",'16112021 WHERE');
  sql_main = sql_main.replace("AND ( )",'');
  
  // if(sql_main.indexOf("gov_name=")>0)
if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
  sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}
if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
  sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
}

sql_main = sql_main.replace("OR )",')');
sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace("( OR",'(');
  sql_main = sql_main.replace(" OR OR",'OR');
sql_main = sql_main.replace("AND ()",'');
sql_main = sql_main.replace("AND ( )",'');
sql_main = sql_main.replace(" AND ()",'');
  sql_main = sql_main.replace(" AND ( )",'');
  sql_main = sql_main.replace(" AND()",'');
  sql_main = sql_main.replace(" AND( )",'');
  sql_main = sql_main.replace(" AND(  )",'');
  sql_main = sql_main.replace("( OR",'(');
console.log("removed");
console.log(sql_main);


startups10Source.data=  sql_main;
dispatch(
  addSource(startups10Source)
);

dispatch(
  addLayer({
    id: STARTUPS10_LAYER_ID,
    source: startups10Source.id,
  })
);
};

function innovationTypeOnSelectHandler(selectedList, selectedItem){

//  console.log(selectedList);
//  var govern = selectedList[0].name;
if(sql_main.indexOf("WHERE (innovation_type")>0|| sql_main.indexOf("WHERE(innovation_type")>0|| sql_main.indexOf("WHERE( innovation_type")>0){
var index = sql_main.indexOf("(sector");
sql_main = insert(sql_main,"innovation_type='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main);
// sql_main=sql_main+" WHERE sector='"+selectedItem.name+"'";
}else if(sql_main.indexOf("WHERE( innovation_type")>0){
  var index = sql_main.indexOf("( innovation_type");
  sql_main = insert(sql_main,"innovation_type='"+selectedItem.name+"' OR ",index+1); 
  console.log(sql_main);
  
}else if(sql_main.indexOf("WHERE ( innovation_type")>0){
  var index = sql_main.indexOf("( innovation_type");
  sql_main = insert(sql_main,"innovation_type='"+selectedItem.name+"' OR ",index+1); 
  console.log(sql_main);
  
}else if(sql_main.indexOf("innovation_type=")>0){
var index = sql_main.indexOf("(innovation_type");
sql_main = insert(sql_main,"innovation_type='"+selectedItem.name+"' OR ",index+1); 
console.log(sql_main);
}else if(sql_main.indexOf("WHERE")>0){
sql_main=sql_main+"AND (innovation_type='"+selectedItem.name+"')";
console.log(sql_main);
}else{
sql_main=sql_main+" WHERE (innovation_type='"+selectedItem.name+"')";
console.log(sql_main);
}
//  var sector_no = selectedList.length;
//  var sql="select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
//  for (let i = 0; i < sector_no; i++) {
//      if(i==0){
//        sql = sql+selectedList[i].name+"'";
//      }else{
//        sql = sql+"OR sector ='"+selectedList[i].name+"'";
//      }
   
//  }
//  console.log(sql);
startups10Source.data=  sql_main;
dispatch(
 addSource(startups10Source)
);

dispatch(
 addLayer({
   id: STARTUPS10_LAYER_ID,
   source: startups10Source.id,
 })
);
};

function innovationTypeOnRemoveHandler(selectedList, selectedItem){
     
  console.log(selectedList);
  console.log(selectedItem.name);
  var sql ="";

  console.log(sql_main);
  sql_main = sql_main.replace(" OR innovation_type='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace(" OR innovation_type ='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace("innovation_type='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace("innovation_type ='"+selectedItem.name+"'",'');
  sql_main = sql_main.replace("egypt_si_dataset_final_review_16112021   AND",'egypt_si_dataset_final_review_16112021   WHERE');

    sql_main = sql_main.replace("16112021AND",'16112021 WHERE');    
    
    
    
    sql_main = sql_main.replace(" AND ()",'');
    sql_main = sql_main.replace(" AND ( )",'');
    sql_main = sql_main.replace(" AND()",'');
    sql_main = sql_main.replace(" AND( )",'');
    sql_main = sql_main.replace(" AND(  )",'');
    sql_main = sql_main.replace(" WHERE ()",'');
    sql_main = sql_main.replace(" WHERE ( )",'');
    sql_main = sql_main.replace(" WHERE (  )",'');
    sql_main = sql_main.replace(" WHERE (   )",'');
    sql_main = sql_main.replace(" WHERE()",'');
    sql_main = sql_main.replace(" WHERE( )",'');
    sql_main = sql_main.replace(" WHERE(  )",'');
    sql_main = sql_main.replace("( OR",'(');
    sql_main = sql_main.replace("( OR",'(');
    sql_main = sql_main.replace(" OR OR",'OR');
    sql_main = sql_main.replace("WHERE OR",'WHERE');
    sql_main = sql_main.replace("WHERE (  OR ",'WHERE (');
    sql_main = sql_main.replace("OR  )",')');
    sql_main = sql_main.replace("OR  ",'OR ');
    sql_main = sql_main.replace("  OR",' OR');
    sql_main = sql_main.replace("16112021AND",'16112021 WHERE');
    sql_main = sql_main.replace("AND ( )",'');
    
    // if(sql_main.indexOf("gov_name=")>0)
  if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
    sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  }
  if(sql_main == "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
    sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  }
  sql_main = sql_main.replace("( OR",'(');
    sql_main = sql_main.replace("( OR",'(');
    sql_main = sql_main.replace(" OR OR",'OR');
  sql_main = sql_main.replace("AND ()",'');
  sql_main = sql_main.replace("AND ( )",'');
  sql_main = sql_main.replace(" AND ()",'');
    sql_main = sql_main.replace(" AND ( )",'');
    sql_main = sql_main.replace(" AND()",'');
    sql_main = sql_main.replace(" AND( )",'');
    sql_main = sql_main.replace(" AND(  )",'');
  console.log("removed");
  console.log(sql_main);

  
  startups10Source.data=  sql_main;
  dispatch(
    addSource(startups10Source)
  );

  dispatch(
    addLayer({
      id: STARTUPS10_LAYER_ID,
      source: startups10Source.id,
    })
  );
};
function onSubmit6(e){
    // navigation.goBack();
    console.log('hi');
    
    console.log(searchInput6.current.value);
    var val = searchInput6.current.value;
    var val2 = capitalizeFirstLetter(val);
    console.log(val2);
    var data1=  "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%') OR LOWER(gov_name) LIKE LOWER('%"+val+"%') OR LOWER(sector) LIKE LOWER('%"+val+"%') OR LOWER(sector_primary_secondary) LIKE LOWER('%"+val+"%') OR LOWER(sub_sector) LIKE LOWER('%"+val+"%') OR LOWER(description) LIKE LOWER('%"+val+"%') OR LOWER(website) LIKE LOWER('%"+val+"%') OR LOWER(facebook_link) LIKE LOWER('%"+val+"%') OR LOWER(country) LIKE LOWER('%"+val+"%') OR LOWER(full_address) LIKE LOWER('%"+val+"%')";
    var data2 = data1+ " OR LOWER(sdgs) LIKE LOWER('%"+val+"%') OR LOWER(innovation_type) LIKE LOWER('%"+val+"%') OR LOWER(innovation_stage) LIKE LOWER('%"+val+"%') OR LOWER(active_inactive_status) LIKE LOWER('%"+val+"%') OR LOWER(operation_cities_governorates) LIKE LOWER('%"+val+"%') OR LOWER(area_of_social_impact) LIKE LOWER('%"+val+"%') OR LOWER(organisation_phone_no) LIKE LOWER('%"+val+"%') OR LOWER(organisation_email) LIKE LOWER('%"+val+"%') OR LOWER(stage_investment_readiness) LIKE LOWER('%"+val+"%')";
    startups10Source.data=  data2;
    // startups10Source.data=  "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%') OR LOWER(gov_name) LIKE LOWER('%"+val+"%') OR LOWER(sector) LIKE LOWER('%"+val+"%') OR LOWER(innovation_type) LIKE LOWER('%"+val+"%')"  ;
    // console.log(startups10Source.data);
    dispatch(
      addSource(startups10Source)
    );
    dispatch(
      addLayer({
        id: STARTUPS10_LAYER_ID,
        source: startups10Source.id,
      })
    );
}



    
  const addPopulationLayer = (e) =>{
    var population_sql = "select gov_name_en as governorate,population_percentage_2017_census_approximated_to_2nd_decimal,percentage_of_urban_population_2017_census,percentage_of_rural_population_2017_census,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = population_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: POPULATION_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(POPULATION_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  } 
  const addHouseholdWaterLayer = (e) =>{
    var householdwater_sql = "select gov_name_en as governorate,percentage_of_households_connected_to_the_public_network_of_wat,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = householdwater_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  } 
  const addHouseholdElectricityLayer = (e) =>{
    var householdelectricity_sql = "select gov_name_en as governorate,percentage_of_households_connected_to_the_public_network_of_ele,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = householdelectricity_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD2_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD2_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  } 
  const addHouseholdSewageLayer = (e) =>{
    var householdsewage_sql = "select gov_name_en as governorate,percentage_of_households_connected_to_the_public_network_of_sew,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = householdsewage_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD3_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD3_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  }
  const addPhonelinesLayer = (e) =>{
    var household4_sql = "select gov_name_en as governorate,average_number_of_home_phone_lines_1000_households_2019_2020,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household4_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD4_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD4_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  }
  const addGarbageLayer = (e) =>{
    var household5_sql = "select gov_name_en as governorate,amount_of_collected_garbage_in_ton_2020,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household5_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD5_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD5_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  }
  const addMunicipalLayer = (e) =>{
    var household6_sql = "select gov_name_en as governorate,amount_of_collected_municipal_waste_in_ton_2019,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household6_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD6_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD6_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  }    
  const addUnemploymentLayer = (e) =>{
    
    var household7_sql = "select gov_name_en as governorate,unemployment_percentage_2020,male_unemployment_percentage_2020,female_unemployment_percentage_2020,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household7_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD7_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD7_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };

  
  } 
  const addDropout1Layer = (e) =>{
    var household8_sql = "select gov_name_en as governorate,dropout_percentage_in_primary_education_2017_2018_2018_2019,male_dropout_percentage_in_primary_education_2017_2018_2018_201,female_dropout_percentage_in_primary_education_2017_2018_2018_2,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household8_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD8_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD8_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };
  }
  const addDropout2Layer = (e) =>{
    var household9_sql = "select gov_name_en as governorate,dropout_percentage_in_preparatory_education_2017_2018_2018_2019,male_dropout_percentage_in_preparatory_education_2017_2018_2018,female_dropout_percentage_in_preparatory_education_2017_2018_20,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household9_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD9_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD9_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };
  }
  const addIlliteracyLayer = (e) =>{
    var household10_sql = "select gov_name_en as governorate,illiteracy_percentage_2017_census,male_illiteracy_percentage_2017_census,female_illiteracy_percentage_2017_census,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household10_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD10_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD10_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };
  }
  const addGDPLayer = (e) =>{
    var household11_sql = "select gov_name_en as governorate,total_gdp_in_thousand_egp_2015_2016,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household11_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD11_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD11_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };
  }
  const addPovertyLayer = (e) =>{
    var household12_sql = "select gov_name_en as governorate,poverty_percentage_2017_2018,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household12_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD12_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD12_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };
  }
  const addHospitalLayer = (e) =>{
    var household13_sql = "select gov_name_en as governorate,average_number_of_hospitals_100k_of_residents,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
    developmentSource.data = household13_sql;
    dispatch(addSource(developmentSource));

    dispatch(
      addLayer({
        id: HOUSEHOLD13_LAYER_ID,
        source: developmentSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(HOUSEHOLD13_LAYER_ID));
      dispatch(removeSource(developmentSource.id));
    };
  }
  const addPollutionLayer = (e) =>{
    var household14_sql = "select observation_area,sulfur_dioxide_so2_annual_average_concentrations_microgram_m,nitrogen_dioxide_no2_annual_average_concentrations_microgram,solid_particles_with_a_diameter_less_than_10_micrometers_pm10,the_geom_webmercator from dataset_pollution_toxic_concentrations";
    pollutionSource.data = household14_sql;
    dispatch(addSource(pollutionSource));

    dispatch(
      addLayer({
        id: POLLUTION_LAYER_ID,
        source: pollutionSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(POLLUTION_LAYER_ID));
      dispatch(removeSource(pollutionSource.id));
    };
  }


  function developmentDataOnSelectHandler(selectedList, selectedItem){
    if(selectedItem.name=="poverty (2017/2018)"){
      addPovertyLayer();
      // dispatch(removeLayer(UNEMPLOYMENT_LAYER_ID));
      // dispatch(removeLayer(POPULATION_LAYER_ID));
    }else if(selectedItem.name=="Unemployment"){
      addUnemploymentLayer();
      // dispatch(removeLayer(POVERTY_LAYER_ID));
      
    }else if(selectedItem.name=="Population"){
      addPopulationLayer();
      // dispatch(removeLayer(POVERTY_LAYER_ID));
      // dispatch(removeLayer(UNEMPLOYMENT_LAYER_ID));
    }else if(selectedItem.name=="Access to Water"){
      addHouseholdWaterLayer();
      // dispatch(removeLayer(POVERTY_LAYER_ID));
      // dispatch(removeLayer(UNEMPLOYMENT_LAYER_ID));
    }else if(selectedItem.name=="Access to Electricity"){
      addHouseholdElectricityLayer();
      // dispatch(removeLayer(POVERTY_LAYER_ID));
      // dispatch(removeLayer(UNEMPLOYMENT_LAYER_ID));
    }else if(selectedItem.name=="Access to Sewage"){
      addHouseholdSewageLayer();
      // dispatch(removeLayer(POVERTY_LAYER_ID));
      // dispatch(removeLayer(UNEMPLOYMENT_LAYER_ID));
    }else if(selectedItem.name=="Landline Phone Connectivity"){
      addPhonelinesLayer();
      // dispatch(removeLayer(POVERTY_LAYER_ID));
      // dispatch(removeLayer(UNEMPLOYMENT_LAYER_ID));
    }else if(selectedItem.name=="Garbage"){
      addGarbageLayer();
    }else if(selectedItem.name=="Municipal Waste"){
      addMunicipalLayer();
    }else if(selectedItem.name=="Dropout in Primary Education"){
      addDropout1Layer();
    }else if(selectedItem.name=="Dropout in Preparatory Education"){
      addDropout2Layer();
    }else if(selectedItem.name=="Illiteracy"){
      addIlliteracyLayer();
    }else if(selectedItem.name=="Total GDP"){
      addGDPLayer();
    }else if(selectedItem.name=="Poverty"){
      addPovertyLayer();
    }else if(selectedItem.name=="Access to Hospitals"){
      addHospitalLayer();
    }else if(selectedItem.name=="Pollution"){
      addPollutionLayer();
    }        

  }
  function developmentDataOnRemoveHandler(selectedList, selectedItem){
    if(selectedItem.name=="poverty (2017/2018)"){
      dispatch(removeLayer(POVERTY_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Unemployment"){
      dispatch(removeLayer(HOUSEHOLD7_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Population"){
      dispatch(removeLayer(POPULATION_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Access to Water"){
      dispatch(removeLayer(HOUSEHOLD_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Access to Electricity"){
      dispatch(removeLayer(HOUSEHOLD2_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Access to Sewage"){
      dispatch(removeLayer(HOUSEHOLD3_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Landline Phone Connectivity"){
      dispatch(removeLayer(HOUSEHOLD4_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Garbage"){
      dispatch(removeLayer(HOUSEHOLD5_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Municipal Waste"){
      dispatch(removeLayer(HOUSEHOLD6_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Dropout in Primary Education"){
      dispatch(removeLayer(HOUSEHOLD8_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Dropout in Preparatory Education"){
      dispatch(removeLayer(HOUSEHOLD9_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Illiteracy"){
      dispatch(removeLayer(HOUSEHOLD10_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Total GDP"){
      dispatch(removeLayer(HOUSEHOLD11_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Poverty"){
      dispatch(removeLayer(HOUSEHOLD12_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Access to Hospitals"){
      dispatch(removeLayer(HOUSEHOLD13_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }else if(selectedItem.name=="Pollution"){
      dispatch(removeLayer(POLLUTION_LAYER_ID));
      developmentSource.data = "development_data_dataset_final_review_12_2_2021";
    }      
       


  }
 
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
          className={classes.navLink+" text-md-white text-decoration-none  text-white border-0 title-header"}
        />
        {/* <Tab
          label='Public'
          value='public'
          component={NavLink}
          to={ROUTE_PATHS.PUBLIC}
          className={classes.navLink}
        /> */}
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
      <div style={filters_wrap} className="flex-nowrap shadow-sm d-none d-md-flex">
      <div id="exportPrivate" style={sdg_float} className=" flex-wrap">
                      <Multiselect
                                  
                          options={SDGs} // Options to display in the dropdown
                          selectedValues={SDGs[0]} // Preselected value to persist in dropdown
                          onSelect={SDGsOnSelectHandler} // Function will trigger on select event
                          onRemove={SDGsOnRemoveHandler} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                          placeholder="Filter by SDG"
                          // showCheckbox="true"
                          // closeOnSelect=false
                          showCheckbox={true}
                          showArrow="true"
                          closeOnSelect={false}
                          closeIcon="cancel"
                          style={style2}
                            
                      />
                      <Multiselect
                                  
                                  options={options} // Options to display in the dropdown
                                  selectedValues={options[0]} // Preselected value to persist in dropdown
                                  onSelect={governOnSelectHandler} // Function will trigger on select event
                                  onRemove={governOnRemoveHandler} // Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                  showCheckbox="true"
                                  showArrow="true"
                                  placeholder="Filter by Governorate"
                                  closeOnSelect={false}
                                  closeIcon="cancel"
                                  style={style2}
                                    
                      />
                      <Multiselect
                      
                                  options={sectors} // Options to display in the dropdown
                                  selectedValues={sectors[0]} // Preselected value to persist in dropdown
                                  onSelect={sectorOnSelectHandler} // Function will trigger on select event
                                  onRemove={sectorOnRemoveHandler} // Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                  showCheckbox="true"
                                  showArrow="true"
                                  placeholder="Filter by Sector"
                                  closeOnSelect={false}
                                  closeIcon="cancel"
                                  style={style2}        
                      />
                      <Multiselect
                      
                          options={development_data} // Options to display in the dropdown
                          selectedValues={development_data[0]} // Preselected value to persist in dropdown
                          onSelect={developmentDataOnSelectHandler} // Function will trigger on select event
                          onRemove={developmentDataOnRemoveHandler} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                          showCheckbox={true}
                          placeholder="Development Data"
                          // singleSelect={true}
                          selectionLimit={1}
                          showArrow="true"
                          hidePlaceholder={false}
                          closeOnSelect={false}
                          closeIcon="cancel"
                          style={style2}
                            
                      />
                      <button id="exportPrivateBtn" type="button" className="btn btn-dark" style={exportButton} onClick={ExportToExcel}>Export</button> 
                      {/* <button id="exportPublic" type="button" className="btn btn-dark disabled d-none" dataToggle="tooltip" title="not available for public version" style={exportButton}>Export</button>  */}

                      <div style={legendFloat}>
                        <LegendWidget  />
                      </div>
      </div>


      <div id="exportPublic" style={sdg_float} className=" flex-wrap d-none">
                      <Multiselect
                                  
                          options={SDGs} // Options to display in the dropdown
                          selectedValues={SDGs[0]} // Preselected value to persist in dropdown
                          onSelect={SDGsOnSelectHandler2} // Function will trigger on select event
                          onRemove={SDGsOnRemoveHandler2} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                          placeholder="Filter by SDG"
                          // showCheckbox="true"
                          // closeOnSelect=false
                          showCheckbox={true}
                          showArrow="true"
                          closeOnSelect={false}
                          closeIcon="cancel"
                          style={style2}
                            
                      />
                      <Multiselect
                                  
                                  options={options} // Options to display in the dropdown
                                  selectedValues={options[0]} // Preselected value to persist in dropdown
                                  onSelect={governOnSelectHandler2} // Function will trigger on select event
                                  onRemove={governOnRemoveHandler2} // Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                  showCheckbox="true"
                                  showArrow="true"
                                  placeholder="Filter by Governorate"
                                  closeOnSelect={false}
                                  closeIcon="cancel"
                                  style={style2}
                                    
                      />
                      <Multiselect
                      
                                  options={sectors} // Options to display in the dropdown
                                  selectedValues={sectors[0]} // Preselected value to persist in dropdown
                                  onSelect={sectorOnSelectHandler2} // Function will trigger on select event
                                  onRemove={sectorOnRemoveHandler2} // Function will trigger on remove event
                                  displayValue="name" // Property name to display in the dropdown options
                                  showCheckbox="true"
                                  showArrow="true"
                                  placeholder="Filter by Sector"
                                  closeOnSelect={false}
                                  closeIcon="cancel"
                                  style={style2}        
                      />
                      <Multiselect
                      
                          options={development_data} // Options to display in the dropdown
                          selectedValues={development_data[0]} // Preselected value to persist in dropdown
                          onSelect={developmentDataOnSelectHandler} // Function will trigger on select event
                          onRemove={developmentDataOnRemoveHandler} // Function will trigger on remove event
                          displayValue="name" // Property name to display in the dropdown options
                          showCheckbox={true}
                          placeholder="Development Data"
                          // singleSelect={true}
                          selectionLimit={1}
                          showArrow="true"
                          hidePlaceholder={false}
                          closeOnSelect={false}
                          closeIcon="cancel"
                          style={style2}
                            
                      />
                      {/* <button id="exportPrivate" type="button" className="btn btn-dark" style={exportButton} onClick={ExportToExcel}>Export</button>  */}
                      <button id="exportPublicBtn"  type="button" className="btn btn-dark disabled" data-toggle="popover" data-content="not available for public version" style={exportButton}>Export</button> 

                      <div style={legendFloat}>
                        <LegendWidget  />
                      </div>
      </div>


      


      <div style={ignore} className="d-inline-block">
      </div>
    </div>  

      <div className="card p-0 d-none d-md-block" style={search_float2}>
          
          <div className="card-header p-1" style={background_white}>
            
              <input type="text" className=" form-control" style={searchStyle2} onChange={onSubmit6} placeholder="Search Innovation" ref={searchInput6} id='search6' ></input>
              {/* <button class="btn btn-primary" style={submitStyle} onClick={onSubmit}>submit</button> */}
              <input type="text" className=" form-control d-none" style={searchStyle2} onChange={onSubmit6Public} placeholder="Search Innovation" ref={searchInput6Public} id='search6Public' ></input>

          </div>
          
      </div>
      
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

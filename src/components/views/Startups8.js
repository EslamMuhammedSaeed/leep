import React from "react";
import { useEffect } from 'react';
import { BASEMAP_LAYER_ID } from 'components/layers/BasemapLayer';
import { UNEMPLOYMENT_LAYER_ID } from 'components/layers/UnemploymentLayer';
import startups10Source from 'data/sources/startups10Source';
import pollutionSource from 'data/sources/pollutionSource';

// import startups13Source from 'data/sources/startups13Source';
// import { SDG_LAYER_ID } from 'components/layers/SdgLayer';
import startups14Source from 'data/sources/startups14Source';
import { SDG2_LAYER_ID } from 'components/layers/Sdg2Layer';
import sdGsSource from 'data/sources/sdGsSource';

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


import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Multiselect from 'multiselect-react-dropdown';
import { Divider } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget } from '@carto/react-widgets';
import { currencyFormatter } from 'utils/formatter';
// import { useNavigation } from '@react-navigation/native';
import {useNavigate} from 'react-router-dom';
import {  useState } from 'react';
import { Sync } from "@material-ui/icons";
import exportFromJSON from 'export-from-json'
const sectors2 = [
  {name: 'Creative Industries'},
  {name2: 'Education'},
  {name: 'Environment'},
  {name2: 'Health'},
  {name: 'Inclusive Services and Technology'},
  {name2: 'Infrastructure and Transport'},
  {name: 'Tourism'},
  {name2: 'Other'},
];

var data = [{name: 'Creative Industries'},
{name2: 'Education'},
{name: 'Environment'},
{name2: 'Health'},
{name: 'Inclusive Services and Technology'},
{name2: 'Infrastructure and Transport'},
{name: 'Tourism'},
{name2: 'Other'},
]  
const fileName = 'download'  ;
const exportType = exportFromJSON.types.xls; 

var sql_main = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
var sql_main2 = "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
var global_data =[];
const customFormatter = (value) => `${value} Years`;
const sectors = [
  {name: 'Creative Industries', id: 1},
  {name: 'Education', id: 2},
  {name: 'Environment', id: 3},
  {name: 'Health', id: 4},
  {name: 'Inclusive Services and Technology', id: 5},
  {name: 'Infrastructure and Transport', id: 6},
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

const password_wrapper = {
  width:"100%",
  height:"100vh",
  position:"fixed",
  top:"0",
  left:"0",
  // opacity:"0.98",
  zIndex:"1500",
  background:"white",
  display:"flex",
  justifyContent: "center",
  alignItems: "center",
  

};

const styleLabel = {
  marginTop:"10px",
  fontSize:"15px",
  marginLeft:"15px",
  width:"95%",
 
  
};
const legendFloat={
  position:"fixed",
  right :"360px",
  top:"120px",
}
const exportButton={
  borderRadius :"0px",
  // position:"fixed",
  // right :"366px",
  // top:"54px",
  marginLeft:"10px",
  height:"34px",
  opacity:"0.8",
  fontSize:"13px"
}
const searchStyle = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  height:"30px",
  width:"100%",
  display:"inline",
  fontSize:"12px"
  // color:"white"

};
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
const icon_size={
  fontSize:"12px",
  marginLeft:"150px",
};
const icon_size2={
  fontSize:"12px",
  marginLeft:"140px",
};
const search_float = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  background:"rgba(255, 255, 255, 0.356)",
  position:"fixed",
  top: "62px",
  left: "315px",
  padding:"7px",
  // width:"300px"
  // color:"white"

};
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
const govern_float = {
  background:"rgba(255, 255, 255,0)",
  position:"fixed",
  top: "48px",
  left: "220px",
  padding:"2px",
  paddingTop: "6px",
  width:"350px",
};
const sector_float = {
  background:"rgba(255, 255, 255,0)",
  position:"fixed",
  top: "48px",
  left: "440px",
  padding:"2px",
  paddingTop: "6px",
  width:"350px",
};
const dev_float = {
  background:"rgba(255, 255, 255,0)",
  position:"fixed",
  top: "48px",
  left: "660px",
  padding:"2px",
  paddingTop: "6px",
  
  width:"350px",
};

const search_float_mobile = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  background:"rgba(255, 255, 255, 0.356)",
  position:"fixed",
  top: "70px",
  left: "0px",
  padding:"7px",
  // color:"white"

};
const background_transparent ={
  background:"rgba(255, 255, 255, 0.356)",
  color:"black",
};
const card_float={
  // overflowY: 'scroll',
  background:"rgba(255, 255, 255, 0.356)",
  width:"280px",
  maxHeight:"790px",

};
const card_body_float={
  background:"rgba(255, 255, 255, 0.356)",
  overflowY: 'scroll',
  overflowX: 'hidden',
  width:"280px",
  maxHeight:"450px",

};
const filters_float = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  background:"rgba(255, 255, 255, 0.356)",
  position:"fixed",
  top: "60px",
  left: "13px",
  // with:"300px",
  // color:"white"

};
const submitStyle = {
  // background:"#2CA58D",
  // border: "0",
  // borderBottom:"1px solid white",
  // maxWidth:"230px",
  display:"inline",
  marginLeft:"5px",
  marginBottom:"4px",
  // color:"white"

};

const background_navy = {
  background:"white",
};
const background_white = {
  background:"rgba(255, 255, 255, 0.356)",
  color:"black"
};
const card_header = {
  fontWeight:"bold",
  fontSize:"14px",
};
const card_header_float = {
  fontWeight:"bold",
  fontSize:"14px",
  with:"300px",
  background:"white",
};
const style3 ={
  multiselectContainer: { 
    marginLeft:"15px",
    margin:"0px 10px 10px 15px",
    width:"200px"
    // paddingRight:"20px"
  },
  searchBox: { // To change search box element look
    minHeight: "40px",
    minWidth:"300px",
    maxHeight: "40px",
	
	
  },
  chips: {
     background: "#FAA63D",
     color: "white",
     whiteSpace: "normal",
    // display:"none"
     
     
  }
  
}
const style2 ={
  multiselectContainer: { 
    marginLeft:"15px",
    margin:"0px 10px 10px 15px",
    width:"178px",
    background:"white",
    fontSize:"0.7rem"
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

const style7 ={
  multiselectContainer: { 
    // marginLeft:"15px",
    margin:"10px 10px 10px 10px",
    width:"90%",
    background:"white",
    // paddingRight:"20px"
  },
  searchBox: { // To change search box element look
    minHeight: "36px",
    width:"95%"
	
	
  },
  chips: {
     background: "#FAA63D",
     color: "white",
     whiteSpace: "normal",
     display:"none",
     
  }
  
}



const useStyles = makeStyles(() => ({
  startups8: {},
}));


export default function Startups8() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  let searchInput = React.createRef(); 
  let searchInput2 = React.createRef();
  let searchInput5 = React.createRef();
  let searchInput6 = React.createRef();
  const ExportToExcel=async() =>{ 
    
      const credentials = {
        username: "riseegypt",
        apiKey: "7ecefb7b10b21eef2a24815d552b9bded4183933",
        serverUrlTemplate: 'https://riseegypt.carto.com'
      };
      const opts = {
        // format:"CSV"
      };
      var query = sql_main;
      query = sql_main.replace(",the_geom_webmercator",'');
      query = query.replace("cartodb_id,",'');
      // query = startups10Source.data;
      console.log(query);
      const fetched_data = await getData({credentials, opts,query});
      // console.log(fetched_data);
      data =fetched_data;
      console.log(global_data);
      // console.log(fetched_data[0]);
      // setGovern({
      //   fetched_data
      // });
      console.log(data);
      // data=startups10Source.data;
    
    
    exportFromJSON({ data, fileName, exportType });
  }
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
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function onSubmit(e){
// navigation.goBack();
// console.log('hi');
console.log(searchInput.current.value);
var val = searchInput.current.value;
var val2 = capitalizeFirstLetter(val);
console.log(val2);
startups10Source.data=  "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%')"  ;
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

function onSubmit5(e){
  // navigation.goBack();
  console.log('hi');
  
  console.log(searchInput5.current.value);
  var val = searchInput5.current.value;
  var val2 = capitalizeFirstLetter(val);
  console.log(val2);
  var data1=  "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE LOWER(name) LIKE LOWER('%"+val+"%') OR LOWER(gov_name) LIKE LOWER('%"+val+"%') OR LOWER(sector) LIKE LOWER('%"+val+"%') OR LOWER(sector_primary_secondary) LIKE LOWER('%"+val+"%') OR LOWER(sub_sector) LIKE LOWER('%"+val+"%') OR LOWER(description) LIKE LOWER('%"+val+"%') OR LOWER(website) LIKE LOWER('%"+val+"%') OR LOWER(facebook_link) LIKE LOWER('%"+val+"%') OR LOWER(country) LIKE LOWER('%"+val+"%') OR LOWER(full_address) LIKE LOWER('%"+val+"%')";
  var data2 = data1+ " OR LOWER(sdgs) LIKE LOWER('%"+val+"%') OR LOWER(innovation_type) LIKE LOWER('%"+val+"%') OR LOWER(innovation_stage) LIKE LOWER('%"+val+"%') OR LOWER(active_inactive_status) LIKE LOWER('%"+val+"%') OR LOWER(operation_cities_governorates) LIKE LOWER('%"+val+"%') OR LOWER(area_of_social_impact) LIKE LOWER('%"+val+"%') OR LOWER(organisation_phone_no) LIKE LOWER('%"+val+"%') OR LOWER(organisation_email) LIKE LOWER('%"+val+"%') OR LOWER(stage_investment_readiness) LIKE LOWER('%"+val+"%')";
  startups10Source.data=  data2;
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


  // const addPovertyLayer = (e) =>{
  //   var poverty_sql = "select gov_name_en as governorate,poverty_percentage_2017_2018,the_geom_webmercator from development_data_dataset_final_review_12_2_2021";
  //   developmentSource.data = poverty_sql;
  //   dispatch(addSource(developmentSource));

  //   dispatch(
  //     addLayer({
  //       id: POVERTY_LAYER_ID,
  //       source: developmentSource.id,
  //     }),
  //   );

  //   return () => {
  //     dispatch(removeLayer(POVERTY_LAYER_ID));
  //     dispatch(removeSource(developmentSource.id));
  //   };
  
  //   // dispatch(addSource(startups8Source));
  //   // dispatch(
  //   //   addLayer({
  //   //     id: STARTUPS10_LAYER_ID,
  //   //     source: startups10Source.id,
  //   //   }),
  //   // );
   
    

  //   // dispatch(
  //   //   addLayer({
  //   //     id: STARTUPS9_LAYER_ID,
  //   //     source: startups8Source.id,
  //   //   }),
  //   // );
  //   // dispatch(
  //   //   addLayer({
  //   //     id: STARTUPS10_LAYER_ID,
  //   //     source: startups10Source.id,
  //   //   }),
  //   // );
  // } 

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
    }else if(selectedItem.name=="Unemployment"){
      dispatch(removeLayer(HOUSEHOLD7_LAYER_ID));
    }else if(selectedItem.name=="Population"){
      dispatch(removeLayer(POPULATION_LAYER_ID));
    }else if(selectedItem.name=="Access to Water"){
      dispatch(removeLayer(HOUSEHOLD_LAYER_ID));
    }else if(selectedItem.name=="Access to Electricity"){
      dispatch(removeLayer(HOUSEHOLD2_LAYER_ID));
    }else if(selectedItem.name=="Access to Sewage"){
      dispatch(removeLayer(HOUSEHOLD3_LAYER_ID));
    }else if(selectedItem.name=="Landline Phone Connectivity"){
      dispatch(removeLayer(HOUSEHOLD4_LAYER_ID));
    }else if(selectedItem.name=="Garbage"){
      dispatch(removeLayer(HOUSEHOLD5_LAYER_ID));
    }else if(selectedItem.name=="Municipal Waste"){
      dispatch(removeLayer(HOUSEHOLD6_LAYER_ID));
    }else if(selectedItem.name=="Dropout in Primary Education"){
      dispatch(removeLayer(HOUSEHOLD8_LAYER_ID));
    }else if(selectedItem.name=="Dropout in Preparatory Education"){
      dispatch(removeLayer(HOUSEHOLD9_LAYER_ID));
    }else if(selectedItem.name=="Illiteracy"){
      dispatch(removeLayer(HOUSEHOLD10_LAYER_ID));
    }else if(selectedItem.name=="Total GDP"){
      dispatch(removeLayer(HOUSEHOLD11_LAYER_ID));
    }else if(selectedItem.name=="Poverty"){
      dispatch(removeLayer(HOUSEHOLD12_LAYER_ID));
    }else if(selectedItem.name=="Access to Hospitals"){
      dispatch(removeLayer(HOUSEHOLD13_LAYER_ID));
    }else if(selectedItem.name=="Pollution"){
      dispatch(removeLayer(POLLUTION_LAYER_ID));
    }      
       


  }

    // return () => {
    //   dispatch(removeLayer(STARTUPS9_LAYER_ID));
      // dispatch(removeLayer(BASEMAP_LAYER_ID));
    //   dispatch(removeSource(startups8Source.id));
    // };
  
  // useEffect(() => {
  //   dispatch(addSource(startups8Source));

  //   dispatch(
  //     addLayer({
  //       id: STARTUPS9_LAYER_ID,
  //       source: startups8Source.id,
  //     }),
  //   );

  //   return () => {
  //     dispatch(removeLayer(STARTUPS9_LAYER_ID));
  //     dispatch(removeSource(startups8Source.id));
  //   };
  // }, [dispatch]);
  
  // useEffect(() => {
  //   dispatch(addSource(startups8Source));

  //   dispatch(
  //     addLayer({
  //       id: BASEMAP_LAYER_ID,
  //       source: startups8Source.id,
  //     }),
  //   );

  //   return () => {
  //     dispatch(removeLayer(BASEMAP_LAYER_ID));
  //     dispatch(removeSource(startups8Source.id));
  //   };
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(addSource(developmentSource));

  //   dispatch(
  //     addLayer({
  //       id: POVERTY_LAYER_ID,
  //       source: developmentSource.id,
  //     }),
  //   );

  //   return () => {
  //     dispatch(removeLayer(POVERTY_LAYER_ID));
  //     dispatch(removeSource(developmentSource.id));
  //   };
  // }, [dispatch]);
  // dispatch(
  //   addSource(startups14Source)
  // );

  // useEffect(() => {
  //   dispatch(addSource(startups14Source));

  //   dispatch(
  //     addLayer({
  //       id: SDG2_LAYER_ID,
  //       source: startups14Source.id,
  //     }),
  //   );

  //   return () => {
  //     dispatch(removeLayer(SDG2_LAYER_ID));
  //     dispatch(removeSource(startups14Source.id));
  //   };
  // }, [dispatch]);
  
  var password_wrap = document.getElementById('password-wrapper');
  password_wrap.classList.remove("d-none");

  useEffect(() => {
    startups10Source.data= "select cartodb_id, name,sector,sector_primary_secondary,sub_sector,sdgs,year_founded_if_provided,website,facebook_link,gov_name,description,country,full_address,innovation_stage,innovation_type,active_inactive_status,operation_cities_governorates,area_of_social_impact,no_of_female_founder_co_founder,organisation_phone_no,organisation_email,stage_investment_readiness ,the_geom_webmercator from egypt_si_dataset_final_review_16112021"
    dispatch(addSource(startups10Source));

    dispatch(
      addLayer({
        id: STARTUPS10_LAYER_ID,
        source: startups10Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS10_LAYER_ID));
      dispatch(removeSource(startups10Source.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
   
    <Grid container direction='column' className={classes.startups5}>
    {/* <div style={password_wrapper}>
        <div>
            <img className="img-fluid" src={'img/LEEP_RGB.png'}/>
            <input type="password" className="form-control" placeholder="Enter the passcode"></input>
       </div>
    </div> */}
    <div className="card p-0 d-none d-md-block" style={search_float2}>
          
          <div className="card-header p-1" style={background_white}>
            
              <input type="text" className=" form-control" style={searchStyle2} onChange={onSubmit6} placeholder="Search Innovation" ref={searchInput6} id='search6' ></input>
              {/* <button class="btn btn-primary" style={submitStyle} onClick={onSubmit}>submit</button> */}
            
          </div>
          
    </div>
    {/* <div className="card p-0 d-md-none" style={search_float_mobile}>
          
          <div className="card-header p-2" style={background_white}>
            
              <input type="text" className=" form-control" style={searchStyle2} onChange={onSubmit} placeholder="search" ref={searchInput} id='search' ></input>
              
            
          </div>
          
    </div> */}
    

    {/* <div id="accordion2" className="d-none d-md-block" style={filters_float}>
        <div className="card shadow-sm" style={card_float}>
              <div className="card-header" style={card_header_float}>
                  <a className="card-link text-dark" style={card_header_float} data-toggle="collapse" href="#collapseOne2">
                    Filter By
                    <i class="fa fa-chevron-down " style={icon_size} aria-hidden="true"></i>
                  </a>
              </div>
              <div id="collapseOne2" className="collapse show" style={card_body_float} data-parent="#accordion2">
            <div className="card-body p-0 m-0 pb-5" >
            <label style={styleLabel}>Governorate: 
            </label>
            <Multiselect
                
                  options={options} // Options to display in the dropdown
                  selectedValues={options[0]} // Preselected value to persist in dropdown
                  onSelect={governOnSelectHandler} // Function will trigger on select event
                  onRemove={governOnRemoveHandler} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  showCheckbox="true"
                  showArrow="true"
                  closeOnSelect={false}
                  closeIcon="cancel"
                  style={style2}
                    
            />
              <Divider></Divider>

              <label style={styleLabel}>Innovation Sector:

              </label>
              <Multiselect
                
                options={sectors} // Options to display in the dropdown
                selectedValues={sectors[0]} // Preselected value to persist in dropdown
                onSelect={sectorOnSelectHandler} // Function will trigger on select event
                onRemove={sectorOnRemoveHandler} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
                showCheckbox="true"
                showArrow="true"
                closeOnSelect={false}
                closeIcon="cancel"
                style={style2}
                  
              />

              <Divider></Divider>

              <label style={styleLabel}>Innovation Type:

              </label>
              <Multiselect
                
                  options={innovation_type} // Options to display in the dropdown
                  selectedValues={innovation_type[0]} // Preselected value to persist in dropdown
                  onSelect={innovationTypeOnSelectHandler} // Function will trigger on select event
                  onRemove={innovationTypeOnRemoveHandler} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  showCheckbox="true"
                  showArrow="true"
                  closeOnSelect={false}
                  closeIcon="cancel"
                  style={style2}
                    
              />


              <Divider></Divider>

              <label style={styleLabel}>Development Data:
 
              </label>
              <Multiselect
                
                  options={development_data} // Options to display in the dropdown
                  selectedValues={development_data[0]} // Preselected value to persist in dropdown
                  onSelect={developmentDataOnSelectHandler} // Function will trigger on select event
                  onRemove={developmentDataOnRemoveHandler} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  showCheckbox="true"
                  singleSelect="true"
                  showArrow="true"
                  closeOnSelect={false}
                  closeIcon="cancel"
                  style={style2}
                    
              />
              <label style={styleLabel}>SDGs:
 
              </label>
              <Multiselect
                
                  options={SDGs} // Options to display in the dropdown
                  selectedValues={SDGs[0]} // Preselected value to persist in dropdown
                  onSelect={SDGsOnSelectHandler} // Function will trigger on select event
                  onRemove={SDGsOnRemoveHandler} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  // showCheckbox="true"
                  // closeOnSelect=false
                  showArrow="true"
                  closeOnSelect={false}
                  closeIcon="cancel"
                  style={style2}
                    
              />

              

              
            </div>
          </div>
        </div>        
    </div> */}




      {/* <Grid item>Hello World</Grid> */}
      {/* <div style={{margin: '20px'}}>
        <input placeholder="search" ref={searchInput} type="text" id='search' />
        <button onClick={onSubmit} style={{marginLeft: '10px'}}>search</button>
        <button onClick={fetch} style={{marginLeft: '10px'}}>fetch</button>
      </div> */}
      <div id="accordion">
        <div className="card d-md-none">
          
          <div className="card-header" style={background_white}>
            <a className="card-link text-dark" style={card_header} data-toggle="collapse" href="#collapse3">
              <input type="text" className=" ml-1 form-control" style={searchStyle} onChange={onSubmit5} placeholder="Search Innovation" ref={searchInput5} id='search2' ></input>
              {/* <button class="btn btn-primary" style={submitStyle} onClick={onSubmit}>submit</button> */}
            </a>
          </div>
          
        </div>
        <div className="d-md-none" >
                <LegendWidget  />
        </div>
        <div className="card d-md-none">
          <div className="card-header" style={background_navy}>
            
                <a className="card-link text-dark" style={card_header} data-toggle="collapse" href="#collapseOne">
                  <div className="row">
                    <div className="col-9">
                       Filter By
                    </div>
                    <div className="col-3 text-center">
                      <i class="fa fa-chevron-down m-0" style={icon_size2} aria-hidden="true"></i>
                    </div>
                  </div>
                </a>
              
              
            
          </div>
          <div id="collapseOne" className="collapse" data-parent="#accordion">
            <div className="card-body p-0 m-0">
              {/* <label style={styleLabel}>SDGs:

              </label> */}
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
                      style={style7}
                        
              />


              {/* <Divider></Divider> */}

              {/* <label style={styleLabel}>Governorate:
            
              </label> */}
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
                              style={style7}
                                
              />
              {/* <Divider></Divider> */}

              {/* <label style={styleLabel}>Innovation Sector:
 
              </label> */}
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
                              style={style7}        
              />
              {/* <Divider></Divider> */}

              {/* <label style={styleLabel}>Development Data:

              </label> */}
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
                      style={style7}
                        
              />


              <Divider></Divider>
              <div className="text-center px-4">
                <button type="button" className="btn btn-dark btn-block mx-0 px-0 my-2" style={exportButton} onClick={ExportToExcel}>Export</button> 
              </div>
              {/* <Divider></Divider>
              <div className="d-md-none" >
                <LegendWidget  />
              </div> */}

             

              
            </div>
          </div>
        </div>

        <div className="card">
          
          <div className="card-header d-md-none" style={background_navy}>
              
                    <a className="card-link text-dark" style={card_header} data-toggle="collapse" href="#collapse2">
                      <div className="row">
                          <div className="col-9">
                               Interactive Analytics
                          </div>
                          <div className="col-3 text-center">
                            <i class="fa fa-chevron-down m-0" style={icon_size2} aria-hidden="true"></i>
                          </div>
                        </div>           
                    </a>
                   
                  
                
          </div>
          <div id="collapse2" className="collapse show" data-parent="#accordion">
            <div className="card-body p-0 m-0">
              <FormulaWidget
                id='innovationStages'
                title='Total No. of Innovations'
                dataSource={startups10Source.id}
                column='innovation_stage'
                operationColumn='innovation_stage'
                operation={AggregationTypes.COUNT}
                // formatter={currencyFormatter}
              />
              <Divider></Divider>
              <CategoryWidget
                id='innovationSectors'
                title='Innovation Sector'
                dataSource={startups10Source.id}
                column='sector'
                operationColumn='sector'
                operation={AggregationTypes.COUNT}
                className='here'
                // formatter={currencyFormatter}
              />
              {/* <CategoryWidget
                id='sdgs'
                title='SDGs'
                dataSource={startups14Source.id}
                column='sdg'
                operationColumn='sdg'
                operation={AggregationTypes.COUNT}
                // formatter={currencyFormatter}
              /> */}
              <CategoryWidget
                id='innovationTypes'
                title='Innovation Type'
                dataSource={startups10Source.id}
                column='innovation_type'
                operationColumn='innovation_type'
                operation={AggregationTypes.COUNT}
                // formatter={currencyFormatter}
              />
              <Divider></Divider>
              <CategoryWidget
                id='innovationStages'
                title='Innovation Stage'
                dataSource={startups10Source.id}
                column='innovation_stage'
                operationColumn='innovation_stage'
                operation={AggregationTypes.COUNT}
                // height="200px"
                // formatter={currencyFormatter}
              />
              {/* <HistogramWidget
                id="innovationStages2"
                title="Innovation Stages 2"
                dataSource={startups10Source.id}
                operation={AggregationTypes.COUNT}
                column="innovation_stage"
                xAxisFormatter={customFormatter}
                ticks={[1, 3, 6, 9]}
                formatter={customFormatter}
              /> */}
              {/* <div style={legendFloat}>
                <LegendWidget  />
              </div> */}
            </div>
          </div>
        </div>

          

      </div>
      
      
      {/* <Collapse isOpened={open}>
  <p>Paragraph of text</p>
  <p>Another paragraph is also OK</p>
  <p>Images and any other content are ok too</p>
 
</Collapse> */}
      

<div>

</div>
<div style={filters_wrap} className="flex-nowrap shadow-sm d-none d-md-flex">
  <div style={sdg_float} className=" flex-wrap">
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
                  <button type="button" className="btn btn-dark" style={exportButton} onClick={ExportToExcel}>Export</button> 
                  <div style={legendFloat}>
                    <LegendWidget  />
                  </div>
      </div>
      <div style={ignore} className="d-inline-block">
      </div>
    </div>  

    {/* <div style={govern_float}>
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
    </div> */}
    {/* <div style={sector_float}>
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
    </div> */}

           
{/* 
    <div style={dev_float}>
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
    </div> */}


{/* <button type="button" className="btn btn-dark" style={exportButton} onClick={ExportToExcel}>Export</button>  */}
{/* <button type="button" onClick={hit2}>here</button> */}

      {/* <Select
    defaultValue={[colourOptions[2], colourOptions[3]]}
    isMulti
    name="colors"
    options={colourOptions}
    className="basic-multi-select"
    classNamePrefix="select"
  /> */}
      
    
      {/* <div>
      <label>
          gov_name:
          <select value={color} onChange={handleChange}>
            {govern.map(item => {
              return (<option key={item.governnorate} value={item.governnorate}>{item.governnorate}</option>);
            })}
          </select>
      </label>
      </div> */}
    </Grid>
  );
}

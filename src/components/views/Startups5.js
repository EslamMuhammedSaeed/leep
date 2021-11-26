import React from "react";
import { useEffect } from 'react';
import startups7Source from 'data/sources/startups7Source';
import { STARTUPS7_LAYER_ID } from 'components/layers/Startups7Layer';
import { getData } from 'data/models/model';
// import { Button , Collapse } from 'react-bootstrap';
import {Collapse} from 'react-collapse';
import startups5Source from 'data/sources/startups5Source';

import { STARTUPS5_LAYER_ID } from 'components/layers/Startups5Layer';
import startups8Source from 'data/sources/startups8Source';
import { STARTUPS9_LAYER_ID } from 'components/layers/Startups9Layer';
import { executeSQL } from "@carto/react-api";
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';


// import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import { Divider } from '@material-ui/core';
import { AggregationTypes } from '@carto/react-core';
import { FormulaWidget, CategoryWidget } from '@carto/react-widgets';
import { currencyFormatter } from 'utils/formatter';
// import { useNavigation } from '@react-navigation/native';
import {useNavigate} from 'react-router-dom';
import {  useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Sync } from "@material-ui/icons";
import exportFromJSON from 'export-from-json'  
  
const data = [{ foo: 'foo' }, { bar: 'bar' }]  
const fileName = 'download'  
const exportType = 'xls' 

const colors = [
  {value: 'red',    text: 'Red'   },
  {value: 'yellow', text: 'Yellow'},
  {value: 'blue',   text: 'Blue'  }
];

var sql_main = "select cartodb_id, name, gov_name, sector ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";

const sectors = [
  {name: 'Education', id: 1},
  {name: 'Environment', id: 2},
  {name: 'Inclusive Services and Technology', id: 3},
  {name: 'Health', id: 4},
]  

const options = [
{name: 'Alexandria', id: 1},
{name: 'Aswan', id: 2},
{name: 'Asyut', id: 3},
{name: 'Beheira', id: 4},
{name: 'Beni Suef', id: 5},
{name: 'Cairo', id: 6},
{name: 'Dakahlia', id: 7},
{name: 'Damietta', id: 8},
{name: 'Faiyum', id: 9},
{name: 'Gharbia', id: 10},
{name: 'Giza', id: 11},
{name: 'Ismailia', id: 12},
{name: 'Kafr El Sheikh', id: 13},
{name: 'Luxor', id: 14},
{name: 'Matruh', id: 15},
{name: 'Minya', id: 16},
{name: 'Monufia', id: 17},
{name: 'New Valley', id: 18},
{name: 'North Sinai', id: 19},
{name: 'Port Said', id: 20},
{name: 'Qalyubia', id: 21},
{name: 'Qena', id: 22},
{name: 'Red Sea', id: 23},
{name: 'Sharqia', id: 24},
{name: 'Sohag', id: 25},
{name: 'South Sinai', id: 26},
{name: 'Suez', id: 27}
]


const colourOptions = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const styleLabel = {
  marginTop:"20px",
  fontSize:"15px",
  marginLeft:"15px"
};

const background_navy = {
  background:"#2CA58D",
};
const card_header = {
  fontWeight:"bold",
  fontSize:"14px",
};
const style2 ={
  multiselectContainer: { 
    margin:"10px 10px 10px 0px",
    paddingRight:"20px"
  },
  searchBox: { // To change search box element look
    minHeight: "40px",
    maxWidth:"350px"
	
	
  },
  chips: {
     background: "#FAA63D",
  }
  
}





const useStyles = makeStyles(() => ({
  startups5: {},
}));

// const fetch = async() =>{
//   const credentials = {
//     username: "riseegypt",
//     apiKey: "7ecefb7b10b21eef2a24815d552b9bded4183933",
//     serverUrlTemplate: 'https://riseegypt.carto.com'
//   };
//   const opts = {

    
//   };
//   const fetched_data = await getData({credentials, opts});
//   // console.log(fetched_data);
//   // console.log(fetched_data[0]);
//   return fetched_data;
// }

// const gov_names = await fetch();

export default function Startups5() {


  const [open, setOpen] = useState(false);
  var [sql2, setSql2] = useState("select cartodb_id, name, gov_name, sector ,the_geom_webmercator from egypt_si_dataset_final_review_16112021");
  const [count, setCount] = useState(0);

  function ExportToExcel(){  
    exportFromJSON({ data, fileName, exportType })  
  }
  // console.log(gov_names);
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  let searchInput = React.createRef(); 
  let searchInput2 = React.createRef(); 


  // const [color, setColor] = React.useState('red');
  // const [govern, setGovern] = React.useState();
  
  //   const handleChange = e => setColor(e.target.value);
  //   const handleSubmit = e => {
  //       e.preventDefault();
  //       const data = {
  //         	color: color
  //       };
  //       const json = JSON.stringify(data);
  //       console.clear();
  //       console.log(json);
  // };
  const fetch = async() =>{
    const credentials = {
      username: "riseegypt",
      apiKey: "7ecefb7b10b21eef2a24815d552b9bded4183933",
      serverUrlTemplate: 'https://riseegypt.carto.com'
    };
    const opts = {
      // format:"CSV"
    };
    const fetched_data = await getData({credentials, opts});
    console.log(fetched_data);
    // console.log(fetched_data[0]);
    // setGovern({
    //   fetched_data
    // });
  
  }
  const hit = ()=>{
    setSql2(sql2+"change");
    console.log(sql2);
  }
  
  const governOnSelectHandler = (selectedList, selectedItem)=>{

    if(sql_main.indexOf("WHERE (gov_name")>0){
      var index = sql_main.indexOf("(gov_name");
      sql_main = insert(sql_main,"gov_name='"+selectedItem.name+"' OR ",index+1); 
      console.log(sql_main);
      // sql_main=sql_main+" WHERE sector='"+selectedItem.name+"'";
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
          startups5Source.data=  sql_main;
          dispatch(
            addSource(startups5Source)
          );
      
          dispatch(
            addLayer({
              id: STARTUPS5_LAYER_ID,
              source: startups5Source.id,
            })
          );
  };

  function governOnRemoveHandler(selectedList, selectedItem){
         
    console.log(selectedList);
    console.log(selectedItem.name);
    var sql ="";

    console.log(sql_main);
    sql_main = sql_main.replace("OR gov_name='"+selectedItem.name+"'",'');
    sql_main = sql_main.replace("OR gov_name ='"+selectedItem.name+"'",'');
    sql_main = sql_main.replace("gov_name='"+selectedItem.name+"'",'');
    sql_main = sql_main.replace("gov_name ='"+selectedItem.name+"'",'');
    
    sql_main = sql_main.replace("WHERE OR",'WHERE');
    sql_main = sql_main.replace("OR OR",'OR');
    if(sql_main == "select cartodb_id, name,gov_name ,sector , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE"){
      sql_main = "select cartodb_id, name,gov_name ,sector , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
    }
    if(sql_main == "select cartodb_id, name,gov_name ,sector , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE "){
      sql_main = "select cartodb_id, name,gov_name ,sector , the_geom_webmercator from egypt_si_dataset_final_review_16112021";
    }
    console.log("removed");
    console.log(sql_main);

    
    startups5Source.data=  sql_main;
    dispatch(
      addSource(startups5Source)
    );

    dispatch(
      addLayer({
        id: STARTUPS5_LAYER_ID,
        source: startups5Source.id,
      })
    );
};

//   function sectorOnSelectHandler(selectedList, selectedItem){
//   setOpen(true);
//    console.log(selectedList);
//    var govern = selectedList[0].name;
//    var sector_no = selectedList.length;
//    var sql="select cartodb_id, name,gov_name ,sector , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
//    for (let i = 0; i < sector_no; i++) {
//        if(i==0){
//          sql = sql+selectedList[i].name+"'";
//        }else{
//          sql = sql+"OR sector ='"+selectedList[i].name+"'";
//        }
       
//    }
//    console.log(sql);
//    startups5Source.data=  sql;
//    dispatch(
//      addSource(startups5Source)
//    );

//    dispatch(
//      addLayer({
//        id: STARTUPS5_LAYER_ID,
//        source: startups5Source.id,
//      })
//    );
// };
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
  if(sql_main.indexOf("WHERE (sector")>0){
    var index = sql_main.indexOf("(sector");
    sql_main = insert(sql_main,"sector='"+selectedItem.name+"' OR ",index+1); 
    console.log(sql_main);
    // sql_main=sql_main+" WHERE sector='"+selectedItem.name+"'";
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
  //  var sql="select cartodb_id, name,gov_name ,sector , the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
  //  for (let i = 0; i < sector_no; i++) {
  //      if(i==0){
  //        sql = sql+selectedList[i].name+"'";
  //      }else{
  //        sql = sql+"OR sector ='"+selectedList[i].name+"'";
  //      }
       
  //  }
  //  console.log(sql);
   startups5Source.data=  sql_main;
   dispatch(
     addSource(startups5Source)
   );

   dispatch(
     addLayer({
       id: STARTUPS5_LAYER_ID,
       source: startups5Source.id,
     })
   );
};

 function sectorOnRemoveHandler(selectedList, selectedItem){
         
  console.log(selectedList);
  var sql ="";
  var sector_no = selectedList.length;
  if(sector_no <1){
      sql=  "select cartodb_id, name, gov_name, sector ,the_geom_webmercator from egypt_si_dataset_final_review_16112021";
  }else{
      var sector = selectedList[0].name;
      sql="select cartodb_id, name, gov_name, sector ,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE sector='";
      for (let i = 0; i < sector_no; i++) {
          if(i==0){
            sql = sql+selectedList[i].name+"'";
          }else{
            sql = sql+"OR sector ='"+selectedList[i].name+"'";
          }
          
      }
  }
  
  console.log(sql);
  startups5Source.data=  sql;
  dispatch(
    addSource(startups5Source)
  );

  dispatch(
    addLayer({
      id: STARTUPS5_LAYER_ID,
      source: startups5Source.id,
    })
  );
};

  function onSubmit(e){
    // navigation.goBack();
    console.log('hi');
    console.log(searchInput.current.value);
    var val = searchInput.current.value;
    startups5Source.data=  "select cartodb_id, name, gov_name,sector ,the_geom_webmercator from egypt_si_dataset_final_review_16112021 WHERE gov_name ='"+val+"'"  ;
    console.log(startups5Source.data);
    dispatch(
      addSource(startups5Source)
    );

    dispatch(
      addLayer({
        id: STARTUPS5_LAYER_ID,
        source: startups5Source.id,
      })
    );
    // navigate('/'+val);
  }

  useEffect(() => {
    dispatch(addSource(startups8Source));

    dispatch(
      addLayer({
        id: STARTUPS9_LAYER_ID,
        source: startups8Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS9_LAYER_ID));
      dispatch(removeSource(startups8Source.id));
    };
  }, [dispatch]);

  useEffect(() => {
  


    dispatch(addSource(startups5Source));

    dispatch(
      addLayer({
        id: STARTUPS5_LAYER_ID,
        source: startups5Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS5_LAYER_ID));
      dispatch(removeSource(startups5Source.id));
    };
  }, [dispatch]);

  

  

  // [hygen] Add useEffect

  return (
   
    <Grid container direction='column' className={classes.startups5}>
      {/* <Grid item>Hello World</Grid> */}
      {/* <div style={{margin: '20px'}}>
        <input placeholder="search" ref={searchInput} type="text" id='search' />
        <button onClick={onSubmit} style={{marginLeft: '10px'}}>search</button>
        <button onClick={fetch} style={{marginLeft: '10px'}}>fetch</button>
      </div> */}
      <div id="accordion">

        <div className="card">
          <div className="card-header" style={background_navy}>
            <a className="card-link text-white" style={card_header} data-toggle="collapse" href="#collapseOne">
              Filters 
            </a>
          </div>
          <div id="collapseOne" className="collapse show" data-parent="#accordion">
            <div className="card-body p-0 m-0">
            <label style={styleLabel}>Governorate:
              
              <Multiselect
                
                  options={options} // Options to display in the dropdown
                  selectedValues={options[0]} // Preselected value to persist in dropdown
                  onSelect={governOnSelectHandler} // Function will trigger on select event
                  onRemove={governOnRemoveHandler} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  showCheckbox="true"
                  showArrow="true"
                  closeIcon="cancel"
                  style={style2}
                    
              />
              </label>
              <Divider></Divider>

              <label style={styleLabel}>Innovation Sector:
              
              <Multiselect
                
                  options={sectors} // Options to display in the dropdown
                  selectedValues={sectors[0]} // Preselected value to persist in dropdown
                  onSelect={sectorOnSelectHandler} // Function will trigger on select event
                  onRemove={sectorOnRemoveHandler} // Function will trigger on remove event
                  displayValue="name" // Property name to display in the dropdown options
                  showCheckbox="true"
                  showArrow="true"
                  closeIcon="cancel"
                  style={style2}
                    
              />
              </label>
            </div>
          </div>
        </div>

        <div className="card">
          
          <div className="card-header" style={background_navy}>
            <a className="card-link text-white" style={card_header} data-toggle="collapse" href="#collapse2">
              Widgets
            </a>
          </div>
          <div id="collapse2" className="collapse show" data-parent="#accordion">
            <div className="card-body p-0 m-0">
              <CategoryWidget
                id='revenueByStoreType'
                title='Revenue by store type'
                dataSource={startups5Source.id}
                column='sector'
                operationColumn='sector'
                operation={AggregationTypes.COUNT}
                // formatter={currencyFormatter}
              />
              <Divider></Divider>
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
{/* <button type="button" onClick={ExportToExcel}>Export To Excel</button>  */}
{/* <button type="button" onClick={hit}>{sql2}</button>  */}

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

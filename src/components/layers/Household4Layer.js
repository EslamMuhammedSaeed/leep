import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from "@carto/react-ui";
import {  colorBins } from "@deck.gl/carto";
import { useDispatch } from 'react-redux';
import { updateLayer } from "@carto/react-redux";

export const HOUSEHOLD4_LAYER_ID = 'household4Layer';
const color1 = [254,229,217];
const color2 = [252,174,145];
const color3 = [251,106,74];
const color4 = [222,45,38];
const color5 = [165,15,21];


export const COLORS = [
  color1,
  color2,
  color3,
  color4,
  color5,
];

export const LABELS = [
  '100',
  '500',
  '1000',
  '5000',

];

const layerConfig = {
  title: 'Landline Phone Connectivity',
  visible: true,
  switchable: false,
  legend: {
    attr: 'Average No. of Lines / 1000 Households',
    type: LEGEND_TYPES.BINS,
    labels: LABELS,
    colors: COLORS,
  },
};

export default function Household4Layer() {
  const dispatch = useDispatch();
  const { household4Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, household4Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (household4Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: HOUSEHOLD4_LAYER_ID,
      getFillColor: d => {
        
        colorBins({
          attr: layerConfig.legend.attr,
          domain: [100e6, 500e6, 1e9, 1.5e9],
          colors: COLORS,
        });
        if(d.properties.average_number_of_home_phone_lines_1000_households_2019_2020 <= 100){
          return color1; 
        }else if(d.properties.average_number_of_home_phone_lines_1000_households_2019_2020 <= 500){
          return color2;
        }else if(d.properties.average_number_of_home_phone_lines_1000_households_2019_2020 <= 1000){
          return color3;
        }else if(d.properties.average_number_of_home_phone_lines_1000_households_2019_2020 <= 5000){
          return color4;  
        }else{
          // console.log(d.properties.population_percentage_2017_census_approximated_to_2nd_decimal);
          return color5;
        }
      
      },
      pointRadiusMinPixels: 2,
      getLineColor:  [255, 255, 255],
      lineWidthMinPixels: 1,
      pickable: true,
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: HOUSEHOLD4_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        // cartoLayerProps.onDataLoad(data);
      },
      
      

      onClick: (info, event) =>{ 
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
        // console.log('Clicked:', info, event);
        console.log('Clicked:', info.object.html,event);

        var x = document.getElementsByClassName("content")[0];
        var z =x.parentNode;
        var y =z.parentNode;
        // z.style.borderColor = "red";
        // z.style.display = "block !important";
        // z.className = 'd-block';
        // z.classList.add('d-block');
        // console.log(z);
        // console.log(z.style.display);
        if(document.getElementById('custom-tooltip')){
          var elem = document.getElementById('custom-tooltip');
         elem.parentNode.removeChild(elem);
       
        }
        if(document.getElementById('custom-tooltip2')){
          var elem2 = document.getElementById('custom-tooltip2');
         elem2.parentNode.removeChild(elem2);
       
        }
          let div1 = document.createElement("div");
          div1.className = "makeStyles2-tooltip-39 d-md-block d-none"
          div1.id = "custom-tooltip";
          let attr = 'z-index: 1; position: absolute; color: rgb(160, 167, 180); background: none; padding: 0px; top: 0px; left: 0px; transform: translate('+event.center.x+'px,' +(event.center.y-40)+'px); border-color: red;'
          div1.setAttribute('style',attr);
          // div1.append("Some text");
          y.append(div1);
          let content = document.createElement("div");
          let arr5 = document.createElement("div");
          // arr5.setAttribute('style','height:20px;width:20px;z-index: 1;position: absolute;color: rgb(160, 167, 180);background: none;padding: 0px;top: 0px;left: 0px;transform: translate('+event.center.x+'px,' +(event.center.y-40)+'px);');
          // arr5.append("Some text");
          content.className = "content";
          // content.append("Some text");
          div1.append(content);
          content.innerHTML = `<button onclick="let x=document.getElementById('custom-tooltip');x.parentNode.removeChild(x);" style="position:absolute;display:flex;text-align:center;align-items:center;justify-content:center;top:-12px;right:-12px;border-radius:50%;z-index:4;background-color:white;color:black;width:29px;height:29px;overflow-x:visible;box-shadow: 0 2px 4px 0 rgb(0 0 0 / 24%);cursor: pointer;">&#x2715</button><div style="max-height:100px;overflow-y:scroll;margin-bottom:10px;box-sizing: content-box;">${info.object.html.replaceAll(':','')
          .replaceAll('average_number_of_home_phone_lines_1000_households_2019_2020','Average No. of Lines / 1000 Households')
          .replaceAll('<strong>governorate</strong>','<strong>Governorate</strong>')
          .replaceAll('<div class="pop-up">','<div class="pop-up mb-2">')
          .replaceAll('<div class="pop-up mb-2"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
          .replaceAll('<br/>','<br/><div style="min-height:5px;"></div>')}</div><div class='arrow'></div>`;
          // div1.append(arr5);
          let div5 = document.createElement("div");
          div5.className = "makeStyles2-tooltip-39 d-md-none d-block "
          div5.id = "custom-tooltip2";
          let attr2 = 'z-index: 1; position: absolute; color: rgb(160, 167, 180); background: none; padding: 0px; top: 0px; left: 0px; transform: translate('+event.center.x+'px,' +(event.center.y-105)+'px); border-color: red;'
          div5.setAttribute('style',attr2);
          // div1.append("Some text");
          y.append(div5);
          let content2 = document.createElement("div");
          let arr6 = document.createElement("div");
          // arr5.setAttribute('style','height:20px;width:20px;z-index: 1;position: absolute;color: rgb(160, 167, 180);background: none;padding: 0px;top: 0px;left: 0px;transform: translate('+event.center.x+'px,' +(event.center.y-40)+'px);');
          // arr5.append("Some text");
          content2.className = "content";
          // content.append("Some text");
          div5.append(content2);
          content2.innerHTML = `<button onclick="let x=document.getElementById('custom-tooltip2');x.classList.remove('d-block');x.classList.add('d-none');" style="position:absolute;display:flex;text-align:center;align-items:center;justify-content:center;top:-12px;right:-12px;border-radius:50%;z-index:4;background-color:white;color:black;width:29px;height:29px;overflow-x:visible;box-shadow: 0 2px 4px 0 rgb(0 0 0 / 24%);cursor: pointer;">&#x2715</button><div style="max-height:100px;overflow-y:scroll;margin-bottom:10px;box-sizing: content-box;">${info.object.html.replaceAll(':','')
          .replaceAll('average_number_of_home_phone_lines_1000_households_2019_2020','Average No. of Lines / 1000 Households')
          .replaceAll('<strong>governorate</strong>','<strong>Governorate</strong>')
          .replaceAll('<div class="pop-up">','<div class="pop-up mb-2">')
          .replaceAll('<div class="pop-up mb-2"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
          .replaceAll('<br/>','<br/><div style="min-height:5px;"></div>')}</div><div class='arrow'></div>`;
        
        
        // <div class="makeStyles-tooltip-76 d-block" style="z-index: 1; position: absolute; pointer-events: none; color: rgb(160, 167, 180); background: none; padding: 0px; top: 0px; left: 0px; display: none; transform: translate(610px, 179px); border-color: red;"><div class="content"><div class="pop-up"><strong>name</strong> Sandan<br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>gov_name</strong> Sohag<br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>sector</strong> Environment<br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>sdgs</strong> <br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>innovation_type</strong> <br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>innovation_stage</strong> <br><div style="min-height:5px;"></div></div><div class="arrow"></div></div></div>
        // z.setAttribute('style', 'display:block');

        // let p = document.createElement("p");
        // p.className = 'here';
        // p.setAttribute('style', 'color: blue;position:absolute;top:2px;bottom:500px;color:black;height:100px;width:100px');
        // p.append("Some text");
        // x.append(p);
      },
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
  }
}




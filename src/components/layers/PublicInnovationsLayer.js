import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from "@carto/react-ui";
import { updateLayer } from "@carto/react-redux";
import { colorBins } from "@deck.gl/carto";
import { useDispatch } from 'react-redux';

export const COLORS = [
  [247, 254, 174],
  [183, 230, 165],
  [124, 203, 162],
  [70, 174, 160],
  [4, 82, 117],
];

export const LABELS = [
  'Health',
  'Education',
  'Creative Industries',
  'Environment',
];
        

const layerConfig = {
  title: 'Innovation',
  visible: true,
  switchable: false,
  legend: {
    attr: 'innovation_type',
    type: LEGEND_TYPES.CATEGORY,
    labels: LABELS,
    colors: COLORS,
  },
};

export const PUBLIC_INNOVATIONS_LAYER_ID = 'publicInnovationsLayer';

export default function PublicInnovationsLayer() {
  const dispatch = useDispatch();
  const { publicInnovationsLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, publicInnovationsLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (publicInnovationsLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: PUBLIC_INNOVATIONS_LAYER_ID,
      getFillColor: d => {
        // colorBins({
        //   attr: layerConfig.legend.attr,
        //   domain: [100e6, 500e6, 1e9, 1.5e9],
        //   colors: COLORS,
        // });
        if(d.properties.sector === "Creative Industries"){
          return [255, 45, 132]; 
        }else if(d.properties.sector === "Education"){
          return [30, 70, 142];
        }else if(d.properties.sector === "Environment"){
          return [58, 139, 40];
        }else if(d.properties.sector === "Health"){
          return [233, 78, 36];
        }else if(d.properties.sector === "Inclusive Services and Technology"){
          return [255, 168, 38];
        }else if(d.properties.sector === "Infrastructure and Transport"){
          return [3, 117, 125];
        }else if(d.properties.sector === "Tourism"){
          return [83, 186, 193];
        }else{
          return [138, 43, 226];
        }
        
      },
      // onDataLoad: (data) => {
      //     dispatch(
      //       updateLayer({
      //         id: STARTUPS10_LAYER_ID,
      //         layerAttributes: { ...layerConfig },
      //       })
      //     );
      //     // cartoLayerProps.onDataLoad(data);
      // },
      pointRadiusMinPixels: 4,
      getLineColor: [255, 255, 255],
      lineWidthMinPixels: 1,
      pickable: true,
      
      onHover: (info,event) => {
        const d= document.getElementById('deckgl-overlay');
        console.log(d);
        // d.onmousedown = function(event) {
        //   console.log('here u are');
        //   if(document.getElementById('custom-tooltip')){
        //         // console.log('jjjj');
        //         let div2 = document.getElementById('custom-tooltip');
        //         div2.classList.remove('d-block');
        //         div2.classList.add('d-none');
        //       }
        // }
        // d.onclick = function(event) {
        //   console.log('here u are');
         
        // }
        // d.onmouseup = function(event) {
        //   console.log('here u are3');
         
        // }
        // d.onmousemove = function(event) {
        //   console.log('here u are4');
         
        // }
        // console.log(info,event);
        // if(document.getElementById('custom-tooltip')){
        //   let div2 = document.getElementById('custom-tooltip');
        //   div2.classList.remove('d-none');
        // }
        
        
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
        
      },
      // onDrag: (info,event) => {
      //   console.log('drag:',info,event);
        
        
      // },
      // onClick: (info)=>{
      //   console.log(info);

      //   console.log('here5');
      //   if (info?.object) {
      //     info.object = {
      //       html: htmlForFeature({ feature: info.object }),
      //       style: {},
      //     };
      //   }
      // },
      onClick: (info, event) =>{ 
        const d= document.getElementById('deckgl-overlay');
        console.log(d);
        d.onmousedown = function(event) {
          console.log('here u are');
          if(document.getElementById('custom-tooltip2')){
                // console.log('jjjj');
                let div2 = document.getElementById('custom-tooltip2');
                div2.classList.remove('d-block');
                div2.classList.add('d-none');
            }
        }
        d.onclick = function(event) {
          console.log('here u are');
          if(document.getElementById('custom-tooltip2')){
            // console.log('jjjj');
            let div2 = document.getElementById('custom-tooltip2');
            div2.classList.remove('d-block');
            div2.classList.add('d-none');
        }
         
        }
       
        
        

      //   d.ontouchstart = function(event) {
      //     console.log('here u are4');
      //     if(document.getElementById('custom-tooltip2')){
      //       // console.log('jjjj');
      //       let div2 = document.getElementById('custom-tooltip2');
      //       div2.classList.remove('d-block');
      //       div2.classList.add('d-none');
      //   }
      // }
         
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
        // else{
        //   let div1 = document.createElement("div");
        //   div1.className = "makeStyles2-tooltip-39 d-block"
        //   div1.id = "custom-tooltip";
        //   let attr = 'z-index: 1; position: absolute; color: rgb(160, 167, 180); background: none; padding: 0px; top: 0px; left: 0px; transform: translate('+event.center.x+'px,' +(event.center.y-40)+'px); border-color: red;'
        //   div1.setAttribute('style',attr);
        //   // div1.append("Some text");
        //   y.append(div1);
        //   let content = document.createElement("div");
        //   let arr5 = document.createElement("div");
        //   // arr5.setAttribute('style','height:20px;width:20px;z-index: 1;position: absolute;color: rgb(160, 167, 180);background: none;padding: 0px;top: 0px;left: 0px;transform: translate('+event.center.x+'px,' +(event.center.y-40)+'px);');
        //   // arr5.append("Some text");
        //   content.className = "content";
        //   // content.append("Some text");
        //   div1.append(content);
        //   content.innerHTML = `<button onclick="let x=document.getElementById('custom-tooltip');x.classList.remove('d-block');x.classList.add('d-none');" style="position:absolute;display:flex;text-align:center;align-items:center;justify-content:center;top:-12px;right:-12px;border-radius:50%;z-index:4;background-color:white;color:black;width:29px;height:29px;overflow-x:visible;box-shadow: 0 2px 4px 0 rgb(0 0 0 / 24%);cursor: pointer;">&#x2715</button><div style="max-height:100px;overflow-y:scroll;margin-bottom:10px;box-sizing: content-box;">${info.object.html.replaceAll(':','')
        //   .replaceAll('poverty_percentage_2017_2018','Poverty percentage')
        //   .replaceAll('<strong>name</strong>','<strong>Name</strong>')
        //   .replaceAll('<strong>gov_name</strong>','<strong>Governorate</strong>')
        //   .replaceAll('<div class="pop-up">','<div class="pop-up mb-2">')
        //   .replaceAll('<div class="pop-up mb-2"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
        //   .replaceAll('<br/>','<br/><div style="min-height:5px;"></div>')}</div><div class='arrow'></div>`;
        //   // div1.append(arr5);
        // }
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
          content.innerHTML = `<button onclick="let x=document.getElementById('custom-tooltip');x.parentNode.removeChild(x);" style="position:absolute;display:flex;text-align:center;align-items:center;justify-content:center;top:-12px;right:-12px;border-radius:50%;z-index:4;background-color:white;color:black;width:29px;height:29px;overflow-x:visible;box-shadow: 0 2px 4px 0 rgb(0 0 0 / 24%);cursor: pointer;">&#x2715</button><div style="max-height:100px;overflow-y:scroll;margin-bottom:10px;box-sizing: content-box;">${info.object.html.replaceAll(': ','')
          .replaceAll('poverty_percentage_2017_2018','Poverty percentage')
          .replaceAll('<strong>name</strong>','<strong>Name</strong>')
          .replaceAll('<strong>sector_primary_secondary</strong>','<div><strong class="d-inline">Sector</strong><span class="ml-1" style="font-size:9px;color:rgb(224, 224, 224);">(Primary, Secondary)<span></div>')
          .replaceAll('<strong>sub_sector</strong>','<div><strong class="d-inline">Sub-Sector</strong><span class="ml-1" style="font-size:9px;color:rgb(224, 224, 224);">(Primary, Secondary)<span></div>')
          .replaceAll('<strong>sdgs</strong>','<strong>SDGs</strong>')
          .replaceAll('<strong>year_founded_if_provided</strong>','<strong>Year Founded</strong>')
          .replaceAll('<strong>website</strong>','<strong>Website</strong>')
          .replaceAll('<strong>facebook_link</strong>','<strong>Facebook</strong>')

          
          // .replaceAll('<strong>gov_name</strong>','<strong>Governorate</strong>')
          .replaceAll('<div class="pop-up">','<div class="pop-up mb-2">')
          .replaceAll('<div class="pop-up mb-2"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
          .replaceAll('<div class="pop-up mb-2"><strong>cartodb_id','<div class="pop-up" style="display:none"><strong>cartodb_id')
          .replaceAll('<div class="pop-up mb-2"><strong>sector','<div class="pop-up" style="display:none"><strong>sector')
          .replaceAll('<div class="pop-up mb-2"><strong>gov_name','<div class="pop-up" style="display:none"><strong>gov_name')
          .replaceAll('<div class="pop-up mb-2"><strong>description','<div class="pop-up" style="display:none"><strong>description')
          .replaceAll('<div class="pop-up mb-2"><strong>country','<div class="pop-up" style="display:none"><strong>country')
          .replaceAll('<div class="pop-up mb-2"><strong>full_address','<div class="pop-up" style="display:none"><strong>full_address')
          .replaceAll('<div class="pop-up mb-2"><strong>innovation_type','<div class="pop-up" style="display:none"><strong>innovation_type')
          .replaceAll('<div class="pop-up mb-2"><strong>innovation_stage','<div class="pop-up" style="display:none"><strong>innovation_stage')
          .replaceAll('<div class="pop-up mb-2"><strong>active_inactive_status','<div class="pop-up" style="display:none"><strong>active_inactive_status')
          .replaceAll('<div class="pop-up mb-2"><strong>operation_cities_governorates','<div class="pop-up" style="display:none"><strong>operation_cities_governorates')
          .replaceAll('<div class="pop-up mb-2"><strong>area_of_social_impact','<div class="pop-up" style="display:none"><strong>area_of_social_impact')
          .replaceAll('<div class="pop-up mb-2"><strong>no_of_female_founder_co_founder','<div class="pop-up" style="display:none"><strong>no_of_female_founder_co_founder')
          .replaceAll('<div class="pop-up mb-2"><strong>organisation_phone_no','<div class="pop-up" style="display:none"><strong>organisation_phone_no')
          .replaceAll('<div class="pop-up mb-2"><strong>organisation_email','<div class="pop-up" style="display:none"><strong>organisation_email')
          .replaceAll('<div class="pop-up mb-2"><strong>stage_investment_readiness','<div class="pop-up" style="display:none"><strong>stage_investment_readiness')

          .replaceAll('<br/>','<br/><div style="min-height:5px;"></div>')}</div><div class='arrow'></div>`;
          
          
          
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
          content2.innerHTML = `<button onclick="let x=document.getElementById('custom-tooltip2');x.classList.remove('d-block');x.classList.add('d-none');" style="position:absolute;display:flex;text-align:center;align-items:center;justify-content:center;top:-12px;right:-12px;border-radius:50%;z-index:4;background-color:white;color:black;width:29px;height:29px;overflow-x:visible;box-shadow: 0 2px 4px 0 rgb(0 0 0 / 24%);cursor: pointer;">&#x2715</button><div style="max-height:100px;overflow-y:scroll;margin-bottom:10px;box-sizing: content-box;">${info.object.html.replaceAll(': ','')
          .replaceAll('poverty_percentage_2017_2018','Poverty percentage')
          .replaceAll('<strong>name</strong>','<strong>Name</strong>')
          .replaceAll('<strong>sector_primary_secondary</strong>','<div><strong class="d-inline">Sector</strong><span class="ml-1" style="font-size:9px;color:rgb(224, 224, 224);">(Primary, Secondary)<span></div>')
          .replaceAll('<strong>sub_sector</strong>','<div><strong class="d-inline">Sub-Sector</strong><span class="ml-1" style="font-size:9px;color:rgb(224, 224, 224);">(Primary, Secondary)<span></div>')
          .replaceAll('<strong>sdgs</strong>','<strong>SDGs</strong>')
          .replaceAll('<strong>year_founded_if_provided</strong>','<strong>Year Founded</strong>')
          .replaceAll('<strong>website</strong>','<strong>Website</strong>')
          .replaceAll('<strong>facebook_link</strong>','<strong>Facebook</strong>')

          
          // .replaceAll('<strong>gov_name</strong>','<strong>Governorate</strong>')
          .replaceAll('<div class="pop-up">','<div class="pop-up mb-2">')
          .replaceAll('<div class="pop-up mb-2"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
          .replaceAll('<div class="pop-up mb-2"><strong>cartodb_id','<div class="pop-up" style="display:none"><strong>cartodb_id')
          .replaceAll('<div class="pop-up mb-2"><strong>sector','<div class="pop-up" style="display:none"><strong>sector')
          .replaceAll('<div class="pop-up mb-2"><strong>gov_name','<div class="pop-up" style="display:none"><strong>gov_name')
          .replaceAll('<div class="pop-up mb-2"><strong>description','<div class="pop-up" style="display:none"><strong>description')
          .replaceAll('<div class="pop-up mb-2"><strong>country','<div class="pop-up" style="display:none"><strong>country')
          .replaceAll('<div class="pop-up mb-2"><strong>full_address','<div class="pop-up" style="display:none"><strong>full_address')
          .replaceAll('<div class="pop-up mb-2"><strong>innovation_type','<div class="pop-up" style="display:none"><strong>innovation_type')
          .replaceAll('<div class="pop-up mb-2"><strong>innovation_stage','<div class="pop-up" style="display:none"><strong>innovation_stage')
          .replaceAll('<div class="pop-up mb-2"><strong>active_inactive_status','<div class="pop-up" style="display:none"><strong>active_inactive_status')
          .replaceAll('<div class="pop-up mb-2"><strong>operation_cities_governorates','<div class="pop-up" style="display:none"><strong>operation_cities_governorates')
          .replaceAll('<div class="pop-up mb-2"><strong>area_of_social_impact','<div class="pop-up" style="display:none"><strong>area_of_social_impact')
          .replaceAll('<div class="pop-up mb-2"><strong>no_of_female_founder_co_founder','<div class="pop-up" style="display:none"><strong>no_of_female_founder_co_founder')
          .replaceAll('<div class="pop-up mb-2"><strong>organisation_phone_no','<div class="pop-up" style="display:none"><strong>organisation_phone_no')
          .replaceAll('<div class="pop-up mb-2"><strong>organisation_email','<div class="pop-up" style="display:none"><strong>organisation_email')
          .replaceAll('<div class="pop-up mb-2"><strong>stage_investment_readiness','<div class="pop-up" style="display:none"><strong>stage_investment_readiness')

          .replaceAll('<div class="pop-up mb-2"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
          .replaceAll('<br/>','<br/><div style="min-height:5px;"></div>')}</div><div class='arrow'></div>`;
          
        // <div class="makeStyles-tooltip-76 d-block" style="z-index: 1; position: absolute; pointer-events: none; color: rgb(160, 167, 180); background: none; padding: 0px; top: 0px; left: 0px; display: none; transform: translate(610px, 179px); border-color: red;"><div class="content"><div class="pop-up"><strong>name</strong> Sandan<br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>gov_name</strong> Sohag<br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>sector</strong> Environment<br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>sdgs</strong> <br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>innovation_type</strong> <br><div style="min-height:5px;"></div></div><div class="pop-up"><strong>innovation_stage</strong> <br><div style="min-height:5px;"></div></div><div class="arrow"></div></div></div>
        z.setAttribute('style', 'display:block');

        let p = document.createElement("p");
        p.className = 'here';
        p.setAttribute('style', 'color: blue;position:absolute;top:2px;bottom:500px;color:black;height:100px;width:100px');
        p.append("Some text");
        x.append(p);
      },
    });
  }
}

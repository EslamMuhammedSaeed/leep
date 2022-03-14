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

export const POLLUTION_LAYER_ID = 'pollutionLayer';

export default function PollutionLayer() {
  const dispatch = useDispatch();
  const { pollutionLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, pollutionLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (pollutionLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: POLLUTION_LAYER_ID,
      getFillColor: d => {
        return [254,153,41];
        
      },
      pointRadiusMinPixels: 7,
      getLineColor: [255, 255, 255],
      lineWidthMinPixels: 1,
      pickable: true,
      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },

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
       
        
        if(document.getElementById('custom-tooltip')){
          var elem = document.getElementById('custom-tooltip');
         elem.parentNode.removeChild(elem);
          
        }
        if(document.getElementById('custom-tooltip2')){
          var elem = document.getElementById('custom-tooltip2');
         elem.parentNode.removeChild(elem);
          
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
          .replaceAll('sulfur_dioxide_so2_annual_average_concentrations_microgram_m','Sulfur Dioxide Concentrations')

          .replaceAll('nitrogen_dioxide_no2_annual_average_concentrations_microgram','Nitrogen Dioxide Concentrations')

          .replaceAll('solid_particles_with_a_diameter_less_than_10_micrometers_pm10','Particles with Diameter Less Than 10 Micrometers Concentrations')
          
          .replaceAll('<strong>observation_area</strong>','<strong>Observation Area</strong>')
          .replaceAll('<div class="pop-up">','<div class="pop-up mb-2">')
          .replaceAll('<div class="pop-up mb-2"><strong>longitude','<div class="pop-up" style="display:none"><strong>lonitude')
          .replaceAll('<br/>','<br/><div style="min-height:5px;"></div>')}</div><div class='arrow'></div>`;
          
          
          
          let div5 = document.createElement("div");
          div5.className = "makeStyles2-tooltip-39 d-md-none d-block "
          div5.id = "custom-tooltip2";
          let attr2 = 'z-index: 1; position: absolute; color: rgb(160, 167, 180); background: none; padding: 0px; top: 0px; left: 0px; transform: translate('+event.center.x+'px,' +(event.center.y-40)+'px); border-color: red;'
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
          .replaceAll('sulfur_dioxide_so2_annual_average_concentrations_microgram_m','Sulfur Dioxide Concentrations')

          .replaceAll('nitrogen_dioxide_no2_annual_average_concentrations_microgram','Nitrogen Dioxide Concentrations')

          .replaceAll('solid_particles_with_a_diameter_less_than_10_micrometers_pm10','Particles with Diameter Less Than 10 Micrometers Concentrations')
          
          .replaceAll('<strong>observation_area</strong>','<strong>Observation Area</strong>')
          .replaceAll('<div class="pop-up">','<div class="pop-up mb-2">')
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

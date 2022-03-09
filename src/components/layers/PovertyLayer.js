import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';

import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from "@carto/react-ui";
import {  colorBins } from "@deck.gl/carto";
import { useDispatch } from 'react-redux';
import { updateLayer } from "@carto/react-redux";


export const POVERTY_LAYER_ID = 'povertyLayer';
export const COLORS = [
  [224,236,244],
  [158,188,218],
  [140,107,177],
  [129,15,124],
  [77,0,75],
];

export const LABELS = [
  '10%',
  '30%',
  '50%',
  '70%',
  
];

const layerConfig = {
  title: 'Poverty Percentage',
  visible: true,
  switchable: false,
  legend: {
    attr: 'unemployment rate',
    type: LEGEND_TYPES.BINS,
    labels: LABELS,
    colors: COLORS,
  },
};


export default function PovertyLayer() {
  const dispatch = useDispatch();
  const { povertyLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, povertyLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (povertyLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: POVERTY_LAYER_ID,
      getFillColor: d => {
        colorBins({
          attr: layerConfig.legend.attr,
          domain: [100e6, 500e6, 1e9, 1.5e9],
          colors: COLORS,
        });
        if(d.properties.poverty_percentage_2017_2018 <= 10){
          return [224,236,244]; 
        }else if(d.properties.poverty_percentage_2017_2018 <= 30){
          return [158,188,218];
        }else if(d.properties.poverty_percentage_2017_2018 <= 50){
          return [140,107,177];
        }else if(d.properties.poverty_percentage_2017_2018 <= 70){
          return [129,15,124];  
        }else{
          return [77,0,75];
        }
      
      },
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: POVERTY_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        // cartoLayerProps.onDataLoad(data);
      },
      pointRadiusMinPixels: 2,
      getLineColor:  [255, 255, 255],
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
    });
  }
}

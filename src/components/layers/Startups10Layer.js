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

export const STARTUPS10_LAYER_ID = 'startups10Layer';

export default function Startups10Layer() {
  const dispatch = useDispatch();
  const { startups10Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, startups10Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (startups10Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STARTUPS10_LAYER_ID,
      // pointType:'text',
      // getText: d => d.properties.gov_name,
      // getFillColor: colorBins({
      //   attr: layerConfig.legend.attr,
      //   domain: [100e6, 500e6, 1e9, 1.5e9],
      //   colors: COLORS,
      // }),

      // onDataLoad: (data) => {
      //   dispatch(
      //     updateLayer({
      //       id: STARTUPS10_LAYER_ID,
      //       layerAttributes: { ...layerConfig },
      //     })
      //   );
      //   // cartoLayerProps.onDataLoad(data);
      // },
      getFillColor: d => {
        if(d.properties.sector === "Creative Industries"){
          return [138, 43, 226]; 
        }else if(d.properties.sector === "Education"){
          return [165, 42, 42];
        }else if(d.properties.sector === "Environment"){
          return [34, 139, 34];
        }else if(d.properties.sector === "Health"){
          return [0, 135 , 251];
        }else if(d.properties.sector === "Inclusive Services AND Technology"){
          return [255, 189 , 150];
        }else if(d.properties.sector === "Infrastructure and Transport"){
          return [105, 105, 105];
        }else if(d.properties.sector === "Tourism"){
          return [255, 99, 71];
        }else{
          return [245, 245, 245];
        }
      
      },
      pointRadiusMinPixels: 4,
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
    });
  }
}

import { useSelector } from 'react-redux';
// import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import { LEGEND_TYPES } from "@carto/react-ui";
import { updateLayer } from "@carto/react-redux";
import { CartoLayer, colorBins } from "@deck.gl/carto";
import { useDispatch } from 'react-redux';


export const UNEMPLOYMENT_LAYER_ID = 'unemploymentLayer';

export const COLORS = [
  [0, 255, 191],
  [0, 179, 134],
  [0, 102, 77],
  [0, 51, 38],
  [0, 26, 19],
];

export const LABELS = [
  '5%',
  '10%',
  '15%',
  '20%',
  
];

const layerConfig = {
  title: 'Unemployment Rate',
  visible: true,
  switchable: false,
  legend: {
    attr: 'unemployment rate',
    type: LEGEND_TYPES.BINS,
    labels: LABELS,
    colors: COLORS,
  },
};
export default function UnemploymentLayer() {
  const dispatch = useDispatch();
  const { unemploymentLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, unemploymentLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (unemploymentLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: UNEMPLOYMENT_LAYER_ID,
      // getFillColor: colorBins({
      //   attr: layerConfig.legend.attr,
      //   domain: [100e6, 500e6, 1e9, 1.5e9],
      //   colors: COLORS,
      // }),
      
      getFillColor: d => {
        colorBins({
          attr: layerConfig.legend.attr,
          domain: [100e6, 500e6, 1e9, 1.5e9],
          colors: COLORS,
        });
        if(d.properties.poverty_percentage_2017_2018 <= 5){
          return [0, 255, 191]; 
        }else if(d.properties.poverty_percentage_2017_2018 <= 10){
          return [0, 179, 134];
        }else if(d.properties.poverty_percentage_2017_2018 <= 15){
          return [0, 102, 77];
        }else if(d.properties.poverty_percentage_2017_2018 <= 20){
          return [0, 51, 38];  
        }else{
          return [0, 26, 19];
        }
      },
      onDataLoad: (data) => {
        dispatch(
          updateLayer({
            id: UNEMPLOYMENT_LAYER_ID,
            layerAttributes: { ...layerConfig },
          })
        );
        // cartoLayerProps.onDataLoad(data);
      },
      pointRadiusMinPixels: 2,
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

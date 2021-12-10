import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const UNEMPLOYMENT_LAYER_ID = 'unemploymentLayer';

export default function UnemploymentLayer() {
  const { unemploymentLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, unemploymentLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (unemploymentLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: UNEMPLOYMENT_LAYER_ID,
      getFillColor: d => {
        if(d.properties.poverty_percentage_2017_2018 <= 5){
          return [0, 255, 191]; 
        }else if(d.properties.poverty_percentage_2017_2018 <= 10){
          return [0, 179, 134];
        }else if(d.properties.poverty_percentage_2017_2018 <= 20){
          return [0, 102, 77];
        }else if(d.properties.poverty_percentage_2017_2018 <= 40){
          return [0, 51, 38];  
        }else{
          return [0, 26, 19];
        }
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

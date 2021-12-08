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
          return [235, 247, 227]; 
        }else if(d.properties.poverty_percentage_2017_2018 <= 10){
          return [155, 215, 112];
        }else if(d.properties.poverty_percentage_2017_2018 <= 20){
          return [102, 176, 50];
        }else if(d.properties.poverty_percentage_2017_2018 <= 40){
          return [55, 95, 27];  
        }else{
          return [27, 52, 9];
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

import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const POVERTY_LAYER_ID = 'povertyLayer';

export default function PovertyLayer() {
  const { povertyLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, povertyLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (povertyLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: POVERTY_LAYER_ID,
      getFillColor: d => {
        if(d.properties.poverty_percentage_2017_2018 <= 10){
          return [235, 247, 227]; 
        }else if(d.properties.poverty_percentage_2017_2018 <= 30){
          return [155, 215, 112];
        }else if(d.properties.poverty_percentage_2017_2018 <= 50){
          return [102, 176, 50];
        }else if(d.properties.poverty_percentage_2017_2018 <= 70){
          return [55, 95, 27];  
        }else{
          return [27, 52, 9];
        }
      
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

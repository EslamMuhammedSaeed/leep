import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const STARTUPS10_LAYER_ID = 'startups10Layer';

export default function Startups10Layer() {
  const { startups10Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, startups10Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (startups10Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STARTUPS10_LAYER_ID,
      // pointType:'text',
      // getText: d => d.properties.gov_name,
      getFillColor: d => {
        if(d.properties.sector === "Education"){
          return [242, 148, 10]; 
        }else if(d.properties.sector === "Environment"){
          return [158, 205, 94];
        }else if(d.properties.sector === "Health"){
          return [0, 135 , 251];
        }else{
          return [255, 189 , 150];
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

import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const STARTUPS9_LAYER_ID = 'startups9Layer';

export default function Startups9Layer() {
  const { startups9Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, startups9Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (startups9Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STARTUPS9_LAYER_ID,
      getFillColor: d => {console.log(d.properties.cartodb_id*40/100);return [30,(d.properties.cartodb_id*5/100)*94,50]},
      pointRadiusMinPixels: 2,
      opacity:1,
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

import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import {PolygonLayer} from '@deck.gl/layers';
import htmlForFeature from 'utils/htmlForFeature';

export const STARTUPS7_LAYER_ID = 'startups7Layer';

export default function Startups7Layer() {
  const { startups7Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, startups7Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (startups7Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STARTUPS7_LAYER_ID,
      opacity:0.5,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 2,
      getLineColor: [255, 0, 0],
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

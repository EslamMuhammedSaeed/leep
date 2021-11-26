import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const STARTUPS11_LAYER_ID = 'startups11Layer';

export default function Startups11Layer() {
  const { startups11Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, startups11Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (startups11Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: STARTUPS11_LAYER_ID,
      getFillColor: [255,255,0],
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

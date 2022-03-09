import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const SDG2_LAYER_ID = 'sdg2Layer';

export default function Sdg2Layer() {
  const { sdg2Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, sdg2Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (sdg2Layer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: SDG2_LAYER_ID,
      getFillColor: [241, 109, 122],
      pointRadiusMinPixels: 0,
      getLineColor: [255, 0, 0],
      lineWidthMinPixels: 0,
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

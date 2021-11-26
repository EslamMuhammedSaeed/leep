import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';

export const BASEMAP_LAYER_ID = 'basemapLayer';

export default function BasemapLayer() {
  const { basemapLayer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, basemapLayer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });

  if (basemapLayer && source) {
    return new CartoLayer({
      ...cartoLayerProps,
      id: BASEMAP_LAYER_ID,
      getFillColor: [44, 165, 141],
      pointRadiusMinPixels: 2,
      getLineColor: [225, 241, 226],
      lineWidthMinPixels: 1.1,
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

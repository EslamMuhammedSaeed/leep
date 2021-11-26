import { useSelector } from 'react-redux';
import { CartoLayer } from '@deck.gl/carto';
import { selectSourceById } from '@carto/react-redux';
import { useCartoLayerProps } from '@carto/react-api';
import htmlForFeature from 'utils/htmlForFeature';
import {PolygonLayer} from '@deck.gl/layers';


export const STARTUPS5_LAYER_ID = 'startups5Layer';

export default function Startups5Layer() {
  const { startups5Layer } = useSelector((state) => state.carto.layers);
  const source = useSelector((state) => selectSourceById(state, startups5Layer?.source));
  const cartoLayerProps = useCartoLayerProps({ source });
  const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

  if (startups5Layer && source) { 
    return new CartoLayer({
      ...cartoLayerProps,
      id: STARTUPS5_LAYER_ID,
      
      getFillColor: [158, 205, 94],
      pointRadiusMinPixels: 4,
      getLineColor: [53, 167, 141],
      lineWidthMinPixels: 1,
      pickable: true,
      
      
    lineCapRounded: true,
    stroked: true,
    filled: true,

      onHover: (info) => {
        if (info?.object) {
          info.object = {
            html: htmlForFeature({ feature: info.object }),
            style: {},
          };
        }
      },
    });
    // return  new PolygonLayer({
    //   id: 'PolygonLayer',
    //   data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-zipcodes.json',
      
    //   /* props from PolygonLayer class */
      
    //   // elevationScale: 1,
    //   extruded: true,
    //   filled: true,
    //   getElevation: d => d.population / d.area / 10,
    //   getFillColor: d => [d.population / d.area / 60, 140, 0],
    //   getLineColor: [80, 80, 80],
    //   getLineWidth: d => 1,
    //   getPolygon: d => d.contour,
    //   // lineJointRounded: false,
    //   // lineMiterLimit: 4,
    //   // lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
    //   lineWidthMinPixels: 1,
    //   // lineWidthScale: 1,
    //   // lineWidthUnits: 'meters',
    //   // material: true,
    //   stroked: true,
    //   wireframe: true,
      
    //   /* props inherited from Layer class */
      
    //   // autoHighlight: false,
    //   // coordinateOrigin: [0, 0, 0],
    //   // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
    //   // highlightColor: [0, 0, 128, 128],
    //   // modelMatrix: null,
    //   // opacity: 1,
    //   pickable: true,
    //   // visible: true,
    //   // wrapLongitude: false,
    // });
  }
}

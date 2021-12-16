import { VOYAGER } from '@carto/react-basemaps';
import { DARK_MATTER } from '@carto/react-basemaps';
import { POSITRON } from '@carto/react-basemaps';
import { API_VERSIONS } from '@deck.gl/carto';

export const initialState = {
  viewState: {
    latitude: 27.299674,
    longitude: 29.518923,
    zoom: 5,
    pitch: 0,
    bearing: 0,
    dragRotate: false,
  },
  basemap: POSITRON,
  credentials: {
    apiVersion: API_VERSIONS.V2,
    username: 'riseegypt',
    // username: 'eslammuhammed',
    apiKey: '7ecefb7b10b21eef2a24815d552b9bded4183933',
    // api: '0e2d7f78682e654bb64917c8415f8c87f0d043a8',
    serverUrlTemplate: 'https://riseegypt.carto.com',
    // serverUrlTemplate: 'https://.eslammuhammed.com',
  },
  googleApiKey: '', // only required when using a Google Basemap
  googleMapId: '', // only required when using a Google Custom Basemap
};

export const oauthInitialState = {
  oauthApp: {
    clientId: 'TYPE HERE YOUR OAUTH CLIENT ID',
    scopes: [
      'user:profile', // to load avatar photo
    ],
    authorizeEndPoint: 'https://carto.com/oauth2/authorize', // only valid if keeping https://localhost:3000/oauthCallback
  },
  token: null,
  userInfo: null,
};

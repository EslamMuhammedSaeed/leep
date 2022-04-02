import { lazy } from 'react';
import { OAuthCallback } from '@carto/react-auth';
import ProtectedRoute from 'components/common/ProtectedRoute';
import DefaultView from 'components/common/DefaultView';

const Main = lazy(() => import('components/views/main/Main'));
const NotFound = lazy(() => import('components/views/NotFound'));
const Login = lazy(() => import('components/views/Login'));
const Startups = lazy(() => import('components/views/Startups.js'));
const Startups2 = lazy(() => import('components/views/Startups2.js'));
const Startups3 = lazy(() => import('components/views/Startups3.js'));
const Startups4 = lazy(() => import('components/views/Startups4.js'));
const Startups5 = lazy(() => import('components/views/Startups5.js'));
const Startups6 = lazy(() => import('components/views/Startups6.js'));
const Startups8 = lazy(() => import('components/views/Startups8.js'));
const Public = lazy(() => import('components/views/Public.js'));
// [hygen] Import views

export const ROUTE_PATHS = {
  LOGIN: '/login',
  DEFAULT: '/',
  OAUTH: '/oauthCallback',
  NOT_FOUND: '404',
  STARTUPS: '/startups',
  STARTUPS2: '/startups2',
  STARTUPS3: '/stratups3',
  STARTUPS4: '/startups4',
  STARTUPS5: '/startups5',
  STARTUPS6: '/startups6',
  STARTUPS8: '/startups8',
  PUBLIC: '/public',
  // [hygen] Add path routes
};

const routes = [
  {
    path: ROUTE_PATHS.DEFAULT,
    element: (
      <ProtectedRoute>
        <DefaultView>
          <Main />
        </DefaultView>
      </ProtectedRoute>
    ),
    children: [
      // { path: '/', element: <Navigate to='/<your default view>' /> },
      { path: ROUTE_PATHS.STARTUPS, element: <Startups /> },
      { path: ROUTE_PATHS.STARTUPS2, element: <Startups2 /> },
      { path: ROUTE_PATHS.STARTUPS3, element: <Startups3 /> },
      { path: ROUTE_PATHS.STARTUPS4, element: <Startups4 /> },
      { path: ROUTE_PATHS.STARTUPS5, element: <Startups5 /> },
      { path: ROUTE_PATHS.STARTUPS6, element: <Startups6 /> },
      { path: ROUTE_PATHS.STARTUPS8, element: <Startups8 /> },
      { path: ROUTE_PATHS.PUBLIC, element: <Public /> },
      // [hygen] Add routes
    ],
  },
  { path: ROUTE_PATHS.OAUTH, element: <OAuthCallback /> },
  { path: ROUTE_PATHS.LOGIN, element: <Login /> },
  {
    path: '*',
    element: (
      <DefaultView>
        <NotFound />
      </DefaultView>
    ),
  },
];

export default routes;

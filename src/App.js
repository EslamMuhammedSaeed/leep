import { useRoutes } from 'react-router-dom';
import { CssBaseline, Grid, makeStyles, ThemeProvider } from '@material-ui/core';
import routes from './routes';
// import theme from 'theme';
import {
  createTheme as createMuiTheme,
  responsiveFontSizes
} from '@material-ui/core/styles';
import LazyLoadRoute from 'components/common/LazyLoadRoute';
import { cartoThemeOptions } from '@carto/react-ui';

// cartoThemeOptions.palette.primary.main = "#676767";
// cartoThemeOptions.palette.primary.main = "#2CA58D";
cartoThemeOptions.palette.primary.main = "#343a40";
let theme = createMuiTheme(cartoThemeOptions);


const useStyles = makeStyles(() => ({
  app: {
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}));

export default function App() {
  const routing = useRoutes(routes);
  const classes = useStyles();
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction='column' className={classes.app}>
        <LazyLoadRoute>{routing}</LazyLoadRoute>
      </Grid>
    </ThemeProvider>
  );
}

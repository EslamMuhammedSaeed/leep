import { useEffect } from 'react';
import startups6Source from 'data/sources/startups6Source';
import { STARTUPS6_LAYER_ID } from 'components/layers/Startups6Layer';
import { useDispatch } from 'react-redux';
import {
  addLayer,
  removeLayer,
  addSource,
  removeSource,
} from '@carto/react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  startups6: {},
}));

export default function Startups6() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(startups6Source));

    dispatch(
      addLayer({
        id: STARTUPS6_LAYER_ID,
        source: startups6Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS6_LAYER_ID));
      dispatch(removeSource(startups6Source.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.startups6}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}

import { useEffect } from 'react';
import startups4Source from 'data/sources/startups4Source';
import { STARTUPS4_LAYER_ID } from 'components/layers/Startups4Layer';
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
  startups4: {},
}));

export default function Startups4() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(startups4Source));

    dispatch(
      addLayer({
        id: STARTUPS4_LAYER_ID,
        source: startups4Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS4_LAYER_ID));
      dispatch(removeSource(startups4Source.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.startups4}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}

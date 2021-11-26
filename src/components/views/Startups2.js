import { useEffect } from 'react';
import startups2Source from 'data/sources/startups2Source';
import { STARTUPS2_LAYER_ID } from 'components/layers/Startups2Layer';
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
  startups2: {},
}));

export default function Startups2() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(startups2Source));

    dispatch(
      addLayer({
        id: STARTUPS2_LAYER_ID,
        source: startups2Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS2_LAYER_ID));
      dispatch(removeSource(startups2Source.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.startups2}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}

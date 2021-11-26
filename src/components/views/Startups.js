import { useEffect } from 'react';
import startupsSource from 'data/sources/startupsSource';
import { STARTUPS_LAYER_ID } from 'components/layers/StartupsLayer';
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
  startups: {},
}));

export default function Startups() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(startupsSource));

    dispatch(
      addLayer({
        id: STARTUPS_LAYER_ID,
        source: startupsSource.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS_LAYER_ID));
      dispatch(removeSource(startupsSource.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.startups}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}

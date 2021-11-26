import { useEffect } from 'react';
import startups3Source from 'data/sources/startups3Source';
import { STARTUPS3_LAYER_ID } from 'components/layers/Startups3Layer';
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
  startups3: {},
}));

export default function Startups3() {
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(addSource(startups3Source));

    dispatch(
      addLayer({
        id: STARTUPS3_LAYER_ID,
        source: startups3Source.id,
      }),
    );

    return () => {
      dispatch(removeLayer(STARTUPS3_LAYER_ID));
      dispatch(removeSource(startups3Source.id));
    };
  }, [dispatch]);

  // [hygen] Add useEffect

  return (
    <Grid container direction='column' className={classes.startups3}>
      <Grid item>Hello World</Grid>
    </Grid>
  );
}

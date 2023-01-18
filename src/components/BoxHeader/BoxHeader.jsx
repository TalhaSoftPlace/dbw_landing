import * as React from 'react';

import { BoxHeaderStyled } from './BoxHeader.style';
import { Grid } from '@mui/material';
import { PropTypes } from 'prop-types';

export const BoxHeader = ({ children, title, subtitle }) => {
  return (
    <BoxHeaderStyled>
      <Grid container>
        <Grid sx={{ mx: 3, mt: 2 }} item xs={8} lg={8} md={8} >
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </Grid>
        <Grid className="rightContent" sx={{ mt: 2 }} item xs={2} lg={3} md={3}>
          {children}
        </Grid>
        </Grid>
    </BoxHeaderStyled>
  );
};

BoxHeader.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
  };

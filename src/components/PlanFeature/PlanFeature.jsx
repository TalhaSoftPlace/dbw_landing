import React from 'react';
import { Grid } from '@mui/material';
import { CounterButton } from '../CounterButton';
import { Wrapper } from './PlanFeature.style';
import { PropTypes } from 'prop-types';

export const PlanFeature = ({
  title,
  info,
  subtitle,
  enabled,
  name,
  min,
  increment = 1,
  values,
  handleChange,
  handleBlur,
  setFieldValue,
  touched,
  errors,
}) => {
  return (
    <Wrapper>
      <Grid container>
        <Grid item lg={10} md={8} xs={8}>
          <label>{title}</label>
          <br />
          <span>{subtitle}</span>
        </Grid>
        <Grid item xs={2}>
          <CounterButton
            name={name}
            min={min}
            max={50}
            increment={increment}
            {...{
              values,
              handleChange,
              handleBlur,
              setFieldValue,
              touched,
              errors,
            }}
            enabled={enabled}
          />
        </Grid>
      </Grid>
    </Wrapper>
  );
};

PlanFeature.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  info: PropTypes.string,
  enabled: PropTypes.bool,
};

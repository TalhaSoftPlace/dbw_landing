import React from 'react';
import { Step } from './Step';
import { StepsWrapper } from './Steps.styles';

export const Steps = ({ steps, ...rest }) => {
  return (
    <StepsWrapper>
      {steps.map((step) => (
        <Step key={step.title} {...{ ...step, ...rest }} />
      ))}
    </StepsWrapper>
  );
};

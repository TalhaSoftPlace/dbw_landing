import React, { useCallback } from 'react';
import { StepContent, StepWrapper } from './Steps.styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export const Step = React.memo(
  ({
    active,
    completed,
    optional,
    activated,
    title,
    subtitle,
    id,
    onSelect,
  }) => {
    const handleClick = useCallback(() => {
      (completed || optional || activated) && onSelect(id);
    }, [activated, completed, id, onSelect, optional]);
    return (
      <StepWrapper
        onClick={handleClick}
        completed={(completed || optional || activated)?.toString()}
        active={active === id ? 'true' : ''}
      >
        <StepContent completed={completed?.toString()} active={active === id ? 'true' : ''}>
          {completed && <CheckCircleOutlineIcon color="text.success" size={20} />}
          <div>
            <h6>{title}</h6>
            <label>{subtitle}</label>
          </div>
        </StepContent>
      </StepWrapper>
    );
  }
);

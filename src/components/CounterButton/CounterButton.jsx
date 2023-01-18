import React, { useCallback } from 'react';
import { Button } from '@mui/material';

import { PropTypes } from 'prop-types';
import { ButtonGroupStyled, LabelButton } from './CounterButton.style';

export const CounterButton = ({ enabled, name, min, max = 50, increment = 1, values, handleChange, handleBlur, setFieldValue }) => {

    const handleIncrement = useCallback(
        () => setFieldValue(name, values?.[name] + increment),
        [setFieldValue, values, name, increment]
    );

    const handleDecrement = useCallback(
        () => { setFieldValue(name, values?.[name] - increment) },
        [setFieldValue, values, name, increment]
    );

    return (
        <ButtonGroupStyled sx={{ pt: 1 }} size="small" aria-label="small outlined button group">
            <Button disabled={!enabled || values?.[name] <= min} onClick={handleDecrement}>-</Button>
            <LabelButton>{values?.[name]}</LabelButton>
            <Button disabled={!enabled || values?.[name] >= max} onClick={handleIncrement}>+</Button>
        </ButtonGroupStyled>
    );
}

CounterButton.propTypes = {
    enabled: PropTypes.bool
};
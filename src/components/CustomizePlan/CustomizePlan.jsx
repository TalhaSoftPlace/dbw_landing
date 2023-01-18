import { useTheme } from '@emotion/react';
import React, { useCallback } from 'react';
import { BoxHeader } from '..';
import { CustomizePlanFrom } from '../../containers';
import { useLocalization, useWindowResize } from '../../hooks';
import { ChevronDownIcon, MobileChevronDownIcon } from './CustomizePlan.style';

export const CustomizePlan = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const { t } = useLocalization();
    const winSize = useWindowResize();
    const muiTheme = useTheme();
    const goBack = useCallback(() => {
      setFieldValue('step', 'plan-selection');
    }, [setFieldValue]);

    return (
      <div>
        <BoxHeader
          title={t.customizePlan.headerTitle}
          subtitle={t.customizePlan.headerSubtitle}
        >
          <span onClick={goBack}>
            {
              winSize.width > muiTheme.breakpoints.values.md ? <ChevronDownIcon /> : <MobileChevronDownIcon />
            }
             { winSize.width > muiTheme.breakpoints.values.md ? t.customizePlan.back : ""}
          </span>
        </BoxHeader>

        <CustomizePlanFrom
          {...{
            values,
            handleChange,
            handleBlur,
            setFieldValue,
            touched,
            errors,
          }}
        />
      </div>
    );
  }
);

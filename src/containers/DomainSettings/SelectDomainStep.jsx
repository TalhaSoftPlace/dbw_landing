import { InputAdornment } from '@mui/material';
import React, { useCallback } from 'react';
import { Button, ContentSection } from '../../components';
import { useLocalization } from '../../hooks';
import { StyledTextField } from './DomainSettings.styles';

export const SelecteDomainStep = React.memo(({ setActive }) => {
  const { t } = useLocalization();
  const handleClick = useCallback(() => setActive(1), [setActive]);
  return (
    <ContentSection
      heading={t.SelectDomainStep.DMARC.title}
      subHeading={'Edit Domain'}
    >
      <StyledTextField
        className="right filled"
        size="small"
        variant="outlined"
        name="domain"
        placeholder="Enter the domain to be allow listed (Such as example.com)"
        // value={values?.domain}
        // onChange={handleChange}
        // onBlur={handleBlur}
        InputProps={{
          startAdornment: <InputAdornment position="start">@</InputAdornment>,
        }}
      />
      <span>{t.SelectDomainStep.subtitle}</span>
      <Button
        onClick={handleClick}
        sx={{ display: 'block', marginLeft: 'auto' }}
        variant="primary"
      >
        {t.SelectDomainStep.btnText}
      </Button>
    </ContentSection>
  );
});

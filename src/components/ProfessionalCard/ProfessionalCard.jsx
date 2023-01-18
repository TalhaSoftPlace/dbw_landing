import * as React from 'react';
import { AccordionBody } from './ProfessionalCard.style';
import { Grid } from '@mui/material';
import { useLocalization } from '../../hooks';
import { ReactComponent as Check } from '../../images/Check.svg';
export const ProfessionalCard = ({ description, features }) => {
  const { t } = useLocalization();
  return (
    <AccordionBody>
      <Grid container>
        <Grid item md={2}></Grid>
        <Grid item md={10}>
          <p className="description"> {description} </p>
          <p>
            <Check /> Usage Limit {features['usage-limit']}
          </p>
          <p>
            <Check /> Speed within quota {features['speed-within-quota']}
          </p>
          <p>
            <Check /> Post usage quota {features['post-usage-quota']}
          </p>

          <p>
            <b className="deepBlue"> {t.planSelect.deepBlueWork} </b>
            {t.planSelect.bulkEmail}
          </p>
        </Grid>
      </Grid>
    </AccordionBody>
  );
};

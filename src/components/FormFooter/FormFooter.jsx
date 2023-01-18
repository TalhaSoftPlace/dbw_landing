import * as React from 'react';
import { Footer  , StyledLink} from './FormFooter.style';
import { Grid } from '@mui/material';
import { useLocalization } from '../../hooks';

export const FormFooter = () => {
  const { t } = useLocalization();
  return (
    <Footer>
      <Grid container>
        <Grid item md={6}>
          <p sx={{ mt: 0, pt: 0 }}>
            <span className="allrig">{t.rightReserved}</span>
          </p>
        </Grid>
        <Grid item md={6}>
          <Grid container>
            <Grid item md={3} sx={{ textAlign: 'right' }}>
              <p sx={{ mt: 0, pt: 0 }}>
                <span className="terms"> <StyledLink  to='/terms'><u>{t.TermsConditions}</u></StyledLink> </span>
              </p>
            </Grid>
            <Grid item md={3} sx={{ textAlign: 'center' }}>
              <p sx={{ mt: 0, pt: 0 }}>
                <span className="privacy"><StyledLink  to='/privacy'><u>{t.PrivacyPolicy}</u></StyledLink> </span>
              </p>
            </Grid>
            <Grid item md={3}>
              <p sx={{ mt: 0, pt: 0 }}>
                <span className="report"><StyledLink  to='/feedback'><u>{t.ReportAbuse}</u></StyledLink></span>
              </p>
            </Grid>
            <Grid className="version" item md={3} sx={{ textAlign: 'right' }}>
              <p sx={{ mx: 3, mt: 0, pt: 0 }}>
                <span>{t.Version}</span>
              </p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Footer>
  );
};

import { Grid, Typography } from '@mui/material';
import React from 'react';
import { AddressHead, Address } from './HomeAdressSection.style';
import EmailIcon from '@mui/icons-material/Email';
import { useLocalization } from './../../hooks';
export const HomeAdressSection = React.memo(() => {
  const { t } = useLocalization();
  return (
    <Address>
      <div>
        <div className="adressHead">
          <AddressHead>
            <Typography variant="h4">{t.addressHeading}</Typography>
          </AddressHead>
        </div>
        <Grid container>
          <Grid item sm={6} md={4} lg={4} sx={{ mb: 3 }}>
            <Typography>{t.address}</Typography>
            <Typography>{t.addressline2}</Typography>
            <Typography>{t.addressline3}</Typography>
          </Grid>
          <Grid item sm={6} md={4} lg={4} sx={{ mb: 3 }}>
            <Typography>
              <span>
                <EmailIcon className="emailIcon" />
              </span>
              <span>
                <b>{t.General}</b>
              </span>
              {t.Generalemail}
            </Typography>
            <Typography>
              <span>
                <EmailIcon className="emailIcon" />
              </span>
              <span></span>
              <span className="media">
                <b>{t.Media}</b>
              </span>
              {t.Mediaemail}
            </Typography>
           
          </Grid>
          <Grid item sm={6} md={4} lg={4} sx={{ mb: 3 }}>
            <Typography>
              <span>
                <EmailIcon className="emailIcon" />
              </span>
              <span>
                <b>{t.Abuse}</b>
              </span>
              {t.Abuseemail}
            </Typography>
            <Typography>
              <span>
                <EmailIcon className="emailIcon" />
              </span>
              <span >
                <b>{t.Legal}</b>
              </span>
              {t.Legalemail}
            </Typography>
          </Grid>
        </Grid>
      </div>
    </Address>
  );
});

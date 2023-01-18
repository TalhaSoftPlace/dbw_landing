import React, { useCallback, useMemo } from 'react';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

import { Grid } from '@mui/material';

import { Wrapper, PackageGrid, ButtonStyled } from './CustomizePlanFrom.style';
import { PlanFeature } from '../../components';
import { useLocalization } from '../../hooks';
import { usePlans } from '../../queries';

export const CustomizePlanFrom = React.memo(
  ({ values, handleChange, handleBlur, setFieldValue, touched, errors }) => {
    const { t } = useLocalization();
    const { data: plans = [] } = usePlans();

    const selectedPlan = useMemo(
      () => plans?.find((plan) => plan.planId === values?.planId),
      [plans, values]
    );

    const goToNextStep = useCallback(
      () => setFieldValue('step', 'process-cart'),
      [setFieldValue]
    );

    const handlePlanChange = useCallback(
      (e) => {
        setFieldValue('planId', parseInt(e.target.value));
      },
      [setFieldValue]
    );

    return (
      <Wrapper>
        <Grid container>
          <Grid sx={{ px: 3, mt: 2 }} item xs={12} lg={12} md={12}>
            <h5>{t.customizePlan.title}</h5>
            <p className="promotionalMsg"></p>

            <Grid container>
              <Grid item xs={12}>
                <FormControl className="w-100">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="planId"
                    value={values.planId}
                    onChange={handlePlanChange}
                  >
                    <Grid sx={{ mt: 2 }} gap={1} container>
                      {plans?.map(({ name, planId, symbol, price }, i) => (
                        <PackageGrid
                          key={i}
                          variant={planId === values.planId ? 'primary' : ''}
                          item
                          lg={5}
                          md={12}
                          xs={12}
                        >
                          <FormControlLabel
                            className="w-100"
                            value={planId}
                            control={<Radio />}
                            label=""
                          />
                          <span>{name}</span> <br />
                          <label>
                            {symbol}
                            {parseFloat(price?.usd).toFixed(2)} per user/month
                          </label>
                        </PackageGrid>
                      ))}
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>
              <div className="hrLine w-100"></div>
              <Grid item xs={12}>
                <h5>{t.planFeatures.dbwtitle}</h5>
                <p className="promotionalMsg">
                  {t.planFeatures.dbwtxt}

                  {selectedPlan?.name}

                  {t.planFeatures.dbwsubtitle}
                </p>
              </Grid>

              <Grid container>
                <Grid sx={{ pt: 3 }} item xs={12}>
                  <PlanFeature
                    title={t.planFeatures.users.title}
                    subtitle={t.planFeatures.users.subtitle}
                    info={t.planFeatures.users.info}
                    enabled={true}
                    min={1}
                    name="users"
                    increment={1}
                    {...{
                      values,
                      handleChange,
                      handleBlur,
                      setFieldValue,
                      touched,
                      errors,
                    }}
                  ></PlanFeature>
                </Grid>
                {/* <Grid sx={{ pt: 3 }} item xs={12}>
                  <PlanFeature
                    title={t.planFeatures.storage.title}
                    subtitle={t.planFeatures.storage.subtitle}
                    info={t.planFeatures.storage.info}
                    enabled={true}
                    name="storage"
                    min={5}
                    increment={5}
                    {...{
                      values,
                      handleChange,
                      handleBlur,
                      setFieldValue,
                      touched,
                      errors,
                    }}
                  ></PlanFeature>
                </Grid> */}
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sx={{ mt: 5, mb: 1 }}
                style={{ justifyContent: 'center', display: 'flex' }}
              >
                <ButtonStyled
                  disabled={values.step === 'process-cart'}
                  onClick={goToNextStep}
                  type="submit"
                  variant="primary"
                >
                  {t.planSummaryForm.checkoutbutton}
                </ButtonStyled>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    );
  }
);

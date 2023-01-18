import React, { useCallback } from 'react';
import {
  Wrapper,
  AccordionFooter,
  Accordion,
  AccordionSummary,
} from './PlansAccordion.style';

import { Button, AccordionHeader } from '..';
import { PlansAccordionFooterPrice } from '../../components';
import { Grid, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { usePlans } from '../../queries';
import { ProfessionalCard } from '../ProfessionalCard';
export const PlansAccordion = React.memo(({ setFieldValue }) => {
  const { data: plans = [] } = usePlans();

  const [expanded, setExpanded] = React.useState(plans[0]?.planId);

  const handleSelect = useCallback(
    planId => {
      setFieldValue('planId', planId);
      setFieldValue('step', 'customize-plan');
    },
    [setFieldValue]
  );

  return (
    <Wrapper>
      {plans?.map(plan => (
        <Accordion
          key={plan.planId}
          expanded={expanded === plan.planId}
          onChange={() => setExpanded(plan.planId)}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${plan.planId}-content`}
            id={`${plan.planId}-header`}
            className="accrodionHeader"
          >
            <AccordionHeader
              title={plan.name}
              subtitle={plan.tagLine}
              price={plan?.price?.usd}
              currency={plan.symbol}
            />
          </AccordionSummary>
          <AccordionDetails>
            <ProfessionalCard
              description={plan.desc}
              features={plan.features}
            />
            <Grid container>
              <Grid item md={2}></Grid>
              <Grid item md={10} sx={{ width: '100%' }}>
                <AccordionFooter>
                  <div className="planprice">
                    <PlansAccordionFooterPrice
                      price={plan?.price?.usd}
                      currency={plan?.symbol}
                    />
                  </div>
                  <div className="slectProfessional">
                    <Button
                      onClick={() => handleSelect(plan.planId)}
                      variant="primary"
                      className="planbtn"
                    >
                      Select &nbsp; {plan.name}
                    </Button>
                  </div>
                </AccordionFooter>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
    </Wrapper>
  );
});

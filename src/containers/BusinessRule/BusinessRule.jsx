import { Box, Divider, Grid } from '@mui/material';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { addRuleAtom } from '../../atoms';
import { ContentSection, Rules } from '../../components';
import { useLocalization } from '../../hooks';
import { useRules } from '../../queries';
import { HeaderAction } from '../HeaderAction';
import { parseRulesData } from './parseRulesData';

export const BusinessRule = React.memo(() => {
  const { t } = useLocalization();
  const navigate = useNavigate();

  const setRuleUpdate = useSetRecoilState(addRuleAtom);
  const { data: rules } = useRules();
  const rulesData = useMemo(
    () => parseRulesData(rules),

    [rules]
  );

  const navigateAddRule = React.useCallback(() => {
    setRuleUpdate({ rule: undefined });
    navigate('/admin/rules/add-rules');
  }, [navigate, setRuleUpdate]);

  const Action = React.memo(() => {
    return (
      <HeaderAction text={t.businessRules.add} onClick={navigateAddRule} />
    );
  }, [navigateAddRule]);
  const render = useMemo(
    () =>
      rulesData.map((rule, index) => (
        <Rules key={'rule_of_' + index} data={rule} />
      )),
    [rulesData]
  );

  return (
    <ContentSection
      heading={t.businessRules.heading}
      subHeading={t.businessRules.subHeading}
      headerAction={<Action />}
    >
      <Grid container>
        <Grid item sm={12} lg={12}>
          <Divider sx={{ borderColor: 'text.primary' }} />
        </Grid>
      </Grid>
      <Box sx={{ mb: 1, minHeight: 100 }}>{render}</Box>
    </ContentSection>
  );
});

import { Box, IconButton, useTheme } from '@mui/material';
import React from 'react';
import { DBWTable } from '../DBWTable';
import { MoreVertIconStyled, RulesWrapper, StyledSpan } from './Rules.styles';
import { useCallback } from 'react';
import { RulesOperation } from '../RulesOperation';
import { useDeleteRule, useUpdateRule } from '../../mutations';
import { useSetRecoilState } from 'recoil';
import { addRuleAtom } from '../../atoms';
import { useNavigate } from 'react-router-dom';

export const Rules = React.memo(({ data }) => {
  const muiTheme = useTheme();
  const { mutateAsync: deleteRule } = useDeleteRule();
  const { mutateAsync: updateRule } = useUpdateRule();
  const navigate = useNavigate();
  const setRuleUpdate = useSetRecoilState(addRuleAtom);

  const generateHeader = useCallback(() => {
    const headers = Object.assign({}, ...data.headers);
    const parsedHeaders = Object.keys(headers).map(k => (
      <StyledSpan>{headers[k]}</StyledSpan>
    ));

    return parsedHeaders;
  }, [data.headers]);

  const generateRowContent = useCallback(
    row => {
      const menuItems = [
        {
          name: row.rule.enable ? 'Deactivate' : 'Activate',
          onClick: () => {
            updateRule({
              id: row?.id,
              rule: {
                enable: !row.rule.enable,
              },
              ruleDomain: row.domain,
            });
          },
        },
        {
          name: 'Edit',
          onClick: () => {
            setRuleUpdate({ rule: row.rule });
            navigate('/admin/rules/add-rules');
          },
        },
        {
          name: 'Delete',
          className: 'delete',
          onClick: () => {
            deleteRule({ id: row?.id });
          },
        },
      ];
      const headers = Object.assign({}, ...data.headers);
      let parsedRow = Object.keys(headers).map(k => (
        <StyledSpan>{row[k]}</StyledSpan>
      ));
      parsedRow.pop();

      return [
        ...parsedRow,
        <Box sx={{ width: '100%' }}>
          <RulesOperation className="popup-menu" menuItems={menuItems}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="1"
              aria-haspopup="true"
            >
              <MoreVertIconStyled />
            </IconButton>
          </RulesOperation>
        </Box>,
      ];
    },
    [data.headers, deleteRule, navigate, setRuleUpdate, updateRule]
  );

  return (
    <RulesWrapper>
      <h5>{data?.title}</h5> 
      <DBWTable
        generateRowContent={generateRowContent}
        data={data?.data}
        generateHeader={generateHeader}
        headingBackground={muiTheme.palette.background.dark}
        itemBackground={muiTheme.palette.background.tableitembg}
        headingColor={muiTheme.palette.text.grey}
        itemColor={muiTheme.palette.text.grey}
        padding={20}
        className="rules-table"
      />
    </RulesWrapper>
  );
});

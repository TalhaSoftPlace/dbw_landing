import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import {Grid , ListItemButton} from '@mui/material';
import { ReactComponent as SettingIcons } from '../../images/Settings.svg';
import { ReactComponent as DomainSettingsIcons } from '../../images/domain-settings.svg';
import { ReactComponent as AutoReplyIcons } from '../../images/AutoReply.svg';
import { ReactComponent as AdminIcons } from '../../images/Admin.svg';
import { ReactComponent as EmailIcons } from '../../images/createemailgroup.svg';
import { ReactComponent as RuleIcons } from '../../images/ruleicon.svg';

export const ListItemTextStyled = styled(ListItemText, { })(
    ({ theme }) => ({
        color: theme.palette.text.light,
        fontSize: '16px'
    }),
);

export const MenuItemGrid = styled(Grid, { })(
    ({ theme }) => ({
        '&.active': {
            background: `${theme.palette.text.darkPrimary}` 
      },
     
    })
);

export const SettingIcon = styled(SettingIcons)`
path{
    ${({ theme }) => `
        fill: ${theme.palette.text.light};
    `};
}
margin-right:2px;
`;

export const DomainSettingsIcon = styled(DomainSettingsIcons)`
path{
    ${({ theme }) => `
        fill: ${theme.palette.text.light};
    `};
}
margin-right:2px;
`;

export const BillingIcon = styled(AutoReplyIcons)`
path{
    ${({ theme }) => `
        fill: ${theme.palette.text.light};
    `};
}
`;

export const AdminIcon = styled(AdminIcons)`
path{
    ${({ theme }) => `
        fill: ${theme.palette.text.light};
    `};
}
margin-right:3px;
`;

export const EmailGroupIcon = styled(EmailIcons)`
path{
    ${({ theme }) => `
        fill: ${theme.palette.text.light};
    `};   
}
width:24px;
height:auto;
`;
export const RulesIcon = styled(RuleIcons)`
path{
    ${({ theme }) => `
        fill: ${theme.palette.text.light};
    `};
}
margin-left:4px;
margin-right:3px;
`;



export const ListItemButtons = styled(ListItemButton)`
width:100%;
`;



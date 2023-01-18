import { styled } from '@mui/material/styles';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Box , ListItemButton} from '@mui/material';
import { ReactComponent as CompanyIcon } from '../../images/companysettingIcon.svg';
import { ReactComponent as OrgIcon } from '../../images/OrgSchema.svg';
import { ReactComponent as HomeIcons } from '../../images/home.svg';
import { ReactComponent as DomainSettingsIcons } from '../../images/domain-settings.svg';
import { ReactComponent as UserGroupIcons } from '../../images/User.svg';
import { ReactComponent as BillingIcons } from '../../images/Billing.svg';
import { ReactComponent as BusinessRuleIcons } from '../../images/BusinessRule.svg';
import { ReactComponent as WorkFlowIcons } from '../../images/WorkFlowIconadmin.svg';
import { ReactComponent as FeedBackIcons } from '../../images/FeedBack.svg';
export const ListItemTextStyled = styled(
  ListItemText,
  {}
)(({ theme }) => ({
  margin:'0px !important',
  color: theme.palette.text.light,
  fontSize: '16px',
  width: '40px',
}));

export const MenuItemGrid = styled(
  Grid,
  {}
)(({ theme }) => ({
  '&.active': {
    background: theme.palette.email.background.calenderPickerBackground,
  },
}));

export const StyledBox = styled(Box)`
  .disabled-link {
    pointer-events: none;
    ${({ theme }) => `
    color: ${theme.palette.text.greyLight} !important;
    `}
  }
`;
export const ListItemButtonStyled = styled(ListItemButton)`
${({ theme }) => `
width:100%;
@media (max-width: ${theme.breakpoints.values.sm}px){
  padding-left: 10px !important;
}
 `}
`;

export const SettingIcon = styled(CompanyIcon)`
  width:27px;
  height:auto;
  path{
    ${({ theme }) => `
      fill: ${theme.palette.text.light};
    `}
  }
`;
export const OrgSchemaIcon = styled(OrgIcon)`
  width:25px;
  height:auto;
  path{
    ${({ theme }) => `
      fill: ${theme.palette.text.light};
    `}
  }
`;
export const HomeIcon = styled(HomeIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;
export const DomainSettingsIcon = styled(DomainSettingsIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;
export const UserGroupIcon = styled(UserGroupIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;
export const BillingIcon = styled(BillingIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;
export const BusinessRuleIcon = styled(BusinessRuleIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;
export const WorkFlowIcon = styled(WorkFlowIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;

export const FeedBackIcon = styled(FeedBackIcons)`
path{
  ${({ theme }) => `
    fill: ${theme.palette.text.light};
  `}
}
`;







import styled from '@emotion/styled';
import { ReactComponent as ChevronDown } from '../../images/chevron-thin-down.svg';
import { ReactComponent as MobileChevronDown } from '../../images/chevron-thin-down-mobile.svg';

export const ChevronDownIcon = styled(ChevronDown)`
margin-right: 5px;
    ${({ theme }) => `
    * {
    fill: ${theme.palette.text.light};
    }
    `}
`;

export const MobileChevronDownIcon = styled(MobileChevronDown)`
    margin-top: 22px;
    ${({ theme }) => `
    * {
    fill: ${theme.palette.text.light};
    }
    `}
`;
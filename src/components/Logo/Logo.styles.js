import styled from '@emotion/styled';
import { ReactComponent as LogoSvg } from '../../images/logo.svg';
import { ReactComponent as DarkLogoSvg } from '../../images/logoDark.svg';

export const LightLogoImage = styled(LogoSvg)`
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.sm}px){
    width:220px !important;
   }
  `}
`;

export const DarkLogoImage = styled(DarkLogoSvg)`
  ${({ theme }) => `
  @media (max-width: ${theme.breakpoints.values.sm}px){
    width:220px !important;
   }
  `}
`;
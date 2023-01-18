import styled from '@emotion/styled';
import { Box } from '@mui/system';

import leftIcon from '../../images/leftEmailIcons.svg';
import rightIcon from '../../images/rightEmailIcons.svg';

export const Wrapper = styled(Box)`
  position: relative;
`;

export const Left = styled.div`
  background-image: url(${leftIcon});
  background-repeat: no-repeat;
  background-position: left center;
  ${({ size }) => `
      background-size: ${size}%;
  `}
  width: 100%;
  height: 100%;
`;
export const Right = styled.div`
  background-image: url(${rightIcon});
  background-repeat: no-repeat;
  background-position: right center;
  ${({ size }) => `
      background-size: ${size}%;
  `}
  width: 100%;
  height: 100%;
`;
export const Content = styled.div`
  ${({ size }) => `
      margin-inline: ${size * 0.9}%;
  `}
  overflow: hidden;
`;

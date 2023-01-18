import styled from '@emotion/styled';
import { Box } from '@mui/material';

export const StyledBox = styled(Box)`
  @-webkit-keyframes rotation {
    from {
      -webkit-transform: rotate(0deg);
    }
    to {
      -webkit-transform: rotate(359deg);
    }
  }
  keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }

  ${({ size, color }) => `
    height: ${size}px;
    width: ${size}px;
    position: relative;
    svg {
      position: absolute;
      top: 12%;
      left: 12%;
       height: ${size - size * 0.24}px;
        width: ${size - size * 0.24}px;
        -webkit-animation: rotation 8s infinite linear;
        animation: rotation 8s infinite linear;
    
    }
    .grid { 
      fill:  ${color};
    }
    .circle {
        fill: transparent;
        stroke: ${color};
        top: 0;
        left: 0;
        height: ${size}px;
        width: ${size}px;
        -webkit-animation: rotation 2s infinite linear;
        animation: rotation 2s infinite linear;
    }
  
  `}
`;

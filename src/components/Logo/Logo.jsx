import React from 'react';

import { LightLogoImage , DarkLogoImage } from './Logo.styles';

export const Logo = React.memo(
  ({ height = 38, width = 250, variant}) => {
    return (
      <>
      {
        variant === 'light' ? (
          <LightLogoImage width={width} height={height} />
        ) : variant === 'dark' ? (
          <DarkLogoImage width={width} height={height} />
        ):(
          <></>
        )
      }
      </>
    )
  }
);

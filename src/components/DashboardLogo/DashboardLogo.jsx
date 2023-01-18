import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks';
import { useGetCompanyLogo } from '../../queries';
import { Image, StyledText, StyledBox } from './DashboardLogo.styles';

export const DashboardLogo = React.memo(
  ({ height = 110, width = 220, color = '#FFFFFF', showMobile = false }) => {
    const { user } = useAuth();
    const { data: companyLogo = null, isLoading } = useGetCompanyLogo();

    const getLogoPlaceHolder = useMemo(() => {
      return <Image width={width} height={height} color={color} />;
    }, [height, width, color]);

    const getCompanyLogo = useMemo(() => {
      return showMobile ? (
        <img
          alt={'logo'}
          height={height}
          width={'auto'}
          style={{ position: 'absolute', left: '10%' , top:'3px' ,  }}
          src={companyLogo}
        />
      ) : (
        <img
          style={{ marginLeft: '20px', marginRight: '24px' }}
          alt={'logo'}
          src={companyLogo}
          width={'auto'}
          height={height}
        />
      );
    }, [height, showMobile, companyLogo]);

    const getCompanyLogoToDisplay = useMemo(() => {
      return !!companyLogo ? (
        getCompanyLogo
      ) : user?.domainModel?.domainName && !isLoading ? (
        <StyledText>{user?.domainModel?.domainName}</StyledText>
      ) : (
        getLogoPlaceHolder
      );
    }, [
      companyLogo,
      getCompanyLogo,
      getLogoPlaceHolder,
      isLoading,
      user?.domainModel?.domainName,
    ]);
    return (
      <Link to="/workspace">
        <StyledBox>{getCompanyLogoToDisplay}</StyledBox>
      </Link>
    );
  }
);

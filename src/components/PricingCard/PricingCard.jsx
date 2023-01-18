import * as React from 'react';
import { PricingStyledCard, CardHeading  , CardItem , ArrowIcon , LogoIcon} from './PricingCard.styles';
export const PricingCard = ({data , title}) => {
  return (
    <PricingStyledCard sx={{p:2 ,pt:1 }}>
      <CardHeading><LogoIcon /> {title}</CardHeading>
      {data.map((value, key)=>{
        return <CardItem key={key + value}> <ArrowIcon /> {value.item} </CardItem>
      })}
    </PricingStyledCard>
  );
};
 
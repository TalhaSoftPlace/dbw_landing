import React from 'react';
import { LineItemTd, LineItemTh } from './TableLineItem.styles';

export const TableLineItem = React.memo(
  ({ isHeader, values = [], generateRowContent, headingBackground, itemBackground, headingColor, itemColor, padding  }) => {
    return (
      <>
        {Object.values(generateRowContent(values)).map((value, idx) =>
          isHeader ? (
            <LineItemTh background={headingBackground} headingColor={headingColor} padding={padding} key={value + idx + "_header"}>{value}</LineItemTh>
          ) : (
            <LineItemTd background={itemBackground} itemColor={itemColor} padding={padding}  key={value + idx + "_child"}>{value}</LineItemTd>
          )
        )}
      </>
    );
  }
);

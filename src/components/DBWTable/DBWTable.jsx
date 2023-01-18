import React from 'react';
import { TableLineItem } from '../TableLineItem/TableLineItem';
import { TableStyled, TableTrStyled, TableThStyled } from './DBWTable.styles';
import { v4 as uuidv4 } from 'uuid';
export const DBWTable = React.memo(
  ({
    generateHeader,
    data,
    generateRowContent,
    rowClicked = () => {},
    headingBackground,
    itemBackground,
    headingColor,
    itemColor,
    padding,
    className,
  }) => {
    return (
      <TableStyled className={className}>
        <tbody>
          <TableThStyled key="mainHeader">
            <TableLineItem
              key="headerChild"
              generateRowContent={generateHeader}
              isHeader={true}
              headingBackground={headingBackground}
              itemBackground={itemBackground}
              headingColor={headingColor}
              itemColor={itemColor}
              padding={padding}
            />
          </TableThStyled>
          {data &&
            data.map((values, idx) => (
              <TableTrStyled
                key={values  + idx + uuidv4}
                onClick={() => rowClicked(values)}
              >
                <TableLineItem
                  generateRowContent={generateRowContent}
                  values={values}
                  headingBackground={headingBackground}
                  itemBackground={itemBackground}
                  headingColor={headingColor}
                  itemColor={itemColor}
                  padding={padding}
                />
              </TableTrStyled>
            ))}
        </tbody>
      </TableStyled>
    );
  }
);

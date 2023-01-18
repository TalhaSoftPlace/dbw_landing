import styled from '@emotion/styled';

export const PaginationLabel = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => `
   @media (max-width: ${theme.breakpoints.values.sm}px){
          font-size: 12px !important;
   }
  color: ${theme.palette.text.light};
    * {
        color: ${theme.palette.text.light} !important;
         @media (max-width: ${theme.breakpoints.values.sm}px){
          font-size: 12px !important;
        }
    }    
`}
.MuiSelect-icon{
  display:none !important;
}
.MuiSelect-select{
  padding-right: 0px !important;
}
.selectpage{
  min-width: 8px !important;
}
`;


export const PaginationLabelpage = styled.div`
  display: flex;
  align-items: center;

  ${({ theme }) => `
   @media (max-width: ${theme.breakpoints.values.sm}px){
          font-size: 12px !important;
   }
  color: ${theme.palette.text.light};
    * {
        color: ${theme.palette.text.light} !important;
         @media (max-width: ${theme.breakpoints.values.sm}px){
          font-size: 12px !important;
        }
    }    
`}
.MuiSelect-icon{
  display:none !important;
}
.MuiSelect-select{
  padding-right: 0px !important;
  min-width: 8px !important;
}
`;
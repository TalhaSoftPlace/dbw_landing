import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import styled from '@emotion/styled';

export const CalendarPickerStyled = styled(CalendarPicker)`
  ${({ theme, labelColor, calenderBackground }) => `
        div{
            color: ${labelColor};
            font-size: 16px;
            font-weight: 400;
            div > button{
                color: ${labelColor};
            }
        }
        @media (max-width: ${theme.breakpoints.values.sm}px){
            width: 100%;
        }
        .MuiCalendarPicker-viewTransitionContainer > div > div:first-of-type{
            margin-right: 14px;
            background : ${calenderBackground};
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
            @media (max-width: ${theme.breakpoints.values.sm}px){
                margin-right: 0px;
            }
        }
        .MuiCalendarPicker-viewTransitionContainer > div > div:nth-of-type(2){
            margin-right: 14px;
            @media (max-width: ${theme.breakpoints.values.sm}px){
                margin-right: 0px;
            }
                div {
                    background : ${calenderBackground};
                    border-bottom-left-radius: 5px;
                    border-bottom-right-radius: 5px;
                    padding-bottom: 5px;
                }
        }

        .PrivatePickersSlideTransition-root > div > div > div > button:not(.Mui-selected){
            background : none;
        }
        .PrivatePickersSlideTransition-root > div > div > div > button.Mui-selected{
            border-radius : 5px;
        }
        .PrivatePickersSlideTransition-root > div > div > div > button.MuiPickersDay-dayOutsideMonth{
            color : ${theme.palette.text.unfocusedDates};
        }
    `}
`;

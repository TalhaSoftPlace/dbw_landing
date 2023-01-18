import React, { useMemo } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTheme } from '@mui/material';


export const QuotaProgress = React.memo(({ children, progress, className = '' }) => {

    const muiTheme = useTheme();

    const progressStyles = useMemo(()=>{
        return buildStyles({
            pathColor: muiTheme.palette.background.progressBg,
            trailColor:  muiTheme.palette.text.greyDark
        })
    }, [muiTheme]);

    return (
        <CircularProgressbarWithChildren
            strokeWidth={15}
            className={className}
            styles={progressStyles}
            value={progress}>
            {children}
        </CircularProgressbarWithChildren>
    )
});
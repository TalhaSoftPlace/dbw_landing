import * as React from 'react';
import { News, Textdate } from './NewsCard.styles';
import { Typography } from '@mui/material';
import { PropTypes } from 'prop-types';
export const NewsCard = ({ imgSrc, title, subtitle, body }) => {
  return (
    <News>
      <img src={imgSrc} alt={title} width="100%" height="100%" />
      <div className="head">
        <Typography variant="h4">{title}</Typography>
      </div>
      <Typography variant="h6">{subtitle}</Typography>
      <div className="head">
        <Textdate>
          <span>{body} </span>
        </Textdate>
      </div>
    </News>
  );
};

NewsCard.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  body: PropTypes.string,
};

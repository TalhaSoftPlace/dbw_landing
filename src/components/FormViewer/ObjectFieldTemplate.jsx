import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    marginTop: 10,
  },
});

const ObjectFieldTemplate = ({
  DescriptionField,
  description,
  TitleField,
  title,
  properties,
  required,
  uiSchema,
  idSchema,
}) => {
  const classes = useStyles();

  return (
    <>
      {(uiSchema['ui:title'] || title) && (
        <TitleField
          id={`${idSchema.$id}-title`}
          title={title}
          required={required}
        />
      )}
      {description && (
        <DescriptionField
          id={`${idSchema.$id}-description`}
          description={description}
        />
      )}
      <Grid container spacing={2} className={classes.root}>
        {properties.map((element, index) => {
          const isObject = element?.content?.props?.schema?.type === 'object';
          return (
            <Grid
              item={true}
              xs={12}
              md={isObject ? 12 : 6}
              className={isObject ? 'object' : ''}
              lgx={isObject ? 12 : 4}
              key={index}
              style={{ marginBottom: '10px' }}
            >
              {element.content}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ObjectFieldTemplate;

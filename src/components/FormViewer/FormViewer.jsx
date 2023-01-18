import React, { useMemo } from 'react';
import Form from '@rjsf/material-ui/v5';
import { Wrapper } from './FormViewer.styles';
import ObjectFieldTemplate from './ObjectFieldTemplate';

const transformUiSchema = (uiSchema) => {
  const obj = {
    'ui:ObjectFieldTemplate': ObjectFieldTemplate,
  };
  Object.entries(uiSchema).forEach(([key, value]) => {
    if (!Array.isArray(value) && typeof value === 'object') {
      obj[key] = transformUiSchema(value);
    } else {
      obj[key] = value;
    }
  });
  return obj;
};

export const FormViewer = React.memo(
  ({ json, onSubmit, formData, readonly = false }) => {
    const uiSchema = useMemo(() => {
      return transformUiSchema(json?.uiSchema ?? {});
    }, [json.uiSchema]);
    return (
      <Wrapper className={readonly ? 'readonly' : ''} sx={{color:'text.primaryText'}}>
        <Form
          readonly={readonly}
          schema={json.schema}
          uiSchema={uiSchema}
          onSubmit={onSubmit}
          formData={formData}
          sx={{color:'text.primaryText'}}
        />
      </Wrapper>
    );
  }
);

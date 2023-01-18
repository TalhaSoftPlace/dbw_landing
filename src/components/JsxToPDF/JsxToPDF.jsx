import React from 'react';
import ReactToPdf from 'react-to-pdf';
import { Button } from '../Button';
export const JsxToPDF = React.memo(({ children, invoiceDate }) => {
  const ref = React.createRef();
  return (
    <div
      style={{
        overflow: 'hidden',
        padding: 10,
      }}
    >
      <div
        style={{
          maxWidth: 800,
          width:'100%',
        }}
        ref={ref}
      >
        {children}
      </div>
      <ReactToPdf targetRef={ref} filename={"Invoice_" + invoiceDate + ".pdf"}>
        {({ toPdf }) => (
          <Button fullWidth size="small" variant="secondary" onClick={toPdf}>
            Generate pdf
          </Button>
        )}
      </ReactToPdf>
    </div>
  );
});

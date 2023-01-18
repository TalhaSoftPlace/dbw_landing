export const parseDNSdata = (response) =>
  response?.data?.[0]
    ? {
        ...response.data[0],
        dkim: response.data[0].dkim
          ? JSON.parse(response.data[0].dkim)
          : undefined,
        dmarc: response.data[0].dmarc
          ? JSON.parse(response.data[0].dmarc)
          : undefined,
      }
    : undefined;

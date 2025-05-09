const PROTOCOL = 'https';
const DOMAIN = 'mdaider.urapptech.com';
const PORT = '';
const TransformedPort = PORT ? `:${PORT}` : '';

export const environment = {
  production: true,
  baseURL: `${PROTOCOL}://${DOMAIN}${TransformedPort}`,
  tenant: '986e5d51-992d-4045-81b9-bacd2bcc1d15',
};

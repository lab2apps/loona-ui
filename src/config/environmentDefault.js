import type { Environment } from './environment';

export const environmentDefault: Environment = {
  isLoggerEnabled: true,
  apiUrl:  process.env.REACT_APP_LOCAL_API_URL || process.env.REACT_APP_API_URL || 'https://loona-api.lab2.team',
  skipToken: process.env.REACT_APP_SKIP_TOKEN,
};


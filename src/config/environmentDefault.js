import type { Environment } from './environment';

export const environmentDefault: Environment = {
  isLoggerEnabled: true,
  apiUrl:  process.env.REACT_APP_API_URL,
  skipToken: process.env.REACT_APP_SKIP_TOKEN,
};


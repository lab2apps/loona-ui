import type { Environment } from './environment';

export const environmentDefault: Environment = {
  isLoggerEnabled: true,
  apiUrl: process.env.REACT_APP_API_URL,
};


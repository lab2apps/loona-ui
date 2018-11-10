import { environmentDefault } from './environmentDefault';
import { environmentProd } from './environmentProd';

export type Environment = {
  isLoggerEnabled: boolean;
  apiUrl: string;
  skipToken?: boolean;
}

export let environment: Environment;

if (process.env.NODE_ENV === 'production') {
  environment = {
    ...environmentDefault,
    ...environmentProd,
  };
} else {
  environment = {
    ...environmentDefault,
  };
}

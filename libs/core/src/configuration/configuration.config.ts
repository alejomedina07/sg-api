import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

export default () => {
  const file =
    process.env.ENV === 'development'
      ? join(__dirname, '../../../', `config.yaml`)
      : join(__dirname, `config.yaml`);
  return yaml.load(readFileSync(file, 'utf8')) as Record<string, any>;
};

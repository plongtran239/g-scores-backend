import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';

import { plainToInstance } from 'class-transformer';
import { IsString, validateSync } from 'class-validator';

config({
  path: '.env',
});

if (!fs.existsSync(path.resolve('.env'))) {
  console.log('No .env file found. Please create one using the .env.example file as a template.');

  process.exit(1);
}

class ConfigSchema {
  @IsString()
  DATABASE_URL: string;
}

const configServer = plainToInstance(ConfigSchema, process.env);

const erroryArray = validateSync(configServer);

if (erroryArray.length > 0) {
  console.log('Some fields are missing or invalid in the .env file.');

  const errors = erroryArray.map((error) => ({
    property: error.property,
    constraints: error.constraints,
    value: error.value as undefined,
  }));

  throw errors;
}

const envConfig = configServer;

export default envConfig;

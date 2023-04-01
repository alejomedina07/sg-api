import { Environments } from 'sg/core/dto/config/enviroments.dto';

export default interface CoreConfig {
  environment: Environments;
  database: {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
  }
}

export default interface MainConfig {
  environment: Environments;
  port: number
  swagger: {
    title: string
    description: string
    version: string
  }
}
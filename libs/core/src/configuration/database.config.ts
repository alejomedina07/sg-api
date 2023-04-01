import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import * as entities from 'sg/core/entities';
import CoreConfig from "sg/core/dto/core.dto";

@Injectable()
export class CoreTypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private config: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const core = this.config.get<CoreConfig>('core');
    // const entities: string[] = process.env.NODE_ENV === 'development' ? ['./dist/**/*.entity{.ts, .js}'] : ['./**/*.entity{.ts, .js}'];
    return {
      type: 'postgres',
      host: core.database.host,
      port: core.database.port,
      username: core.database.username,
      password: core.database.password,
      database: core.database.database,
      synchronize: false,
      entities: Object.values(entities),
    };
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreService } from './core.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CoreTypeOrmConfigService } from "sg/core/configuration/database.config";
import { CryptoService } from './services/crypto/crypto.service';
import configurationConfig from "sg/core/configuration/configuration.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurationConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: CoreTypeOrmConfigService,
    }),

  ],
  providers: [CoreService, CryptoService],
  exports: [CoreService],
})
export class CoreModule {}

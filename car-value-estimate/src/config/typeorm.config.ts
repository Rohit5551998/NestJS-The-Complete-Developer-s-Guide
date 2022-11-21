import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      // synchronize: false,
      synchronize: this.configService.get<boolean>('SYNCHRONIZE'),
      database: this.configService.get<string>('DB_NAME'),
      autoLoadEntities: true,
    }
  }
}
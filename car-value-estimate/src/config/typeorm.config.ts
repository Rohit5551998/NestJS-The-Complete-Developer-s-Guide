import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(): TypeOrmModuleOptions {
    if (this.configService.get<boolean | undefined>('MIGRATIONS_RUN') === undefined) {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        // synchronize: false,
        synchronize: this.configService.get<boolean>('SYNCHRONIZE'),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
      }
    }

    else if (this.configService.get<boolean | undefined>('MIGRATIONS_RUN') === true) {
      if (this.configService.get<boolean | undefined>('SSL') === undefined) {
        return {
          type: this.configService.get<any>('DB_TYPE'),
          // synchronize: false,
          synchronize: this.configService.get<boolean>('SYNCHRONIZE'),
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          migrationsRun: true,
        }
      }
      else if (this.configService.get<boolean | undefined>('SSL') === false) {
        return {
          type: this.configService.get<any>('DB_TYPE'),
          // synchronize: false,
          synchronize: this.configService.get<boolean>('SYNCHRONIZE'),
          database: this.configService.get<string>('DB_NAME'),
          autoLoadEntities: true,
          migrationsRun: true,
          ssl: {
            rejectUnauthorized: false,
          }
        }
      }
    }
  }
}
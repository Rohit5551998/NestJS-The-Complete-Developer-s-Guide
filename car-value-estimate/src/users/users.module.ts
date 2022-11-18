import { MiddlewareConsumer, Module } from '@nestjs/common';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    // Interceptor replaced with Middleware since Guard required current user info 
    // but can't get it as Interceptor runs after Guard while Middleware runs before Gurads
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CurrentUserInterceptor,
    // }
  ],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}

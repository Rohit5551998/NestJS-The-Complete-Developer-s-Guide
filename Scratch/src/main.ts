import { Module, Controller, Get } from '@nestjs/common';

@Controller()
class AppController {
  @Get()
  getRootRoute() {
    return 'Hi There!!!';
  }
}
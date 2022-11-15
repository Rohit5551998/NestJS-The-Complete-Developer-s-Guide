import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { MessagesService } from './messsages.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@Controller('messages')
export class MessagesController {
  messagesService: MessagesService;

  constructor() {
    // DONT DO THIS ON REAL APPS -> Use Dependency Injection
    this.messagesService = new MessagesService();
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  };

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    // console.log(body);
    return this.messagesService.create(body.content);
  };

  @Get('/:id')
  getMessage(@Param('id') id: string) {
    // console.log(id);
    return this.messagesService.findOne(id);
  };
}

import { Body, Controller, Get, Param, Post, NotFoundException } from '@nestjs/common';

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
  async getMessage(@Param('id') id: string) {
    // console.log(id);
    const message = await this.messagesService.findOne(id);

    if (!message) {
      throw new NotFoundException('Message Not Found');
    }

    return message; 
  };
}

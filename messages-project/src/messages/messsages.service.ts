import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "./messages.repository";

@Injectable()
export class MessagesService {
  // messagesRepo: MessagesRepository;

  // constructor() {
  //   // Service is creating its own dependencies
  //   // DONT DO THIS ON REAL APPS -> Use Dependency Injection 
  //   this.messagesRepo = new MessagesRepository();
  // }

  // messagesRepo: MessagesRepository;

  // constructor(messagesRepo: MessagesRepository) {
  //   this.messagesRepo = messagesRepo;
  // } 
  //Lines 12 to 17 is equivalent to

  constructor(public messagesRepo: MessagesRepository) {}

  findOne(id: string) {
    return this.messagesRepo.findOne(id);
  }

  findAll() {
    return this.messagesRepo.findAll();
  }

  create(content: string) {
    return this.messagesRepo.create(content);
  }

};
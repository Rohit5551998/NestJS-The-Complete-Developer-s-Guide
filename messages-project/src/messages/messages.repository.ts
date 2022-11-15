import { join } from "path";
import { Injectable } from "@nestjs/common";
import { readFile, writeFile } from "fs/promises";

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const contents = await readFile(join(__dirname, '..', '..', 'messages.json'), 'utf8');
    const messages = JSON.parse(contents);

    return messages[id];
  }

  async findAll() {
    const contents = await readFile(join(__dirname, '..', '..', 'messages.json'), 'utf8');
    const messages = JSON.parse(contents);

    return messages;
  }

  async create(content: string) {
    const contents = await readFile(join(__dirname, '..', '..', 'messages.json'), 'utf8');
    const messages = JSON.parse(contents);
    const id = Object.keys(messages).length;
    //Random ID Generation
    // const id = Math.floor(Math.random() * 999);
    console.log(id);
    messages[id] = { id, content }; 

    await writeFile(join(__dirname, '..', '..', 'messages.json'), JSON.stringify(messages));
    return messages[id];
  }
}
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '<a href="http://localhost:4000/documentation">API Documentation</a>';
  }
}

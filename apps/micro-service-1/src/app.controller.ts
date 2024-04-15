import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @MessagePattern({ cmd: 'sum' })
  sum(data: number[]): number {
    console.log('MessagePattern - new - sum - data ', data);
    return (data || []).reduce((a, b) => a + b);
  }
}

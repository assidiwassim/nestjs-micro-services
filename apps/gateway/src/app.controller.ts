import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('MICRO_SERVICE_1') private readonly client: ClientProxy,
  ) {}

  @Get()
  execute(): Observable<number> {
    const pattern = { cmd: 'sum' };
    const data = [1, 2, 3, 4, 5];
    console.log('execute', pattern);
    return this.client.send<number>(pattern, data);
  }
}

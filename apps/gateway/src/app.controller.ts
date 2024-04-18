import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    @Inject('MICRO_SERVICE_1') private readonly client1: ClientProxy,
    @Inject('MICRO_SERVICE_2') private readonly client2: ClientProxy,
  ) {}

  @Get()
  async execute(): Promise<number> {
    const sum1 = await firstValueFrom(this.getSumService1());
    const sum2 = await firstValueFrom(this.getSumService2());
    return sum1 + sum2;
  }

  getSumService1(): Observable<number> {
    return this.client1.send<number>({ cmd: 'sum-micro-service-1' }, [1, 2]);
  }

  getSumService2(): Observable<number> {
    return this.client2.send<number>({ cmd: 'sum-micro-service-2' }, [1, 1]);
  }
}

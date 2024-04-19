import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { CalculateInput } from './dto/calculate.input';
import { SumInput } from './dto/sum.input';

@Controller()
export class AppController {
  constructor(
    @Inject('MICRO_SERVICE_1') private readonly client1: ClientProxy,
    @Inject('MICRO_SERVICE_2') private readonly client2: ClientProxy,
  ) {}

  @Post('/sum')
  async getRouteTotalSum(@Body() sumInput: SumInput): Promise<number> {
    const { numbers_1, numbers_2 } = sumInput;
    const sum1 = await firstValueFrom(this.getSumService1(numbers_1));
    const sum2 = await firstValueFrom(this.getSumService2(numbers_2));
    return sum1 + sum2;
  }

  @Post('/sum-service-1')
  async getRouteSumService1(
    @Body() calculateInput: CalculateInput,
  ): Promise<number> {
    const { numbers } = calculateInput;
    return firstValueFrom(this.getSumService1(numbers));
  }

  @Post('/sum-service-2')
  async getRouteSumService2(
    @Body() calculateInput: CalculateInput,
  ): Promise<number> {
    const { numbers } = calculateInput;
    return firstValueFrom(this.getSumService2(numbers));
  }

  getSumService1(numbers: number[]): Observable<number> {
    return this.client1.send<number>({ cmd: 'sum-micro-service-1' }, numbers);
  }

  getSumService2(numbers: number[]): Observable<number> {
    return this.client2.send<number>({ cmd: 'sum-micro-service-2' }, numbers);
  }
}

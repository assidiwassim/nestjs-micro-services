import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, firstValueFrom } from 'rxjs';
import { CalculateInput, SumInput } from '@app/shared-dto';

@Controller()
export class AppController {
  constructor(
    @Inject('MICRO_SERVICE_1') private readonly client1: ClientProxy,
    @Inject('MICRO_SERVICE_2') private readonly client2: ClientProxy,
  ) {}

  @Post('/sum')
  async getRouteTotalSum(@Body() sumInput: SumInput): Promise<number> {
    console.log(
      '\n\n*************** Operation started *******************\n\n',
    );

    console.log('Gateway - POST /sum - Input/DTO = \n', sumInput);

    const { numbers_1, numbers_2 } = sumInput;

    const sum1 = await firstValueFrom(
      this.getSumService1({ numbers: numbers_1 }),
    );
    const sum2 = await firstValueFrom(
      this.getSumService2({ numbers: numbers_2 }),
    );

    const sum = sum1 + sum2;

    console.log('\nGateway - POST /sum - Result/SUM = ',sum);

    console.log(
      '\n\n*********** Operation completed **************\n\n',
    );

    return sum;
  }

  @Post('/sum-service-1')
  async getRouteSumService1(
    @Body() calculateInput: CalculateInput,
  ): Promise<number> {

    console.log(
      '\n\n*************** Operation started *******************\n\n',
    );

    console.log('Gateway - POST /sum-service-1 - Input/DTO = \n', calculateInput);

    const sum = await firstValueFrom(this.getSumService1(calculateInput));

    console.log('\nGateway - POST /sum-service-1 - Result/SUM = ', sum);
    console.log(
      '\n\n*********** Operation completed **************\n\n',
    );

    return sum;
  }

  @Post('/sum-service-2')
  async getRouteSumService2(
    @Body() calculateInput: CalculateInput,
  ): Promise<number> {

    console.log(
      '\n\n*************** Operation started *******************\n\n',
    );

    console.log('Gateway - POST /sum-service-2 - Input/DTO = \n', calculateInput);

    const sum = await firstValueFrom(this.getSumService2(calculateInput));

    console.log('\nGateway - POST /sum-service-2 - Result/SUM = ', sum);

    console.log(
      '\n\n*********** Operation completed **************\n\n',
    );

    return sum;
  }

  getSumService1(calculateInput: CalculateInput): Observable<number> {
    return this.client1.send<number>(
      { cmd: 'sum-micro-service-1' },
      calculateInput,
    );
  }

  getSumService2(calculateInput: CalculateInput): Observable<number> {
    return this.client2.send<number>(
      { cmd: 'sum-micro-service-2' },
      calculateInput,
    );
  }
}

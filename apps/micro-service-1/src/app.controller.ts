import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CalculateInput } from '@app/shared-dto';
@Controller()
export class AppController {
  constructor() {}
  @MessagePattern({ cmd: 'sum-micro-service-1' })
  sum(calculateInput: CalculateInput): number {

    console.log(
      '\n\n*************** Operation started *******************\n\n',
    );

    console.log('Micro-service-1 - TCP/Message - Input/DTO = \n', calculateInput);
    const { numbers } = calculateInput;
    const sum = (numbers || []).reduce((a: number, b: number) => a + b);
    console.log('\nMicro-service-1 - TCP/Message -  Result/SUM = ', sum);

    console.log(
      '\n\n*********** Operation completed **************\n\n',
    );
    return sum;
  }
}

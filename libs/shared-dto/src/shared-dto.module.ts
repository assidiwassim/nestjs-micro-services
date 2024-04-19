import { Module } from '@nestjs/common';
import { SharedDtoService } from './shared-dto.service';

@Module({
  providers: [SharedDtoService],
  exports: [SharedDtoService],
})
export class SharedDtoModule {}

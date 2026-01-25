import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { PublicController } from './public.controller';

@Module({
  providers: [CommonService],
  controllers: [CommonController, PublicController]
})
export class CommonModule {}

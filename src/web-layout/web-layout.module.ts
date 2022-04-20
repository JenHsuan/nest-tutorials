import { HttpModule, Module } from '@nestjs/common';
import { WebLayoutController } from './controller/web-layout.controller';
import { WebLayoutService } from './service/web-layout.service';

@Module({
  imports: [HttpModule],
  controllers: [WebLayoutController],
  providers: [WebLayoutService],
})
export class WebLayoutModule {}

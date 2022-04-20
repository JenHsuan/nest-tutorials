import { Controller, Get, Param, Res } from '@nestjs/common';
import { WebLayoutService } from '../service/web-layout.service';
import { Response } from 'express';

@Controller('web-layout')
export class WebLayoutController {
  constructor(private webLayoutService: WebLayoutService) {}

  @Get(':name')
  async renderWebPage(@Res() res: Response, @Param('name') name): Promise<void> {
    this.webLayoutService.getPage(name, 'github').subscribe(
      htmlString => res.send(htmlString),
      err => res.render(err),
    );
  }
}

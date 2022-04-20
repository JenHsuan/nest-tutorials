import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  @Get()
  renderLocalPage(@Res() res: Response) {
    return res.render('index.html');
  }
}

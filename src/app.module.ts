import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WebLayoutModule } from './web-layout/web-layout.module';
@Module({
  imports: [TaskModule, AuthModule, UserModule, WebLayoutModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

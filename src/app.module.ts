import { Module } from '@nestjs/common'

import { AuthController } from './auth/auth.controller'
import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

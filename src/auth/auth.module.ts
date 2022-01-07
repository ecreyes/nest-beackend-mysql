import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'
import { userProviders } from '../user/user.providers'
import { UserService } from '../user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    ...userProviders,
  ],
  exports: [ AuthService],
})
export class AuthModule {}

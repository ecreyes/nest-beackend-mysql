import { Module } from '@nestjs/common'

import { DatabaseModule } from 'src/database/database.module'
import { userProviders } from 'src/user/user.providers'
import { UserService } from 'src/user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    DatabaseModule,
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

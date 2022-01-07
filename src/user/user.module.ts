import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'

import { UserController } from './user.controller'
import { userProviders } from './user.providers'
import { UserService } from './user.service'

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [UserController],
  providers: [
    ...userProviders,
    UserService,
  ],
  exports: [
    UserService,
    ...userProviders,
  ],
})
export class UserModule {}

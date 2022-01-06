import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { DatabaseModule } from 'src/database/database.module'
import { userProviders } from 'src/user/user.providers'
import { UserService } from 'src/user/user.service'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '6h' },
    }),
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

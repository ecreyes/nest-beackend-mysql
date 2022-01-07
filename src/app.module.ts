import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { LinkModule } from './link/link.module'
import { OrderModule } from './order/order.module'
import { ProductModule } from './product/product.module'
import { SharedModule } from './shared/shared.module'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    LinkModule,
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

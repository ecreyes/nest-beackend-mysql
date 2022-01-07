import { Module } from '@nestjs/common'

import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ProductModule,
    OrderModule,
    LinkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}

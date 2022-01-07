import { Module } from '@nestjs/common'

import { DatabaseModule } from '../database/database.module'

import { OrderController } from './order.controller'
import { orderProviders } from './order.providers'
import { OrderService } from './order.service'
import { OrderItemService } from './order-item.service'

@Module({
  imports:[
    DatabaseModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderItemService,
    ...orderProviders,
  ],
})
export class OrderModule {}

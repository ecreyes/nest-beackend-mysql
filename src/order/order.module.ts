import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'

import { OrderController } from './order.controller'
import { orderProviders } from './order.providers'
import { OrderService } from './order.service'
import { OrderItemService } from './order-item.service'

@Module({
  imports:[
    SharedModule,
  ],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderItemService,
    ...orderProviders,
  ],
})
export class OrderModule {}


import { Connection } from 'typeorm'

import { Order } from './order.entity'
import { OrderItem } from './order-item.entity'

export const orderProviders = [
  {
    provide: 'ORDER_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Order),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'ORDER_ITEM_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(OrderItem),
    inject: ['DATABASE_CONNECTION'],
  },
]

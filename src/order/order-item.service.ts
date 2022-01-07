import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { AbstractService } from '../shared/abstract.service'

import { OrderItem } from './order-item.entity'

@Injectable()
export class OrderItemService extends AbstractService<OrderItem> {
    constructor(@Inject('ORDER_ITEM_REPOSITORY') private orderItemRepository: Repository<OrderItem>) {
        super(orderItemRepository)
    }
}

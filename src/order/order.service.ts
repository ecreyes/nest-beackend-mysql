import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { AbstractService } from '../shared/abstract.service'

import { Order } from './order.entity'

@Injectable()
export class OrderService extends AbstractService<Order> {
    constructor(@Inject('ORDER_REPOSITORY') private orderRepository: Repository<Order>) {
        super(orderRepository)
    }
}

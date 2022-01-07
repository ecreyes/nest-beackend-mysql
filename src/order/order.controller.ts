import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common'

import { OrderService } from './order.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('admin/orders')
    async all() {
        try {
            return await this.orderService.find({
                relations:  ['order_items'],
            })
        }catch(error) {
            console.log(error)

            throw error
        }
    }
}

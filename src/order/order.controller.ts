import { ClassSerializerInterceptor, Controller, Get, UseGuards, UseInterceptors } from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'

import { OrderService } from './order.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class OrderController {
    constructor(private orderService: OrderService) {}

    @Get('admin/orders')
    @UseGuards(AuthGuard)
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

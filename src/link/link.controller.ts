import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'

import { LinkService } from './link.service'

@Controller()
export class LinkController {
    constructor(private linkService: LinkService) { }

    @Get('admin/users/:id/links')
    @UseGuards(AuthGuard)
    async all(@Param('id') id:number) {
        try {
            return await this.linkService.find({
                user: id,
                relations: ['orders'],
            })
        }catch(error) {
            console.log(error)

            throw error
        }
    }
}

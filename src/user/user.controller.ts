import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common'

import { UserService } from './user.service'

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class UserController {

    constructor(private userService: UserService) {

    }

    @Get('admin/ambassadors')
    async ambassadors() {
        try {

            const ambassadors = await this.userService.find({ is_ambassador: true })

            return ambassadors
        }catch(error) {
            console.log(error)

            throw error
        }
    }
}

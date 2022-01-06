import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import * as bycriptjs from 'bcryptjs'

import { UserService } from 'src/user/user.service'

import { RegisterDto } from './dtos/register.dto'

@Controller()
export class AuthController {

    constructor(private userService: UserService) {

    }

    @Post('admin/register')
    async register(@Body() body: RegisterDto) {
        const { password_confirm, ...data } = body

        if(body.password !== password_confirm) throw new BadRequestException('Passwords do not match')

        const hashed = await bycriptjs.hash(body.password,12)

        return this.userService.save({
            ...data,
            password: hashed,
            is_ambassador: false,
        })
    }
}

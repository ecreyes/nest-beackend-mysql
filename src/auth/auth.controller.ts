import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bycriptjs from 'bcryptjs'
import { Request, Response } from 'express'

import { User } from 'src/user/user.entity'
import { UserService } from 'src/user/user.service'

import { RegisterDto } from './dtos/register.dto'
import { AuthGuard } from './auth.guard'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('admin')
export class AuthController {

    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    @Post('register')
    async register(@Body() body: RegisterDto): Promise<User> {
        try {
            const { password_confirm, ...data } = body

            if(body.password !== password_confirm) throw new BadRequestException('Passwords do not match')

            const hashed = await bycriptjs.hash(body.password,12)

            return this.userService.save({
                ...data,
                password: hashed,
                is_ambassador: false,
            })
        }catch (error) {
            console.log(error)

            throw error
        }
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response) {
        try {
            const user = await this.userService.findOne({ email })

            if(!user) throw new BadRequestException('user not found')

            const validPassword = await bycriptjs.compare(password, user.password)

            if(!validPassword) throw new BadRequestException('invalid credentials')

            const jwt = await this.jwtService.signAsync({
                id: user.id,
                email: user.email,
            })

            response.cookie('jwt', jwt, { httpOnly: true })

            return {
                message: 'success',
            }
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @UseGuards(AuthGuard)
    @Get('user')
    async user(@Req() request: Request) {
        try{
            const cookie = request.cookies.jwt
            const { id } = await this.jwtService.verifyAsync(cookie)
            const user = await this.userService.findOne({ id })

            return user
        }catch(error) {
            console.log(error)

            throw error
        }

    }

    @Post('logout')
    async logout(@Res({ passthrough: true }) response: Response) {
        try {
            response.clearCookie('jwt')

            return {
                message: 'success',
            }
        }catch(error) {
            console.log(error)

            throw error
        }
    }
}

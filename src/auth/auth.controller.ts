import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Post, Put, Req, Res, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bycriptjs from 'bcryptjs'
import { Request, Response } from 'express'

import { User } from '../user/user.entity'
import { UserService } from '../user/user.service'

import { RegisterDto } from './dtos/register.dto'
import { AuthGuard } from './auth.guard'

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {

    constructor(private userService: UserService, private jwtService: JwtService) {

    }

    @Post(['admin/register','ambassador/register'])
    async register(@Body() body: RegisterDto, @Req() request: Request): Promise<User> {
        try {
            const { password_confirm, ...data } = body
            const is_ambassador = request.path === '/api/ambassador/register'

            if(body.password !== password_confirm) throw new BadRequestException('Passwords do not match')

            const hashed = await bycriptjs.hash(body.password,12)

            return this.userService.save({
                ...data,
                password: hashed,
                is_ambassador,
            })
        }catch (error) {
            console.log(error)

            throw error
        }
    }

    @Post(['admin/login','ambassador/login'])
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
        @Res({ passthrough: true }) response: Response,
        @Req() request: Request) {
        try {
            const user = await this.userService.findOne({ email })
            const is_admin = request.path === '/api/admin/login'

            if(!user) throw new BadRequestException('user not found')

            const validPassword = await bycriptjs.compare(password, user.password)

            if(!validPassword) throw new BadRequestException('invalid credentials')

            if(user.is_ambassador && is_admin) throw new UnauthorizedException()

            const jwt = await this.jwtService.signAsync({
                id: user.id,
                email: user.email,
                scope: is_admin ? 'admin' : 'ambassador',
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

    @Get(['admin/user','ambassador/user'])
    @UseGuards(AuthGuard)
    async user(@Req() request: Request) {
        try{
            const cookie = request.cookies.jwt
            const { id } = await this.jwtService.verifyAsync(cookie)
            
            const is_admin_url = request.path === '/api/admin/user'
            if(is_admin_url){
                const user = await this.userService.findOne({ id })
                return user
            }
            const user = await this.userService.findOne({
                 id,
                 relations: ['orders', 'orders.order_items'] 
                })
            const {orders, password, ...data} = user
            return {...data, revenue: user.revenue}
            
        }catch(error) {
            console.log(error)

            throw error
        }

    }

    @Put(['admin/user/info','ambassador/user/info'])
    @UseGuards(AuthGuard)
    async updateInfo(
        @Req() request: Request,
        @Body('first_name') first_name: string,
        @Body('last_name') last_name: string,
        @Body('email') email: string,
        ) {
        try {
            const cookie = request.cookies.jwt
            const { id } = await this.jwtService.verifyAsync(cookie)

            await this.userService.update(id, { first_name, last_name, email })

            return await this.userService.findOne({ id })
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Put(['admin/user/password','ambassador/user/password'])
    @UseGuards(AuthGuard)
    async updatePassword(
        @Req() request: Request,
        @Body('password') password: string,
        @Body('password_confirm') password_confirm: string,
        ) {
        try {
            if(password !== password_confirm) throw new BadRequestException('Passwords do not match')

            const cookie = request.cookies.jwt
            const { id } = await this.jwtService.verifyAsync(cookie)
            const hashed = await bycriptjs.hash(password,12)

            await this.userService.update(id, { password: hashed })

            return await this.userService.findOne({ id })
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Post(['admin/logout','ambassador/logout'])
    @UseGuards(AuthGuard)
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

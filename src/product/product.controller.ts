import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

import { ProductCreateDto } from './dtos/product-create.dto'
import { ProductService } from './product.service'

@Controller()
export class ProductController {
    constructor(private productService: ProductService) {

    }

    @Get('admin/products')
    async all() {
        try {
            return await this.productService.find({})
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Post('admin/products')
    async create(@Body() body:ProductCreateDto) {
        try {
            return await this.productService.save(body)
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Get('admin/products/:id')
    async get(@Param('id') id: number) {
        try {
            return await this.productService.findOne({ id })
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Put('admin/products/:id')
    async put(@Param('id') id: number, @Body() body:ProductCreateDto) {
        try {
            await this.productService.update(id, body)

            return await this.productService.findOne({ id })
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Delete('admin/products/:id')
    async delete(@Param('id') id: number) {
        try {
            return await this.productService.delete(id)
        }catch(error) {
            console.log(error)

            throw error
        }
    }
}

import { Body, CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common'

import { AuthGuard } from '../auth/auth.guard'

import { ProductCreateDto } from './dtos/product-create.dto'
import { ProductService } from './product.service'
import { Cache } from 'cache-manager'

@Controller()
export class ProductController {
    constructor(private productService: ProductService, @Inject(CACHE_MANAGER) private cacheManager: Cache) {

    }

    @Get('admin/products')
    @UseGuards(AuthGuard)
    async all() {
        try {
            return await this.productService.find({})
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Post('admin/products')
    @UseGuards(AuthGuard)
    async create(@Body() body:ProductCreateDto) {
        try {
            return await this.productService.save(body)
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Get('admin/products/:id')
    @UseGuards(AuthGuard)
    async get(@Param('id') id: number) {
        try {
            return await this.productService.findOne({ id })
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Put('admin/products/:id')
    @UseGuards(AuthGuard)
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
    @UseGuards(AuthGuard)
    async delete(@Param('id') id: number) {
        try {
            return await this.productService.delete(id)
        }catch(error) {
            console.log(error)

            throw error
        }
    }

    @Get('ambassador/products/frontend')
    @CacheKey('products_frontend')
    @CacheTTL(30*60)
    @UseInterceptors(CacheInterceptor)
    async frontend() {
        return this.productService.find({})
    }

    @Get('ambassador/products/backend')
    async backend() {
        let products = await this.cacheManager.get('products_backend')
        if(!products){
            products = await this.productService.find({})
            await this.cacheManager.set('products_backed',products, { ttl: 30* 60})
        }
        return products
    }
}

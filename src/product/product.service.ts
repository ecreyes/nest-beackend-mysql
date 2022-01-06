import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { AbstractService } from '../shared/abstract.service'

import { Product } from './product.entity'

@Injectable()
export class ProductService extends AbstractService<Product> {
    constructor(@Inject('PRODUCT_REPOSITORY') private productRepository: Repository<Product>) {
        super(productRepository)
    }
}

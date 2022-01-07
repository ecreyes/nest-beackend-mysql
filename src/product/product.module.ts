import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'

import { ProductController } from './product.controller'
import { productProviders } from './product.providers'
import { ProductService } from './product.service'

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ...productProviders,
  ],
})
export class ProductModule {}

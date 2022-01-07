import { Module } from '@nestjs/common'

import { SharedModule } from '../shared/shared.module'

import { LinkController } from './link.controller'
import { linkProviders } from './link.providers'
import { LinkService } from './link.service'

@Module({
  imports: [
    SharedModule,
  ],
  controllers: [LinkController],
  providers: [
    LinkService,
    ...linkProviders,
  ],
})
export class LinkModule {}

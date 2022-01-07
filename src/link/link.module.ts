import { Module } from '@nestjs/common'

import { DatabaseModule } from 'src/database/database.module'

import { LinkController } from './link.controller'
import { linkProviders } from './link.providers'
import { LinkService } from './link.service'

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [LinkController],
  providers: [
    LinkService,
    ...linkProviders,
  ],
})
export class LinkModule {}

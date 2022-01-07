import { Inject, Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { AbstractService } from 'src/shared/abstract.service'

import { Link } from './link.entity'

@Injectable()
export class LinkService extends AbstractService<Link> {
    constructor(@Inject('LINK_REPOSITORY') private readonly linkRepository: Repository<Link>) {
        super(linkRepository)
    }
}

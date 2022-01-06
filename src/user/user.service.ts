import { Inject,Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { AbstractService } from '../shared/abstract.service'

import { User } from './user.entity'

@Injectable()
export class UserService extends AbstractService<User> {
    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>) {
        super(userRepository)
    }
}

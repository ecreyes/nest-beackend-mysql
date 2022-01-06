import { Inject,Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

import { User } from './user.entity'

@Injectable()
export class UserService {
    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>) {

    }

    public save(options: any): Promise<User> {
        return this.userRepository.save(options)
    }

    public findOne(options: any): Promise<User> {
        return this.userRepository.findOne(options)
    }

    public find(options: any): Promise<User[]> {
        return this.userRepository.find(options)
    }

    public update(id, options) {
        return this.userRepository.update(id, options)
    }
}

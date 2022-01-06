import { NestFactory } from '@nestjs/core'
import bycriptjs from 'bcryptjs'
import faker from 'faker'

import { AppModule } from '../app.module'
import { UserService } from '../user/user.service'

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule)
    const userService = app.get(UserService)
    const password = await bycriptjs.hash('12345',12)

    for(let i=0 ; i<30 ; i++)
        await userService.save({
            first_name: faker.name.firstName(),
            last_name: faker.name.lastName(),
            email: faker.internet.email(),
            password,
            is_ambassador: true,
        })
    process.exit()
  }

  bootstrap()

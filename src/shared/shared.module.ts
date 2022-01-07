import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import { DatabaseModule } from '../database/database.module'

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '6h' },
        }),
    ],
    exports: [
        JwtModule,
        DatabaseModule,
    ],
})
export class SharedModule {}

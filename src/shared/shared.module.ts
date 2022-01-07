import { CacheModule, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'

import * as redisStore from 'cache-manager-redis-store'
import { DatabaseModule } from '../database/database.module'

@Module({
    imports: [
        DatabaseModule,
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '6h' },
        }),
        CacheModule.register({
            store: redisStore,
            // Store-specific configuration:
            host: 'redis',
            port: 6379,
        }),
    ],
    exports: [
        JwtModule,
        DatabaseModule,
        CacheModule
    ],
})
export class SharedModule {}

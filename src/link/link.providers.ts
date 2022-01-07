
import { Connection } from 'typeorm'

import { Link } from './link.entity'

export const linkProviders = [
  {
    provide: 'LINK_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Link),
    inject: ['DATABASE_CONNECTION'],
  },
]

import { createConnection } from 'typeorm'

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'ambassador',
      entities: [
        `${__dirname}/../**/*.entity{.ts,.js}`,
      ],
      synchronize: true,
    }),
  },
]

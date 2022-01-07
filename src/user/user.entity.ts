import { Exclude } from 'class-transformer'
import { Order } from '../order/order.entity'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ unique: true })
    email: string

    @Exclude()
    @Column()
    password: string

    @Column({ default: true })
    is_ambassador: boolean

    @OneToMany(()=> Order, order => order.user, {
        createForeignKeyConstraints: false,
    })
    orders: Order[]

    get revenue(): number {
        const ordersComplete = this.orders.filter(order => order.complete)
        let total = 0;
        ordersComplete.forEach(order => {
            total = total + order.ambassadorRevenue
        })
        return total
    }
}

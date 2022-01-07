import { Exclude, Expose } from 'class-transformer'
import { User } from '../user/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Link } from '../link/link.entity'

import { OrderItem } from './order-item.entity'

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ nullable: true })
    transaction_id: string

    @Column()
    user_id: number

    @Column()
    code: string

    @Column()
    ambassador_email: string

    @Column()
    @Exclude()
    first_name: string

    @Column()
    @Exclude()
    last_name: string

    @Column()
    email: string

    @Column({ nullable: true })
    address: string

    @Column({ nullable: true })
    country:string

    @Column({ nullable: true })
    city:string

    @Column({ nullable: true })
    zip:string

    @Column({ default: false })
    @Exclude()
    complete:boolean

    @ManyToOne(()=> User, user => user.orders, {
        createForeignKeyConstraints: false,
    })
    user: User

    @OneToMany(() => OrderItem, orderItem => orderItem.order)
    order_items: OrderItem[]

    @ManyToOne(() => Link, link => link.orders, {
        createForeignKeyConstraints: false,
    })
    @JoinColumn({
        referencedColumnName: 'code',
        name: 'code',
    })
    link: Link

    @Expose()
    get name() {
        return `${this.first_name} ${this.last_name}`
    }

    @Expose()
    get total() {
        const qttys = this.order_items.map(item => item.admin_revenue)
        let total = 0

        qttys.forEach(qtty => {
            total = total + qtty
        })

        return total
    }

    get ambassadorRevenue(): number {
        const qttys = this.order_items.map(item => item.ambassador_revenue)
        let total = 0

        qttys.forEach(qtty => {
            total = total + qtty
        })

        return total
    }
}

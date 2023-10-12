import { Server } from "../../server/entities/server.entity";
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()

export class Component {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    brand: string;

    @Column()
    model: string;

    @Column()
    type: string;

    @Column({default: '/assets/noimage.jpg'})
    image: string;

    @Column({default: 1})
    stock: number;

    @Column({default: 1})
    quantity: number;

    @Column({ default: false})
    isActive: boolean;

    @ManyToOne(() => Server, (server) => server.component)
    server: Server;
}


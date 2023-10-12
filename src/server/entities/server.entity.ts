import { Component } from "../../component/entities/component.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class Server {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    brand: string
    
    @Column()
    model: string

    @OneToMany(() => Component, (component) => component.server)
    component: Component[]
}
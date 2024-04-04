import {ObjectIdColumn, Column, ObjectId, Entity, OneToMany} from 'typeorm';

export enum UserType {
  Student = 'Student',
  Teacher = 'Teacher'
}

@Entity()
export class User {
    @ObjectIdColumn()
    _id: ObjectId;

    @Column()
    email: string

    @Column()
    password: string;

    @Column()
    confirmed: boolean;

    @Column()
    confirmationToken: string;

    @Column()
    name: string;

    @Column({default: undefined})
    resetToken: string;

    @Column({default: UserType.Student})
    type: UserType;
}

import { Entity, PrimaryColumn, Column } from "typeorm";
import { TasksEntity } from "./tasks.entity";

@Entity({
  name: "user",
})
export class UserEntity {
  @PrimaryColumn()
  id!: string;

  @Column({
    length: 60,
  })
  name: string;

  @Column()
  email: string;

  @Column()
  pass: number;
}

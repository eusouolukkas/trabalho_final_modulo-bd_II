import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({
  name: "tasks",
})
export class TasksEntity {
  @PrimaryColumn()
  id!: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({
    name: "id_user",
  })
  user!: UserEntity;
}

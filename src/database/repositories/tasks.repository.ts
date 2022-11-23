import { Tasks } from "../../models/tasks";
import { User } from "../../models/user";
import { pgHelper } from "../config/pg-helper";
import { TasksEntity } from "../entities/tasks.entity";
import { UserEntity } from "../entities/user.entity";
import { UserRepository } from "./user.repository";

interface UpdateTasksDTO {
  title?: string;
  description?: string;
}

export class TasksRepository {
  private _repository = pgHelper.client.getRepository(TasksEntity);

  public async list() {
    return await this._repository.find({
      relations: {
        user: true,
      },
    });
  }

  public async getById(id: string) {
    return await this._repository.findOneBy({
      id,
    });
  }

  public async create(tasks: Tasks) {
    const userRepository = new UserRepository();
    const user = await userRepository.getById(tasks.user.id);

    const tasksEntity = this._repository.create({
      id: tasks.id,
      title: tasks.title,
      description: tasks.description,
      //user,
      user: user ?? undefined,
    });

    return await this._repository.save(tasksEntity);
  }

  public async update(tasksEntity: TasksEntity, data: UpdateTasksDTO) {
    if (data.title) {
      tasksEntity.title = data.title;
    }

    if (data.description) {
      tasksEntity.description = data.description;
    }

    return await this._repository.save(tasksEntity);
  }

  public async delete(id: string) {
    return await this._repository.delete({
      id,
    });
  }
}

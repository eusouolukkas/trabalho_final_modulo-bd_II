import { User } from "../../models/user";
import { DataBaseConnection } from "../config/connection";
import { UserEntity } from "../entities/user.entity";

export class UserRepository {
  private _repository = DataBaseConnection.connection.getRepository(UserEntity);

  public async list() {
    return await this._repository.find();
  }

  public async getById(id: string) {
    return await this._repository.findOneBy({
      id,
    });
  }

  public async create(user: User) {
    const userEntity = this._repository.create({
      id: user.id,
      name: user.name,
      email: user.email,
      pass: user.pass,
      //tasks: user.tasks.join(","),
    });

    return await this._repository.save(userEntity);
  }

  public async delete(id: string) {
    return await this._repository.delete({
      id,
    });
  }
}

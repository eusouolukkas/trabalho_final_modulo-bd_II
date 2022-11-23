import { User } from "../../models/user";
import { pgHelper } from "../config/pg-helper";
import { UserEntity } from "../entities/user.entity";

export class UserRepository {
  private _repository = pgHelper.client.getRepository(UserEntity);

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

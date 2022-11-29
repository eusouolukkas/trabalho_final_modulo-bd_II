import { Request, Response } from "express";
import { userList } from "../data/users.list";
import { TasksRepository } from "../database/repositories/tasks.repository";
import { UserRepository } from "../database/repositories/user.repository";
import { Tasks } from "../models/tasks";
import { User } from "../models/user";

export class TasksController {
  public async listTask(req: Request, res: Response) {
    try {
      const repository = new TasksRepository();
      const result = await repository.list();

      return res.status(200).send({
        ok: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public async updateTask(req: Request, res: Response) {
    try {
      const { taskId } = req.params;
      const { title, description } = req.body;

      const repository = new TasksRepository();
      const result = await repository.getById(taskId);

      if (!result) {
        return res.status(404).send({
          ok: false,
          message: "Tarefa não encontrada!",
        });
      }

      const resultUpdate = repository.update(result, {
        title,
        description,
      });

      return res.status(200).send({
        ok: true,
        message: "Tarefa atualizada com sucesso",
        data: resultUpdate,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public async createTask(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const { title, description } = req.body;

      if (!title) {
        return res.status(400).send({
          ok: false,
          message: "Title not provided",
        });
      }

      if (!description) {
        return res.status(400).send({
          ok: false,
          message: "Description not provided",
        });
      }

      if (!userId) {
        return res.status(400).send({
          ok: false,
          message: "User is not found",
        });
      }

      const userRepository = new UserRepository();
      const userResult = await userRepository.getById(userId);

      if (!userResult) {
        return res.status(404).send({
          ok: false,
          message: "Usuário não encontrado",
        });
      }

      const user = User.create(
        userResult.id,
        userResult.email,
        userResult.pass,
        userResult.name
      );

      const tasks = new Tasks(title, description, user);

      const tasksRepository = new TasksRepository();
      const result = await tasksRepository.create(tasks);

      return res.status(201).send({
        ok: true,
        message: "Tarefa criada com sucesso",
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }

  public async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const repository = new TasksRepository();
      const result = await repository.delete(id);

      return res.status(200).send({
        ok: true,
        data: result,
      });
    } catch (error: any) {
      return res.status(500).send({
        ok: false,
        message: "Instabilidade no servidor!",
        error: error.toString(),
      });
    }
  }
}

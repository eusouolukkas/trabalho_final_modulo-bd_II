import { Request, Response, Router } from "express";
import { TasksController } from "../controllers/tasks.controller";

const tasksRoutes = Router();

//---------------TasksRoutes--------------

tasksRoutes.get("/:userId", new TasksController().listTask);

tasksRoutes.post("/:userId", (req: Request, res: Response) => {
  new TasksController().createTask(req, res);
});

tasksRoutes.put("/:userId/:taskId", (req: Request, res: Response) =>
  new TasksController().updateTask(req, res)
);

tasksRoutes.delete("/:userId/:taskId", (req: Request, res: Response) =>
  new TasksController().deleteTask(req, res)
);

/* userRoutes.get("/:userId/tasks/", (req: Request, res: Response) =>
  new TasksController().listAll(req, res)
); */

export { tasksRoutes };

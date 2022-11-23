import { Request, Response, Router } from "express";
import { UserController } from "../controllers/user.controller";
import { userValidator } from "../middlewares/user.exists";

const userRoutes = Router();

//GET
userRoutes.get("/", (req: Request, res: Response) =>
  new UserController().list(req, res)
);

// POST
userRoutes.post("/", [userValidator], (req: Request, res: Response) =>
  new UserController().createUser(req, res)
);

//GET LOGIN
userRoutes.post("/login", new UserController().login);

export { userRoutes };

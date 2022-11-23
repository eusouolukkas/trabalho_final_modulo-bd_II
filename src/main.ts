import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { userRoutes } from "./routes/user.routes";
import { pgHelper } from "./database/config/pg-helper";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

pgHelper
  .connect()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log("API rodando...");
    });
  })
  .catch((err) => console.log(err));

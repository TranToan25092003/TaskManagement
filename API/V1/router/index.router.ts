import { Express } from "express";
import { taskRouter } from "./task.router";
import { userRouter } from "./user.router";
import * as authMiddleware from "../../../middleware/auth.middleware";

const routerV1 = (app: Express): void => {
  const version = "/api/v1";

  //# /api/v1/tasks/*
  app.use(version + "/tasks", authMiddleware.requireAuth, taskRouter);

  //# /api/v1/user/*
  app.use(version + "/user", authMiddleware.requireAuth, userRouter);
};

export default routerV1;

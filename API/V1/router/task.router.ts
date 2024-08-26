import { Router } from "express";
const router: Router = Router();
import * as controller from "../../../controller/task.controller";

//# [GET] [/tasks]
router.get("/", controller.alltask);

//# [GET] [/tasks/detail/:id]
router.get("/detail/:id", controller.detailTask);

//# [PATCH] /api/v1/tasks/change/status/:id
router.patch("/change/status/:id", controller.changeStatus);

//# [PATCH] /api/v1/tasks/change/status-multip
router.patch("/change/status-multip", controller.changeStatusMul);

//# [POST] /api/v1/tasks/create
router.post("/create", controller.createTask);

//# [PATCH] /api/v1/tasks/edit/:id
router.patch("/edit/:id", controller.edit);

//# [DELETE] /api/v1/tasks/delete/:id
router.delete("/delete/:id", controller.deleteTask);

export const taskRouter: Router = router;

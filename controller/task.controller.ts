import task from "../model/task.model";
import { Request, Response } from "express";
import pagination from "../helper/pagination.helper";

// //# GET [/tasks]
export const alltask = async (req: Request, res: Response): Promise<void> => {
  let condition = {
    deleted: false,
  };

  if (req.query.status) {
    condition["status"] = req.query.status.toString();
  }

  // sort
  let sort = {};

  if (req.query.sortkey && req.query.sortvalue) {
    sort[req.query.sortkey.toString()] = req.query.sortvalue.toString();
  }
  //end sort

  // pagination
  //# count length document
  const countDocument = await task.countDocuments({ deleted: false });

  const paginationObj = pagination(
    {
      currentPage: 1,
      limit: 10,
    },
    req.query,
    countDocument
  );

  //end pagination

  const tasks = await task
    .find(condition)
    .sort(sort)
    .limit(paginationObj.limit)
    .skip((paginationObj.currentPage - 1) * paginationObj.limit);

  res.json({
    tasks: tasks,
  });
};

//# GET [/tasks/detail/:id]
export const detailTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;

    const tasks = await task.findOne({
      _id: id,
      deleted: false,
    });

    res.json(tasks);
  } catch (error) {
    res.json({ status: 404 });
  }
};

//# [PATCH] /api/v1/tasks/change/status/:id
export const changeStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;

    const status: string = req.body.status;

    await task.updateOne(
      {
        _id: id,
      },
      {
        status: status,
      }
    );

    res.json({
      code: 200,
      message: "update success fully",
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Does not exist",
    });
  }
};

// //# [PATCH] /api/v1/tasks/change/status/multip
export const changeStatusMul = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id, key, value } = req.body;

    enum keyChange {
      STATUS = "status",
      DELETE = "delete",
    }

    if (key === keyChange.STATUS) {
      // update status

      await task.updateMany(
        {
          _id: { $in: id },
        },
        {
          status: value,
        }
      );

      res.json({
        code: 200,
        message: "update success",
      });

      //end update status

      // delete multip
    } else if (key === keyChange.DELETE) {
      await task.updateMany(
        {
          _id: { $in: id },
        },
        {
          deleted: true,
          deletedAt: new Date(),
        }
      );

      res.json({
        code: 200,
        message: "delete success",
      });

      //end delete multip
    }
  } catch (error) {
    res.json({ code: 400 });
  }
};

// //# [POST] /api/v1/tasks/create
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const newTask = new task(req.body);
    await newTask.save();
    res.json({
      code: 200,
      message: "create success",
      data: newTask,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "create failed",
    });
  }
};

// //# [PATCH] /api/v1/tasks/edit/:id
export const edit = async (req: Request, res: Response): Promise<void> => {
  try {
    const id: string = req.params.id;
    await task.updateOne(
      {
        _id: id,
      },
      req.body
    );
    res.json({
      code: 200,
      message: "update success",
    });
  } catch (error) {
    res.json({
      code: 400,
    });
  }
};

//# [DELETE] /api/v1/tasks/delete/:id
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id: string = req.params.id;
    await task.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
        deletedAt: new Date(),
      }
    );

    res.json({
      code: 200,
      message: "delete success",
    });
  } catch (error) {
    res.json({
      code: 400,
    });
  }
};

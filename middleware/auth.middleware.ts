import exp from "constants";
import { Request, Response, NextFunction } from "express";
import user from "../model/user.model";

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // check token
  if (req.headers.authorization) {
    const token: string = req.headers.authorization.split(" ")[1];

    const account = await user
      .findOne({
        token: token,
        deleted: false,
      })
      .select("-password");

    if (!account) {
      res.json({
        code: 400,
        message: "token is invalid",
      });
      return;
    }

    req["account"] = account;
    next();
  } else {
    res.json({
      code: 400,
      message: "missing token",
    });
  }
};

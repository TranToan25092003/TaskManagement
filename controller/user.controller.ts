import { Request, Response } from "express";
import * as random from "../helper/randomToken";
import user from "../model/user.model";
import md5 from "md5";

//# [POST] /api/v1/user/register
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    req.body.password = md5(req.body.password);

    // check duplicate email

    const account = await user.findOne({
      email: req.body.email,
      deleted: false,
    });

    if (account) {
      res.json({
        code: 400,
        message: "email already exist",
      });
      return;
    }

    //end check duplicate email

    // create account
    req.body.token = random.random(20);
    const newAccount = new user({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      token: req.body.token,
    });

    await newAccount.save();

    res.cookie("token", newAccount.token);

    res.json({
      code: 200,
      message: "success",
      token: newAccount.token,
    });

    //end create account
  } catch (error) {
    res.json({
      code: 400,
      message: "can not singup",
    });
  }
};

//# [POST] /api/v1/user/login
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // find account in db

    const account = await user.findOne({
      email: req.body.email,
      deleted: false,
    });

    //end find account in db

    // check exist account
    if (!account) {
      res.json({
        code: 400,
        message: "account does not exist",
      });
      return;
    }
    //end check exist account

    // check password
    if (md5(req.body.password) !== account.password) {
      res.json({
        code: 400,
        message: "password incorrect",
      });
      return;
    }
    //end check password

    const token = account.token;
    res.cookie("token", token); // set token

    res.json({
      code: 200,
      message: "login success",
      token: token,
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "Can not login",
    });
  }
};

//# [POST] /api/v1/user/password/forgot
// export const forgotPassword = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const email: string = req.body.email;

//     // find email in db
//     const existEmail = await user.findOne({
//       email: email,
//       deleted: false,
//     });
//     // end find email in db

//     // check email exist
//     if (!existEmail) {
//       res.json({
//         code: 400,
//         message: "email does not exist",
//       });
//       return;
//     }
//     //end check email exist

//     // create object forgot password
//     const OTP = random.OTP(6);
//     const objectForgotPassword = new forgotModel({
//       email: email,
//       OTP: OTP,
//       expireAt: Date.now(),
//     });

//     await objectForgotPassword.save();

//     // end create object forgot password

//     // send otp
//     const subject = "Your OTP";
//     const content = `Your OTP is: <b>${OTP}</b> it will be expired in 3 minutes`;
//     sendMail.send(email, subject, content);
//     //end send otp

//     res.json({
//       code: 200,
//       message: "send otp success",
//     });
//   } catch (error) {
//     res.json({
//       code: 400,
//       message: "error",
//     });
//   }
// };

//# [GET] /api/v1/user/detail
export const information = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    res.json({
      code: 200,
      message: "success",
      infor: req["account"],
    });
  } catch (error) {
    res.json({
      code: 400,
      message: "error",
    });
  }
};

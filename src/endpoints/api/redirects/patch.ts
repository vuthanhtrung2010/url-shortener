import { Request, Response } from "express";

import Redirect from "../../../models/Redirect";

export default async (req: Request, res: Response) => {
  const password = req.headers.password;

  if (!password)
    return res
      .status(401)
      .json({ message: "No password provided.", code: "NO_PASSWORD" });
  if (password !== process.env.password)
    return res
      .status(401)
      .json({
        message: "The password provided was incorrect.",
        code: "INCORRECT_PASSWORD",
      });

  if (!req.body.path)
    return res
      .status(400)
      .json({ message: "No path name was provided.", code: "NO_PATH_NAME" });
  if (!req.body.redirect)
    return res
      .status(400)
      .json({ message: "No redirect was provided.", code: "NO_REDIRECT" });

  const path = req.body.path.toLowerCase();
  const redirect = req.body.redirect;
  const redirect_path = req.body.redirect_path;

  const data = await Redirect.findOne({ path: path });

  if (!data)
    return res
      .status(204)
      .json({ message: "Path does not exist.", code: "INVALID_PATH" });

  await Redirect.findOneAndUpdate(
    { path: path },
    { redirect: redirect, redirect_path: redirect_path },
  );

  res.status(200).json({
    message: "Updated redirect.",
    code: "UPDATED_REDIRECT",
    path: path,
    old: {
      redirect: data.redirect,
      redirect_path: data.redirect_path,
    },
    new: {
      redirect: redirect,
      redirect_path: redirect_path,
    },
  });
};

import { Request, Response } from "express";

import Redirect from "../../../models/Redirect";

export default async (req: Request, res: Response) => {
  const invalidPaths = [
    ".",
    "/",
    "api",
    "assets",
    "dashboard",
    "index",
    "info",
    "js",
    "redirects",
    "robots.txt",
    "tailwind.config.js",
  ];

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

  let validPath = true;

  for (const invalidPath of invalidPaths) {
    if (path.startsWith(invalidPath)) validPath = false;
  }

  if (!validPath)
    return res
      .status(403)
      .json({
        message: "The provided path name is invalid.",
        code: "INVALID_PATH_NAME",
      });

  if (await Redirect.exists({ path: path }))
    return res
      .status(400)
      .json({ message: "Redirect already exists.", code: "REDIRECT_EXISTS" });

  new Redirect({
    path: path,
    redirect: redirect,
    redirect_path: redirect_path,
    created: Date.now(),
    hits: 0,
  }).save();

  res.status(200).json({
    message: "Created redirect.",
    code: "CREATED_REDIRECT",
    redirect: {
      path: path,
      redirect: redirect,
      redirect_path: redirect_path,
    },
  });
};

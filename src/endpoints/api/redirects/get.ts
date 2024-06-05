import { Request, Response } from "express";

import Redirect from "../../../models/Redirect";

export default async (req: Request, res: Response) => {
  const data = await Redirect.find();

  const redirects: Array<Object> = [];

  data.forEach((redirect: any) => {
    redirects.push({
      path: redirect.path,
      redirect: redirect.redirect,
      redirect_path: redirect.redirect_path,
    });
  });

  res.status(200).json(redirects);
};

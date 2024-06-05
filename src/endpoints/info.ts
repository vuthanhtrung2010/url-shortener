import { Request, Response } from "express";
import moment from "moment";

import Redirect from "../models/Redirect";

export default async (req: Request, res: Response) => {
  const data = await Redirect.findOne({ path: req.params.path });

  if (!data) return res.status(404).redirect("/");

  res.status(200).render("info", { data: data, moment: moment });
};

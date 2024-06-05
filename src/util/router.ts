import { Router } from "express";

const router = Router();
import routes from "./routes";

import { Request, Response, NextFunction } from "express";
import Redirect from "../models/Redirect";
require("dotenv").config();

router.get("/", async (req: Request, res: Response) => {
  routes.index(req, res);
});

router.delete("/api/redirects", async (req: Request, res: Response) => {
  routes.api.redirects.delete(req, res);
});

router.get("/api/redirects", async (req: Request, res: Response) => {
  routes.api.redirects.get(req, res);
});

router.patch("/api/redirects", async (req: Request, res: Response) => {
  routes.api.redirects.patch(req, res);
});

router.put("/api/redirects", async (req: Request, res: Response) => {
  routes.api.redirects.put(req, res);
});

router.get("/dashboard", async (req: Request, res: Response) => {
  routes.dashboard(req, res);
});

router.get("/redirects", async (req: Request, res: Response) => {
  routes.redirects(req, res);
});

router.get("/info/:path", async (req: Request, res: Response) => {
  routes.info(req, res);
});

// Redirect requests
router.use(async (req: Request, res: Response, next: NextFunction) => {
  const path = req.url
    .toLowerCase()
    .replace(/^\//g, "")
    .split("/")[0]
    .split("?")[0];

  const data = await Redirect.findOne({ path: path });

  if (data) {
    const subpath = req.url.replace(data.path, "").replace("/", "");

    data.redirect_path
      ? res.redirect(302, data.redirect + subpath)
      : res.redirect(302, data.redirect);

    await Redirect.findOneAndUpdate({ path: data.path }, { $inc: { hits: 1 } });
  } else {
    res.status(404).redirect("/");
  }
});

export default router;

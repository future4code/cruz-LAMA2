import express from "express";
import { BandController } from "../controller/bandController";

export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/create", bandController.createband);
bandRouter.get("/findband", bandController.findBand);

import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/create", bandController.createband);
bandRouter.get("/findband", bandController.findBand);

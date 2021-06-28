import { Request, Response } from "express";
import ShowBussines from "../business/ShowBussines";
import { BaseDatabase } from "../data/BaseDatabase";
import { Show, showInputDTO } from "../model/Show";

class ShowController {

    async create(req: Request, res: Response) {
        try {
            const weekDay = Show.toWeekDay(req.body.weekDay);
            const input: showInputDTO = {
                bandId: req.body.bandId,
                weekDay,
                startTime: req.body.startTime,
                endTime: req.body.endTime
            }

            await ShowBussines.createShow(input, req.headers.authorization as string)
            res.status(200).send({ message: "Create with sucesseful!" })
        } catch (error) {
            res.status(400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }

    async getAllShows(req: Request, res: Response) {
        try {
            const token = req.headers.authorization!
            const weekDay = Show.toWeekDay(req.body.weekDay);
            const shows = await ShowBussines.getAllShow(token,weekDay)

            res.status(200).send({shows})
        } catch (error) {
            res.status(400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }

    }
}
export { ShowController }
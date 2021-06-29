import { Request, Response } from "express";
import { LoginInputDTO, BandInputDTO, InputFindBand } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import BandBusiness from "../business/BandBussines";
import BandBussines from "../business/BandBussines";


export class BandController {
    async createband(req: Request, res: Response) {
        try {

            const input: BandInputDTO = {
                token: req.headers.authorization as string,
                music_genre: req.body.music_genre,
                name: req.body.name,
                responsible: req.body.responsible
            }

            const messageBand = await BandBussines.createband(input);

            res.status(200).send({
                "message": "Band create sucesseful!",
                "band": messageBand
            });

        } catch (error) {
            res.status(error.code || 400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }


    }

    async findBand(req: Request, res: Response) {
        try {

            const inputFindBand = (req.query.id ?? req.query.name) as string;

            const band = await BandBusiness.getBandByIdName(inputFindBand);

            res.status(200).send(band);
        } catch (error) {
            res.status(error.code || 400).send({ error: error.message });
        } finally {
            await BaseDatabase.destroyConnection();
        }
    }


}
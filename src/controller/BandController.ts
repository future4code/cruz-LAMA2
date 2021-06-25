import { Request, Response } from "express";
import { LoginInputDTO, BandInputDTO, InputFindBand } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";
import { BandBusiness } from "../business/BandBussines";


export class BandController {
    async createband(req: Request, res: Response) {
        try {

            const input: BandInputDTO = {
                token: req.headers.authorization as string,
                music_genre: req.body.music_genre,
                name: req.body.name,
                responsible: req.body.responsible
            }

            const bandBusiness = new BandBusiness();
            const messageBand = await bandBusiness.createband(input);

            res.status(200).send({ message: "Band create sucesseful!", "band": messageBand });

        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

    async findBand(req: Request, res: Response) {
        try {

            const inputFindBand: InputFindBand = {
                id: req.query.id as string,
                // name: req.query.name as string

            };

            const bandBusiness = new BandBusiness();
            const band = await bandBusiness.getBandByIdName(inputFindBand);

            res.status(200).send({ band });
        } catch (error) {
            res.status(400).send({ error: error.message });
        }

        await BaseDatabase.destroyConnection();
    }

}
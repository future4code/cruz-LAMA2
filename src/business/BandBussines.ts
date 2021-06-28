import {  BandInputDTO, UserRole, InputFindBand } from "../model/User";
import { IdGenerator } from "../services/IdGenerator";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";
import { Band } from "../model/Band";
import { FieldsNotFound} from "../error/FieldsNotFound";
import { AdminError } from "../error/AdminError";


class BandBusiness {

    constructor(
        private idGenerator: IdGenerator,
        private bandDatabase: BandDatabase
    ) { }

    async createband(band: BandInputDTO) {

        if (!band.token || !band.name || !band.music_genre || !band.responsible) {
            throw new FieldsNotFound()
        }

        const getToken = new Authenticator();
        const resultToken = getToken.getData(band.token);

        if (!resultToken) {
            throw new Error()
        }

        if (resultToken.role !== UserRole.ADMIN) {
            throw new AdminError()
        }


        const id = this.idGenerator.generate();

        const bandCreateSucess = await this.bandDatabase.createBandDB(
            id,
            band.name,
            band.music_genre,
            band.responsible
        );

        return bandCreateSucess;
    }

    async getBandByIdName(band: string):Promise<Band> {

        if (!band) {
            throw new FieldsNotFound()
        }

        const bandBD = await this.bandDatabase.getBand(band);

        if (!bandBD) {
            throw new Error("Band not found!")
        }

        return bandBD;
    }
}
export default new BandBusiness(new IdGenerator,new BandDatabase) 
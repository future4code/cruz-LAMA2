import { LoginInputDTO, BandInputDTO, UserRole, InputFindBand } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { BandDatabase } from "../data/BandDatabase";


export class BandBusiness {

    async createband(band: BandInputDTO) {

        if (!band.token || !band.name || !band.music_genre || !band.responsible) {
            throw new Error(" Missing fields to complet")
        }

        const getToken = new Authenticator();
        const resultToken = getToken.getData(band.token);

        if(!resultToken){
            throw new Error()
        }

        if(resultToken.role !== UserRole.ADMIN){
            throw new Error("Just 'ADMIN' can use this endpoint")
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const bandDatabase = new BandDatabase();
        const bandCreateSucess = await bandDatabase.createBandDB(id, band.name, band.music_genre, band.responsible);

        return bandCreateSucess;
    }

    async getBandByIdName(band: InputFindBand) {

        if (!band.id) {
            throw new Error(" Missing fields to complet")
        }

        const bandDatabase = new BandDatabase();
        const bandBD = await bandDatabase.getBand(band.id);

        if(!bandBD){
            throw new Error("Band not found!")
        }

        return bandBD;
    }
}
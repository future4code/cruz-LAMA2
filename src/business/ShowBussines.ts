import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";
import { AdminError } from "../error/AdminError";
import { FieldsNotFound } from "../error/FieldsNotFound";
import { Show, showInputDTO } from "../model/Show";
import { UserRole } from "../model/User";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

class ShowBussines {

    constructor(
        private showDataBase: ShowDatabase,
        private bandDataBase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }


    async createShow(input: showInputDTO, token: string) {

        const tokenData = this.authenticator.getData(token);

        if (tokenData.role !== UserRole.ADMIN) {
            throw new AdminError()
        }

        if (!input.weekDay || !input.startTime || !input.endTime || !input.bandId) {
            throw new FieldsNotFound()
        }

        if (input.startTime < 8 || input.endTime > 23 || input.startTime >= input.endTime) {
            throw new Error("Invalid time to createShow")
        }

        if (!Number.isInteger(input.startTime) || !Number.isInteger(input.endTime)) {
            throw new Error("time should be INTEGER to createShow")
        }

        // verificando se a banda ja existe
        await this.bandDataBase.getBand(input.bandId);

        const registerShows = await this.showDataBase.getShowByDay(input.weekDay);

        if (!registerShows.length) {
            throw new Error("No more shows can be registered at this day")
        }

        await this.showDataBase.createShow(Show.toShowModel({
            ...input,
            id: this.idGenerator.generate()
        }))

    }

    async getAllShow(token: string,weekDay:string) {
        const tokenData = this.authenticator.getData(token);

        if (tokenData.role !== UserRole.ADMIN) {
            throw new AdminError()
        }

        return this.showDataBase.getShowByDay(weekDay);
    }
}
export default new ShowBussines(
    new ShowDatabase,
    new BandDatabase,
    new IdGenerator,
    new Authenticator
)
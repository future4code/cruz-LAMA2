import { Show, showOutputDTO, WeekDay } from "../model/Show";
import { BaseDatabase } from "./BaseDatabase";

export class ShowDatabase extends BaseDatabase {

    private static TABLE_NAME = "NOME_TABELA_SHOWS";

    public async createShow(show: Show): Promise<void> {
        try {
            await this.getConnection()
                .insert({
                    id: show.getId(),
                    week_day: show.getWeekDay(),
                    start_time: show.getStartTime(),
                    end_time: show.getEndTime(),
                    band_id: show.getBandId(),
                })
                .into(ShowDatabase.TABLE_NAME)
        } catch (error) {
            throw new Error(error.sqlMessage || error.message);
        }
    }

    public async getShowByDay(
        weekDay:string
    ): Promise<showOutputDTO[]> {
        const shows = await this.getConnection()
        .select("*")
        .from(ShowDatabase.TABLE_NAME)
        .where({week_day:weekDay})
        .orderBy('start_time','asc')
        
        return shows.map((show:any)=>{
            return{
                id:show.id,
                startTime:show.start_time,
                endTime:show.end_time ,
                weekDay:show.week_day,
                bandId:show.band_id,
            }
        })
    }



}

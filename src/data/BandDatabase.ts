import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "NOME_TABELA_BANDAS";

  public async createBandDB(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getBand(id: string,name?:string): Promise<User> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({ id:id });

    return result[0];
  }

}

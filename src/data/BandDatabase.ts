import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";
import { Band } from "../model/Band";

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

  public async getBand(input:string): Promise<Band> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({ id:input})
      .orWhere({name:input});

      if (!result[0]) {
        throw new Error(` Couldn't find band with this '${input}' `)
    }

    return result[0];
  }

}

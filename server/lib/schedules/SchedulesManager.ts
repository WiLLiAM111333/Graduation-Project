import { db } from '../../db/db';
import { ISchedule } from './ISchedule';
import { TableNames } from '../../enums/TableNames';

export class SchedulesManager {
  public async has(sign: string): Promise<boolean> {
    return !!(await this.getBySign(sign))
  }

  public async getAll(selectQuery: '*' | keyof Omit<ISchedule, 'path'> | Array<keyof Omit<ISchedule, 'path'>> = '*'): Promise<Array<ISchedule>> {
    const query = db.table(TableNames.SCHEDULES);

    if(Array.isArray(selectQuery)) {
      return await query.select(...selectQuery);
    } else {
      return await query.select(selectQuery);
    }
  }

  public async getBySign(sign: string): Promise<ISchedule> {
    return (await db.table(TableNames.SCHEDULES)
      .select('*')
      .where({ sign }))[0];
  }

  public async update(sign: string, data: Optional<ISchedule>): Promise<void> {
    await db.table(TableNames.SCHEDULES)
      .update({ ...data })
      .where({ sign });
  }

  public async create(data: ISchedule): Promise<void> {
    await db.table(TableNames.SCHEDULES)
      .insert(data)
      .where({ sign: data.sign });
  }

  public async delete(sign: string): Promise<void> {
    await db.table(TableNames.SCHEDULES)
      .del()
      .where({ sign })
  }
}

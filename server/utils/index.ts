import { readdir } from 'fs/promises';
import { BASE_SCHEDULES_PATH } from './constants';

export class Util {
  private static _savedSigns: Array<string>;

  private constructor() {};

  public static async convertNameToSign(name: string, offset: number = 0): Promise<string> {
    const signs = await this._getSavedSigns();
    const splitName = name.split(' ');

    const first = splitName[splitName.length - 2];
    const second = splitName[splitName.length - 1];

    const mappedSign = `${first[0]}${second[0]}${second[1 + offset]}`
      .toLowerCase()
      .replace(/ä|å/g, 'a')
      .replace(/ö/g, 'o');

    if(signs.includes(mappedSign)) {
      return this.convertNameToSign(name, ++offset);
    } else {
      this._savedSigns = null;
      return mappedSign;
    }
  }

  private static async _getSavedSigns(): Promise<Array<string>> {
    if(this._savedSigns) {
      return this._savedSigns;
    }

    const signs = (await readdir(BASE_SCHEDULES_PATH))
      .map(sign => sign.replace(/\.(.+)/, ''));

    this._savedSigns = signs;

    return this._savedSigns;
  }
}

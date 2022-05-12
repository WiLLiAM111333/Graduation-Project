import fetch from 'node-fetch';
import { Controller } from '../lib/controller/Controller';
import { IProvinceResponse } from '../responses/skolmaten/IProvinceResponse';
import { IDistrictResponse } from '../responses/skolmaten/IDistrictResponse';
import { ISkolmatenProvince } from '../types/ISkolmatenProvince';
import { ISkolmatenDistrict } from '../types/ISkolmatenDistrict';
import { ISkolmatenSchool } from '../types/ISkolmatenSchool';
import { ISchoolResponse } from '../responses/skolmaten/ISchoolResponse';
import { IMenuResponse } from '../responses/skolmaten/IMenuResponse';
import { ControllerRouteFunction } from '../lib/controller/ControllerRouteFunction';

export class SkolmatenController extends Controller {
  private _baseURL: string;
  private _defaultHeaders: { [key: string]: string };

  public constructor() {
    super('/skolmaten');

    this._baseURL = 'https://skolmaten.se/api/3';

    this._defaultHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Client': process.env.SKOLMATEN_API_TOKEN,
      'ClientVersion': process.env.SKOLMATEN_CLIENT_VERSION
    }

    this.methods = [{
      path: '/menu',
      handler: this._getMenuRequest(),
      method: 'GET',
      cache: { 
        enabled: true, 
        duration: parseInt(process.env.SKOLMATEN_CACHE_DURATION) || 600000
      }
    }]
  }

  private async _getProvinces(): Promise<Array<ISkolmatenProvince>> {
    const res = await fetch(`${this._baseURL}/provinces`, { headers: this._defaultHeaders });
    const json = await res.json<IProvinceResponse>();

    return json.provinces;
  }

  private async _getStockholmProvinceID(): Promise<number> {
    const provinces = await this._getProvinces();

    for(const province of provinces) {
      if(province.name === 'Stockholms län') {
        return province.id;
      }
    }
  }

  private async _getDistricts(province: number): Promise<Array<ISkolmatenDistrict>> {
    const queryStr = this.buildURLQueries({ province });

    const res = await fetch(`${this._baseURL}/districts${queryStr}`, { headers: this._defaultHeaders });
    const json = await res.json<IDistrictResponse>();

    return json.districts;
  }

  private async _getStockholmDistrict(): Promise<number> {
    const province = await this._getStockholmProvinceID();
    const districts = await this._getDistricts(province);

    for(const district of districts) {
      if(district.name === 'Stockholms stad') {
        return district.id;
      }
    }
  }

  private async _getSchools(district: number): Promise<Array<ISkolmatenSchool>> {
    const queryStr = this.buildURLQueries({ district });

    const res = await fetch(`${this._baseURL}/schools${queryStr}`, { headers: this._defaultHeaders });
    const json = await res.json<ISchoolResponse>();

    return json.schools;
  }

  private async _getTHGID(): Promise<number> {
    const district = await this._getStockholmDistrict();
    const schools = await this._getSchools(district);

    for(const school of schools) {
      if(school.name === 'Campus Konradsberg') {
        return school.id;
      }
    }
  }

  private async _getMenu(): Promise<IMenuResponse> {
    const school: number = await this._getTHGID();

    const year = new Date().getFullYear();

    const queryStr = this.buildURLQueries({
      school,
      year,
      offset: -2,
      limit: 6
    });

    const res = await fetch(`${this._baseURL}/menu${queryStr}`, { headers: this._defaultHeaders });
    const json = await res.json<IMenuResponse>();

    return json;
  }

  private _getMenuRequest(): ControllerRouteFunction {
    return async (req, res) => {
      try {
        const menu = await this._getMenu();

        res.status(200).json(menu);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }
}

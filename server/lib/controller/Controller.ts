import { Application, Router } from 'express';
import { ControllerMiddlewareFunction } from './ControllerMiddlewareFunction';
import { IControllerMethod } from './IControllerMethod';
import { ResponseCache } from '../responseCache/ResponseCache';

export abstract class Controller {
  private _cache: ResponseCache;
  private _basePath: string;
  private _router: Router;
  protected methods: Array<IControllerMethod>;

  public constructor(basePath: string) {
    this._cache = new ResponseCache();
    this._router = Router();
    this._basePath = basePath;
  }

  protected buildURLQueries(obj: { [key: string]: string | number }): string {
    let first = true;
    let str = '';

    for(const key in obj) {
      const value = obj[key];

      if(first) {
        str += `?${key}=${value}`;
        first = false;
      } else {
        str += `&${key}=${value}`;
      }
    }

    return str;
  }

  private _mountMethod(rawMethod: IControllerMethod): void {
    const { cache, handler, method, path } = rawMethod;

    if(cache?.enabled) {
      this._router[method.toLowerCase()](path, this._resCache(cache.duration), handler);
    } else {
      this._router[method.toLowerCase()](path, handler);
    }
  }

  private _resCache(duration?: number): ControllerMiddlewareFunction {
    return (req, res, next) => {
      if(req.method !== 'GET') {
        return next();
      }
      
      if(!duration && duration !== 0) {
        duration = 30 * 60000; // 30 min
      }

      const endpoint = req.url;
      const hasCachedRes = this._cache.has(endpoint);

      if(hasCachedRes) {
        const cachedRes = this._cache.get(endpoint);
        const timeDiff = (cachedRes.date + duration) - Date.now(); 

        if(timeDiff < 0) {
          this._cache.delete(endpoint);
        }

        res.json(cachedRes.body);
      } else {
        const oldJSON = res.json;

        res.json = body => {
          this._cache.set(endpoint, body);
          return oldJSON.call(res, body);
        }

        next();
      }
    }
  }

  public mount(app: Application): void {
    if(this.methods) {
      for(const method of this.methods) {
        this._mountMethod(method);
      }
    }

    app.use(this._basePath, this._router);
  }
}

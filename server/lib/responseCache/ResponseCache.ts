import { ICachedResponse } from "./ICachedResponse";

// Super simpel cache
export class ResponseCache {
  private _cache: Map<string, ICachedResponse>;

  public constructor() {
    this._cache = new Map();
  }

  public has(endpoint: string): boolean {
    return this._cache.has(endpoint);
  }

  public get(endpoint: string): ICachedResponse {
    return this._cache.get(endpoint);
  }

  public set(endpoint: string, body: unknown): void {
    this._cache.set(endpoint, { date: Date.now(), body });
  }

  public update(endpoint: string, body: unknown): void {
    const { date } = this._cache.get(endpoint);

    this._cache.set(endpoint, { date: date, body });
  }

  public delete(endpoint: string): void {
    this._cache.delete(endpoint);
  }
}

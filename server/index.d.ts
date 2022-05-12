import 'node-fetch';

declare module 'node-fetch' {
  interface Response {
    json<T = unknown>(): Promise<T>;
  }
}

export interface IApiClient {
    post(urls: string, body: any | string, requestHeaders: any): Promise<any>;
    get(url: string): Promise<any>;
  }
  
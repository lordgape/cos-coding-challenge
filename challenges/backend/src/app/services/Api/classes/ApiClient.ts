import { inject, injectable } from "inversify";
import { IApiClient } from "../interface/IApiClient";
import axios from "axios";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../Logger/interface/ILogger";

// Neat way to convert callback to promise object
// const PostRemote = promisify(request.post);
// const GetRemote = promisify(request.get);

@injectable()
export class ApiClient implements IApiClient {
  constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger) {}

  async post(
    url: string,
    body: any | string,
    requestHeaders: any = {}
  ): Promise<any> {
    try {
      await this.initAuth();

      let { status, headers, data } = await axios.post(
        url,
        body,
        requestHeaders
      );

      this.logger.log(
        `POST: STATUS ${status} - HEADERS ${JSON.stringify(
          headers
        )} - DATA ${JSON.stringify(data)}`
      );

      return data;
    } catch (error) {
      this.processError(`GET: ${url}`, error);
    }
  }
  async get(url: string): Promise<any> {
    try {
      await this.initAuth();

      let { status, headers, data } = await axios.get(url);

      this.logger.log(
        ` STATUS ${status} - HEADERS ${JSON.stringify(
          headers
        )} - DATA ${JSON.stringify(data)}`
      );

      return data;
    } catch (error) {
      this.processError(`GET: ${url}`, error);
    }
  }

  private processError(requestType: string, error: any) {
    if (error.response) {
      let { status, data } = error.response;

      // Token has expire or is bad. Let remove from cache.
      if (status === 401) {
        delete axios.defaults.headers.common.authToken;
        delete axios.defaults.headers.common.userid;
      }

      this.logger.log(
        `${requestType} - STATUS ${status}  - ${JSON.stringify(data)} - ${
          error.message
        } `
      );

      throw new Error(error.message || "");
    }

    this.logger.log(
      `${requestType}  - ${error.code} - ${error.message} - ${JSON.stringify(
        error
      )} `
    );

    throw new Error(error.message);
  }

  private async initAuth() {
    if (
      !axios.defaults.headers.common.authToken ||
      !axios.defaults.headers.common.userid
    ) {
      await this.fetchTokenAndCached();
    }
  }

  private async fetchTokenAndCached() {
    try {
      const url = `${process.env.baseURL}/v1/authentication/${process.env.email}`;
      const { status, data } = await axios.put(url, {
        password: `${process.env.password}`,
      });

      this.logger.log(` STATUS ${status} - Saving Token for future request...`);

      axios.defaults.headers.common.authToken = data.token;
      axios.defaults.headers.common.userid = data.userId;
    } catch (error) {
      throw error
    }
  }
}

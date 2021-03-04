import axios from 'axios';
import HttpResponse from '../../interfaces/response';
import HttpException from '../../utils/http_exception';
import { logger } from "../../utils/logger";

export default class httpClient {
  protected instance: any;

  constructor(baseUrl: string, headers: any) {
    this.instance = axios.create({
      baseURL: baseUrl,
      headers: headers,
      responseType: 'json',
    });
  }

  public responseError(error: any): void {
    // console.info('** responseError ', error.response.data);
    logger.error(`Exception : ${(error.message || 'Oops! Something went wrong')}`);
    throw new HttpException(error.response.status, (error.response.data.message || error.message || 'Oops! Something went wrong'));
  }

  public responseSuccess(response: any): HttpResponse {
    return {
      status: response.status || 200,
      message: response.data.message || 'Successful!',
      data: response.data.data || []
    };
  }

  public async get(path: string): Promise<HttpResponse> {
    try {
      const response = await this.instance.get(path);
      return this.responseSuccess(response);
    } catch (error) {
      this.responseError(error);
    }
  }

  public async post(path: string, data: any): Promise<HttpResponse> {
    try {
      const response = await this.instance.post(path, data);
      return this.responseSuccess(response);
    } catch (error) {
      this.responseError(error);
    }
  }
}

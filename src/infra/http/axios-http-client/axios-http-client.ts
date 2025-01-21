import {
  HttpPostParams,
  HttpResponse,
  IHttpPostClient,
} from "@/data/protocols/http";
import axios, { AxiosResponse } from "axios";

export class AxiosHttpClient<R> implements IHttpPostClient<any, R> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<R>> {
    let httpResponse: AxiosResponse<any>;
    try {
      httpResponse = await axios.post(params.url, params.body);
    } catch (error) {
      httpResponse = error.response;
    }
    return {
      statusCode: httpResponse.status,
      body: httpResponse.data,
    };
  }
}

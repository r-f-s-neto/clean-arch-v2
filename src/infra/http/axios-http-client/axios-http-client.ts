import {
  HttpPostParams,
  HttpResponse,
  IHttpPostClient,
} from "@/data/protocols/http";
import axios from "axios";

export class AxiosHttpClient<R> implements IHttpPostClient<any, R> {
  async post(params: HttpPostParams<any>): Promise<HttpResponse<R>> {
    const { data, status } = await axios.post(params.url, params.body);
    return {
      statusCode: status,
      body: data,
    };
  }
}

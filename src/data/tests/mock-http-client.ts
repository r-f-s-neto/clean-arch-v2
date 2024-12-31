import {
  HttpPostParams,
  IHttpPostClient,
  HttpResponse,
  HttpStatusCode,
} from "../protocols/http";

export class HttpPostClientSpy<P, R> implements IHttpPostClient<P, R> {
  url?: string;
  body?: P;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams<P>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

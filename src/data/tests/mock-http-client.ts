import { AuthenticationParams } from "@/domain/usecases/authentication";
import {
  HttpPostParams,
  IHttpPostClient,
} from "../protocols/http/http-post-client";
import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";

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

import { IHttpPostClient } from "@/data/protocols/http/http-post-client";
import {
  HttpResponse,
  HttpStatusCode,
} from "@/data/protocols/http/http-response";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { UnespectedError } from "@/domain/errors/unespected-error";
import { AccountModel } from "@/domain/models/account-model";
import { AuthenticationParams } from "@/domain/usecases/authentication";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<void> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return Promise.resolve();
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnespectedError();
    }
  }
}

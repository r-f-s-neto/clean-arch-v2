import { IHttpPostClient, HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnespectedError } from "@/domain/errors";
import { AuthenticationParams, IAuthentication } from "@/domain/usecases";
import { AccountModel } from "@/domain/models";

export class RemoteAuthentication implements IAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<
      AuthenticationParams,
      AccountModel
    >
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });

    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return Promise.resolve(response.body);
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnespectedError();
    }
  }
}

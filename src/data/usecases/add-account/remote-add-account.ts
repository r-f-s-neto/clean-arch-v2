import { HttpStatusCode, IHttpPostClient } from "@/data/protocols/http";
import { InvalidCredentialsError, UnespectedError } from "@/domain/errors";
import { AccountModel } from "@/domain/models";
import { IAddAccount, AddAccountParams } from "@/domain/usecases/add-account";

export class RemoteAddAccount implements IAddAccount {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient<
      AddAccountParams,
      AccountModel
    >
  ) {}
  async add(params: AddAccountParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError();
      default:
        throw new UnespectedError();
    }
  }
}

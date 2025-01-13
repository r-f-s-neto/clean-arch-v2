import { AccountModel } from "@/domain/models";
import { mockAccountModel } from "@/domain/tests";
import { AuthenticationParams, IAuthentication } from "@/domain/usecases";

export class AuthenticationSpy implements IAuthentication {
  account = mockAccountModel();
  params: AuthenticationParams;
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return Promise.resolve(this.account);
  }
}

import { AccountModel } from "@/domain/models";
import { AddAccountParams, IAddAccount } from "@/domain/usecases/add-account";

export class AddAccountSpy implements IAddAccount {
  async add(params: AddAccountParams): Promise<AccountModel> {
    return Promise.resolve({ accessToken: "" });
  }
}

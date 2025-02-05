import { ISetStorage } from "@/data/protocols/storage/set-storage";
import { ISaveAccessToken } from "@/domain/usecases/save-access-token";

export class LocalSaveAccessTokenSpy implements ISaveAccessToken {
  private readonly setStorage: ISetStorage;

  constructor(setStorage: ISetStorage) {
    this.setStorage = setStorage;
  }

  async save(accessToken: string): Promise<void> {
    return Promise.resolve();
  }
}

import { ISetStorage } from "@/data/protocols/storage/set-storage";
import { UnespectedError } from "@/domain/errors";
import { ISaveAccessToken } from "@/domain/usecases/save-access-token";

export class LocalSaveAccessToken implements ISaveAccessToken {
  private readonly key = "accessToken";
  private readonly setStorage: ISetStorage;

  constructor(setStorage: ISetStorage) {
    this.setStorage = setStorage;
  }
  async save(accessToken: string): Promise<void> {
    await this.setStorage.setItem(this.key, accessToken);
    return Promise.resolve();
  }
}

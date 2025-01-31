import { ISetStorage } from "../protocols/storage/set-storage";

export class SetStorageMock implements ISetStorage {
  key: string;
  value: string;

  setItem(key: string, value: any): Promise<void> {
    this.key = key;
    this.value = value;
    return Promise.resolve();
  }
}

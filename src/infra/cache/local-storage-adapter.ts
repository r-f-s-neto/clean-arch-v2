import { ISetStorage } from "@/data/protocols/storage/set-storage";

export class LocalStorageAdapter implements ISetStorage {
  async setItem(key: string, value: any): Promise<void> {
    localStorage.setItem(key, value);
    return Promise.resolve();
  }
}

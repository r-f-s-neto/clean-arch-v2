export interface ISetStorage {
  setItem(key: string, value: any): Promise<void>;
}

import "jest-localstorage-mock";
import { LocalStorageAdapter } from "./local-storage-adapter";
import faker from "faker";

const makeSut = () => {
  const sut = new LocalStorageAdapter();
  return { sut };
};

describe("", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("Should call localStorage with correct values", async () => {
    const { sut } = makeSut();
    const key = faker.database.column();
    const value = faker.random.word();
    await sut.setItem(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });
});

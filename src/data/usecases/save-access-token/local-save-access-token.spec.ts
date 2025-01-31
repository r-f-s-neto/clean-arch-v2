import { LocalSaveAccessToken } from "./local-save-access-token";
import faker from "faker";
import { SetStorageMock } from "@/data/tests/mock-set-storage";
import { UnespectedError } from "@/domain/errors";

type SutTypes = {
  sut: LocalSaveAccessToken;
  setStorageMock: SetStorageMock;
};

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);

  return { sut, setStorageMock };
};

describe("LocalSaveAccessToken", () => {
  test("Should call setStorage with correct value", async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe("accessToken");
    expect(setStorageMock.value).toBe(accessToken);
  });
  test("Should throw if SetStorage Throws", async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, "setItem").mockRejectedValueOnce(new Error());
    const accessToken = faker.random.uuid();
    const promise = sut.save(accessToken);
    await expect(promise).rejects.toThrow(new Error());
  });
});

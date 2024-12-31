import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import faker from "faker";

type SutTypes = {
  sut: AxiosHttpClient;
};

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();

  return { sut };
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AxiosHttpClient", () => {
  it("Should call axios with correct url", async () => {
    const { sut } = makeSut();
    const url = faker.internet.url();
    await sut.post({ url });
    expect(mockedAxios).toHaveBeenCalledWith(url);
  });
});

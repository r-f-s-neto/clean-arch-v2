import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import faker from "faker";
import { HttpPostParams } from "@/data/protocols/http";
import { url } from "inspector";

type SutTypes = {
  sut: AxiosHttpClient<any>;
};

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosResult = {
  data: faker.random.objectElement(),
  status: faker.random.number(),
};
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient<any>();

  return { sut };
};

const mockPostRequest = (): HttpPostParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});

describe("AxiosHttpClient", () => {
  it("Should call axios with correct values", async () => {
    const { sut } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
  it("Should return correct statusCode and body", async () => {
    const { sut } = makeSut();
    const request = mockPostRequest();
    const httpResponse = await sut.post(request);
    expect(httpResponse).toEqual({
      statusCode: mockedAxiosResult.status,
      body: mockedAxiosResult.data,
    });
  });
});

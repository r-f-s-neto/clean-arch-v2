import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import faker from "faker";
import { HttpPostParams } from "@/data/protocols/http";
import { url } from "inspector";
import { mockAxios, mockHttpResponse } from "@/infra/tests";
import { mockPostRequest } from "@/data/tests";

type SutTypes = {
  sut: AxiosHttpClient<any>;
  mockedAxios: jest.Mocked<typeof axios>;
};

jest.mock("axios");
const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient<any>();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
};

describe("AxiosHttpClient", () => {
  it("Should call axios with correct values", async () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockPostRequest();
    await sut.post(request);
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
  });
  it("Should return correct statusCode and body", () => {
    const { sut, mockedAxios } = makeSut();
    const request = mockPostRequest();
    const promise = sut.post(request);
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
  it("Should return error ", async () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>;
    mockedAxios.post.mockRejectedValueOnce({
      response: mockHttpResponse(),
    });
    const { sut } = makeSut();
    const request = mockPostRequest();
    const promise = sut.post(request);
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
  });
});

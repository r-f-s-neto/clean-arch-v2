import { HttpStatusCode } from "@/data/protocols/http/http-response";
import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/tests/mock-http-client";
import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { mockAuthentication } from "@/domain/tests/mock-authentication";
import faker from "faker";

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy;
  sut: RemoteAuthentication;
};

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);

  return { sut, httpPostClientSpy };
};

describe("RemoteAuthentication", () => {
  it("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthentication());

    expect(httpPostClientSpy.url).toBe(url);
  });

  it("Should call HttpPostClient with correct body", async () => {
    const authenticationParams = mockAuthentication();
    const { sut, httpPostClientSpy } = makeSut(faker.internet.url());
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it("Shoul throw InvalidCredentialsError if HttpPostClient returns 401", async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
});

import { RemoteAuthentication } from "./remote-authentication";
import { HttpPostClientSpy } from "@/data/tests/mock-http-client";
import { mockAuthentication } from "@/domain/tests/mock-authentication";
import faker from "faker";

type SutTypes = {
  httpPostClientSpy: HttpPostClientSpy;
  sut: RemoteAuthentication;
};

const makeSut = (
  url: string = faker.internet.url(),
  email: string = faker.internet.email(),
  password: string = faker.internet.password()
): SutTypes => {
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
    const { sut, httpPostClientSpy } = makeSut(
      faker.internet.url(),
      authenticationParams.email,
      authenticationParams.password
    );
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });
});

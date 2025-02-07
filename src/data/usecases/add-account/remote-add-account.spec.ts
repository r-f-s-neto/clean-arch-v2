import { HttpPostClientSpy } from "@/data/tests";
import { RemoteAddAccount } from "./remote-add-account";
import { AccountModel } from "@/domain/models";
import { AddAccountParams } from "@/domain/usecases/add-account";
import faker from "faker";
import { HttpStatusCode } from "@/data/protocols/http";
import { InvalidCredentialsError, UnespectedError } from "@/domain/errors";

type SutParams = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
};

const makeSut = (url: string = faker.internet.url()): SutParams => {
  const httpPostClientSpy = new HttpPostClientSpy<
    AddAccountParams,
    AccountModel
  >();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe("RemoteAddAccount", () => {
  test("Should call HttpPostClient with correct URL", async () => {
    const url = faker.internet.url();
    const password = faker.internet.password();
    const params = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    };
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(params);
    expect(httpPostClientSpy.url).toBe(url);
  });
  test("Should call HttpPostClient with correct body", async () => {
    const url = faker.internet.url();
    const password = faker.internet.password();
    const params = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    };
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(params);
    expect(httpPostClientSpy.body).toEqual(params);
  });
  test("Shoul throw InvalidCredentialsError if HttpPostClient returns 401", () => {
    const url = faker.internet.url();
    const password = faker.internet.password();
    const params = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    };
    const { sut, httpPostClientSpy } = makeSut(url);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.add(params);
    expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });
  test("Should throw UnespectedError in HttpPostClient returns 400", () => {
    const url = faker.internet.url();
    const password = faker.internet.password();
    const params = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    };
    const { sut, httpPostClientSpy } = makeSut(url);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.add(params);
    expect(promise).rejects.toThrow(new UnespectedError());
  });
  test("Should throw UnespectedError in HttpPostClient returns 404", () => {
    const url = faker.internet.url();
    const password = faker.internet.password();
    const params = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    };
    const { sut, httpPostClientSpy } = makeSut(url);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.add(params);
    expect(promise).rejects.toThrow(new UnespectedError());
  });
  test("Should throw UnespectedError in HttpPostClient returns 500", () => {
    const url = faker.internet.url();
    const password = faker.internet.password();
    const params = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    };
    const { sut, httpPostClientSpy } = makeSut(url);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.add(params);
    expect(promise).rejects.toThrow(new UnespectedError());
  });
  test("Should return a AccountModel if HttpPostClient returns 200", async () => {
    const url = faker.internet.url();
    const password = faker.internet.password();
    const accessToken = faker.internet.protocol();
    const params = {
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password,
    };
    const { sut, httpPostClientSpy } = makeSut(url);
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: {
        accessToken,
      },
    };
    const response = await sut.add(params);
    expect(response).toEqual({ accessToken });
  });
});

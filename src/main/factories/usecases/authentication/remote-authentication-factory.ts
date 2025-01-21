import { HttpPostParams, IHttpPostClient } from "@/data/protocols/http";
import { RemoteAuthentication } from "@/data/usecases/authentication/remote-authentication";
import { AccountModel } from "@/domain/models";
import { AuthenticationParams } from "@/domain/usecases";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";
import { makeApiUrl } from "../../http/api-url-factory";

export const makeRemoteAuthentication = (): RemoteAuthentication => {
  return new RemoteAuthentication(makeApiUrl(), makeAxiosHttpClient());
};

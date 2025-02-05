import { LocalSaveAccessToken } from "@/data/usecases/save-access-token/local-save-access-token";
import { makeLocalStorageAdapter } from "./local-storage-adapter-factory";

export const makeLocalSaveAcessToken = (): LocalSaveAccessToken => {
  return new LocalSaveAccessToken(makeLocalStorageAdapter());
};

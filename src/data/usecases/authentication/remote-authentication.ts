import { IHttpPostClient } from "@/data/protocols/http/http-post-client";

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: IHttpPostClient
  ) {}

  async auth(): Promise<void> {
    this.httpPostClient.post({ url: this.url });
    return Promise.resolve();
  }
}

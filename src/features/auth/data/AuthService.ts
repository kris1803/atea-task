import { fakeLoginApiCall } from "../../../lib/fakeApi";
import type { LoginPayload, LoginResponse } from "../types";

export class AuthService {
  private authServerUrl: string;

  constructor(authServerUrl: string) {
    this.authServerUrl = authServerUrl;
  }

  async login(loginPayload: LoginPayload): Promise<LoginResponse["user"]> {
    // would check http status first, if not 200 then throw error
    const response = await fakeLoginApiCall(
      this.authServerUrl + "/login",
      loginPayload,
    );
    // could create a mapper, sanitizer of response which throws error if any issue with response
    return response.user;
  }

  async logout() {}
}

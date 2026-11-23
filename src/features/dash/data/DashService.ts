import type { Subscription } from "../types";

export class DashService {
  async fetchSubscriptions(): Promise<Subscription[]> {
    // this is dirty type
    const fakeData = (await import("./mockData.json"))
      .default as Subscription[];

    return new Promise((resolve) => {
      setTimeout(() => resolve(fakeData), 1500);
    });
  }
}

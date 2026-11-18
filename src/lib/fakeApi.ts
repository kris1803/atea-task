import type { LoginPayload, LoginResponse } from "../features/auth/types";

const allowedUsers = [
  ["tester", "password"],
  ["qwerty", "123456"],
];

/** fake API with hardcoded users */
export const fakeLoginApiCall = (_url: string, payload: LoginPayload) =>
  new Promise<LoginResponse>((resolve, reject) => {
    setTimeout(() => {
      const foundUser = allowedUsers.find((user: string[]) => {
        return user[0] === payload.username && user[1] === payload.password;
      });
      if (foundUser) {
        resolve({
          user: {
            username: "JohnDoe",
          },
        });
      } else {
        reject("User not found.");
      }
    }, 500);
  });

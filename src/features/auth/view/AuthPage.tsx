import React from "react";
import { useAuthPage } from "./useAuthPage";

const AuthPage = (): React.ReactElement => {
  const {
    pass,
    username,
    isPending,
    error,
    onChangePassword,
    onChangeUsername,
    onSubmit,
  } = useAuthPage();

  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="usernameInput">Username</label>
        <input
          id="usernameInput"
          defaultValue={username}
          onChange={onChangeUsername}
          type="text"
        />
        <label htmlFor="passwordInput">Password</label>
        <input
          defaultValue={pass}
          onChange={onChangePassword}
          id="passwordInput"
          type="password"
        />
        <button disabled={isPending} type="submit">
          {isPending ? "Signing in..." : "Sign in"}
        </button>
        {error ? <p>{error}</p> : null}
      </form>
    </>
  );
};

export { AuthPage };

import React, { startTransition, useEffect, type ChangeEvent } from "react";
import { useAuth } from "../data/AuthContext";
import { useNavigate } from "react-router";

export const useAuthPage = () => {
  const [username, setUsername] = React.useState("");
  const [pass, setPass] = React.useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [error, submitAction, isPending] = React.useActionState(async () => {
    try {
      await login({ username, password: pass });
      navigate("/dash");
      return null;
    } catch (error) {
      return error instanceof Error
        ? error.message
        : typeof error === "string"
          ? error
          : "Something went wrong. Please Try again.";
    }
  }, null);

  const onSubmit: React.SubmitEventHandler<HTMLFormElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    // add input value length validation if needed
    if (!isPending) startTransition(() => submitAction());
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPass(e.target.value);

  useEffect(() => {
    if (user) navigate("/dash", { replace: true });
  }, [user, navigate]);

  return {
    pass,
    username,
    error,
    isPending,
    onSubmit,
    onChangeUsername,
    onChangePassword,
  };
};

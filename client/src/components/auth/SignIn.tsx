import { useMutation } from "@apollo/client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { MutationSignIn, gqlSignIn } from "../../graphql/user";
import { authManager } from "../../lib/utils";
import { useNavigate } from "react-router-dom";

export function SignInForm() {
  const [signInMutation, { data, loading, error }] = useMutation<MutationSignIn>(gqlSignIn);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value!;
    const password = passwordRef.current?.value!;

    signInMutation({
      variables: {
        username: username,
        password: password,
      },
    });
  }

  useEffect(() => {
    if (loading) return;

    if (data) {
      authManager.setJWT(data.userSignIn);

      navigate('/profile');
    }

    if (error) {
      setErrorMsg(error.message);
    }
  }, [loading, data, error]);

  return (
    <>
      { errorMsg && <p>{errorMsg}</p> }
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input ref={usernameRef} name="username" />
        <br/>
        <label>Password</label>
        <input ref={passwordRef} type="password" name="password" />
        <br/>
        <input type="submit" value={"Login"} disabled={loading} />
      </form>
    </>
  );
}

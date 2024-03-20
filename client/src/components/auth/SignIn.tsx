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
    <div className="p-5 m-2">

      { errorMsg && <p>{errorMsg}</p> }
      <form onSubmit={handleLogin} className="max-w-sm mx-auto">
    <div className="mb-4">
        <label htmlFor="username" className="block">Username</label>
        <input
            ref={usernameRef}
            type="text"
            id="username"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
            />
    </div>
    <div className="mb-4">
        <label htmlFor="password" className="block">Password</label>
        <input
            ref={passwordRef}
            type="password"
            id="password"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
            />
    </div>
    <div>
        <input
            type="submit"
            value="Sign In"
            disabled={loading}
            className="w-full bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer focus:outline-none"
            />
    </div>
</form>
            </div>

    </>
  );
}

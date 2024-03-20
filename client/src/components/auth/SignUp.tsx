import { useMutation } from "@apollo/client";
import { MutationSignUp, gqlSignUp } from "../../graphql/user";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authManager } from "../../lib/utils";

export function SignUpForm() {
  const [signUpMutation, { data, loading, error }] =
    useMutation<MutationSignUp>(gqlSignUp);
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const username = usernameRef.current?.value!;
    const email = emailRef.current?.value!;
    const password = passwordRef.current?.value!;

    signUpMutation({
      variables: {
        username: username,
        email: email,
        password: password,
      },
    });
  };

  useEffect(() => {
    if (loading) return;
    if (data) {
      authManager.setJWT(data.userSignUp);
      navigate("/profile");
    }
    if (error) {
      setErrorMsg(error.message);
    }
  }, [loading, data, error]);

  return (
    <>
      <div className="p-5 m-2">
        {errorMsg && <p>{errorMsg}</p>}
        <form onSubmit={handleSignUp} className="max-w-sm mx-auto">
          <div className="mb-4">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              id="email"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block">
              Password
            </label>
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
              value="Sign Up"
              disabled={loading}
              className="w-full bg-gray-800 text-white py-2 px-4 rounded-md cursor-pointer focus:outline-none"
            />
          </div>
        </form>
      </div>
    </>
  );
}

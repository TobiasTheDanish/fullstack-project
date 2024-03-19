import { useQuery } from "@apollo/client";
import { CreateShirtForm } from ".";
import { QuerySignedInUser, gqlSignedInUser } from "../graphql/user";
import { useEffect, useState } from "react";
import { User } from "../graphql/types";
import { authManager } from "../lib/utils";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const { data, loading } = useQuery<QuerySignedInUser>(gqlSignedInUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setUser(data.signedInUser);
    }
  }, [loading]);

  if (loading) {
    return (
      <h1>Loading user data</h1>
    );
  }

  const handleSignOut = () => {
    authManager.clearJWT();
    navigate("/sign-in");
  };

  return (
    <>
      {user && (
        <div>
          <p><b>Username: </b> {user.username}</p>
          <p><b>Email: </b> {user.email}</p>
          <button onClick={handleSignOut}>Sign out</button>
        </div>
      )}
      <CreateShirtForm />
    </>
  );
}

import { useQuery } from "@apollo/client";
import { CreateShirtForm } from ".";
import { QuerySignedInUser, gqlSignedInUser } from "../graphql/user";
import { useEffect, useState } from "react";
import { User } from "../graphql/types";

export function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const { data, loading } = useQuery<QuerySignedInUser>(gqlSignedInUser);

  useEffect(() => {
    if (data) {
      setUser(data.signedInUser);
    }
  }, [loading]);

  if (loading) {
    return <h1>Loading user data</h1>;
  }

  return (
    <>
      <div className="flex justify-evenly m-2 p-2">
        {user && (
          <div className="border border-gray-800 h-fit p-5 text-left rounded-md">
            <h1 className="text-4xl font-bold text-center">Info</h1>
            <hr className="m-4" />
            <p>
              <b className="text-left">Username: </b> {user.username}
            </p>
            <p>
              <b>Email: </b> {user.email}
            </p>
            <p>
              <b>Bids placed: </b> {user.placedBids.length}
            </p>
            <p>
              <b>Listings: </b> {user.shirts.length}
            </p>
          </div>
        )}
        <div>
          <CreateShirtForm />
        </div>
      </div>
    </>
  );
}

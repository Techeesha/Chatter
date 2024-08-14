import React, { ReactElement } from "react";

// styles
import "./Aside.css";

// components and hooks
import Avatar from "./Avatar";
import { useDocument } from "../hooks/useDocument";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Aside(): ReactElement {
  const { user }: any = useAuthContext();
  const { error, document: currentUser } = useDocument("users", user?.uid);

  if (error) return <div className="error">{error}</div>;

  return (
    <aside>
      {currentUser && (
        <div className="wrapper">
          <div className="profile">
            <div className="banner">
              <Avatar src={currentUser?.photoURL} />
            </div>

            <div className="user-info">
              <h2>
                {currentUser?.firstName} {currentUser?.lastName}
              </h2>
              <p>Nigeria</p>

              <ul>
                <li>@{currentUser?.firstName?.toLowerCase()}</li>
                <span>.</span>
                <li>{currentUser?.email}</li>
                <span>.</span>
                {currentUser?.headline ? (
                  <li>{currentUser?.headline}</li>
                ) : (
                  <li>What do you do?</li>
                )}
              </ul>
            </div>
          </div>

          <ul className="interests">
            <h4>Interests</h4>
            {currentUser.interests.map((i: string) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}

import React, { useContext } from "react";
import AccountHeader from "./AccountHeader";
import AccountSidebar from "./AccountSidebar";
import { UserContext } from "../UserContext";

const MyAccount = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <>
      <AccountHeader />
      <div style={{ display: "flex", float: "left" }}>
        <AccountSidebar user={user} />
      </div>
      <main
        style={{
          position: "relative",
          padding: "24px",
          flexGrow: "1",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        <div>
          <h1
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Welcome {user}
          </h1>
        </div>
      </main>
    </>
  );
};

export default MyAccount;

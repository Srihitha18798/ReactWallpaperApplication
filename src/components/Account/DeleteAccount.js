import React, { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import AccountHeader from "./AccountHeader";

const DeleteAccount = () => {
  const { state } = useLocation();
  const { user } = state;
  console.log(user);

  const navigate = useNavigate();
  const { handleLogout } = useContext(UserContext);

  const errRef = useRef();

  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(user, pwd);

    const userData = JSON.parse(localStorage.getItem(user));

    if (userData) {
      // getItem can return actual value or null
      if (userData.password === pwd) {
        const confirmDelete = window.confirm(
          "Are you sure you want to delete your account?"
        );
        if (confirmDelete) {
          console.log(" You have Successfully Deleted" + user);
          localStorage.removeItem(user);
          handleLogout();
          navigate("/SignUp");
        } else {
          navigate("/MyAccount");
        }
      } else {
        console.log("Password is not matching with our record");
        setErrMsg("Password is not matching with our record");
      }
    } else {
      console.log("User not found");
      setErrMsg("User not found");
    }
    errRef.current.focus();
  };

  return (
    <>
      <AccountHeader />
      <div className="login">
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="password">Please enter your Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            ></input>

            <button>Delete Account</button>
          </form>
        </section>
      </div>
    </>
  );
};

export default DeleteAccount;

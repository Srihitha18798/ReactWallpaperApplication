import React, { useState, useEffect, useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import AccountHeader from "./AccountHeader";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContext } from "../UserContext";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const MyDetails = () => {
  const { handleLogin } = useContext(UserContext);

  const { state } = useLocation();
  const { user } = state;

  const defaultPassword = "**********";
  const [username, setUsername] = useState(user);
  const [password, setPassword] = useState(defaultPassword);
  const [validPwd, setValidPwd] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const errRef = useRef();
  const [errMsg, setErrMsg] = useState("");

  console.log(username);
  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPwd(result);
  }, [password]);

  useEffect(() => {
    if (localStorage.getItem(username) !== null && username !== user) {
      setErrMsg("Username already exists");
    } else {
      setErrMsg("");
    }
  }, [username, user]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    handleLogin(username);

    const userData = JSON.parse(localStorage.getItem(username));

    const updatedData = {
      username: username,
      password: password,
    };

    if (userData) {
      const profile = {
        userData,
        ...updatedData,
        images: userData.images,
      };

      /*userData.name = profile.username;
      userData.password = profile.password;
      userData.images = profile.images;
      const updatedObject = JSON.stringify(userData);
      localStorage.setItem(username, updatedObject);*/
      localStorage.setItem(
        username,
        JSON.stringify({
          name: profile.username,
          password: profile.password,
          images: profile.images,
        })
      );
    } else {
      localStorage.removeItem(user);
      localStorage.setItem(
        username,
        JSON.stringify({
          name: updatedData.username,
          password: updatedData.password,
          images: updatedData.images,
        })
      );
    }

    setIsEditing(false);
  };

  return (
    <>
      <AccountHeader />
      <div className="login">
        <section>
          {isEditing ? (
            <p
              style={{
                backgroundColor: "lightpink",
                color: "firebrick",
                fontWeight: "bold",
                padding: "0.5rem",
                marginBottom: "0.5rem",
              }}
              ref={errRef}
              className={errMsg ? "errMsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>
          ) : (
            ""
          )}
          <h1>My Details</h1>
          {isEditing ? (
            <>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username || ""}
                aria-describedby="uidnote"
                required
              ></input>
              <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span>
                <span className={validPwd || !password ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
              ></input>

              <p
                id="pwdnote"
                className={!validPwd ? "instructions" : "offscreen"}
              >
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character.
                <br />
                Allowed special characters:{" "}
                <span aria-label="exclamation mark">!</span>
                <span aria-label="at symbol">@</span>
                <span aria-label="hashtag">#</span>
                <span aria-label="dollar sign">$</span>
                <span aria-label="percent">%</span>
              </p>
            </>
          ) : (
            <>
              <div>
                <strong>Username:</strong>
                <span>{username}</span>
              </div>
              <div>
                <strong>Password:</strong>
                <span>{defaultPassword}</span>
              </div>
            </>
          )}

          {isEditing ? (
            <button disabled={errMsg !== "" || !validPwd} onClick={handleSave}>
              Save
            </button>
          ) : (
            <button onClick={handleEdit}>Edit</button>
          )}
        </section>
      </div>
    </>
  );
};

export default MyDetails;

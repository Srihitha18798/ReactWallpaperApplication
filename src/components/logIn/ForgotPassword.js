import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const ForgotPassword = (props) => {
  const errRef = useRef();

  const [updatedData, setUpdatedData] = useState([
    {
      username: "",
      password: "",
      images: [],
    },
  ]);
  const location = useLocation();

  const [user, setUser] = useState(location.state);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  console.log(user);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);

    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = JSON.parse(localStorage.getItem(user));
    setUpdatedData(
      (updatedData.username = user),
      (updatedData.password = pwd),
      (updatedData.images = userData.images)
    );

    if (userData) {
      const profile = {
        userData,
        ...updatedData,
      };

      localStorage.setItem(
        user,
        JSON.stringify({
          name: profile.username,
          password: profile.password,
          images: profile.images,
        })
      );

      setSuccess(true);
    } else {
      console.log("User not found");
      setErrMsg("User not found");
    }

    errRef.current.focus();
  };

  return (
    <>
      <div className="login">
        {success ? (
          <section>
            <h1>Password has been succesfully changed.</h1>
            <p>
              <Link to="/LogIn">Log In</Link>
            </p>
          </section>
        ) : (
          <section>
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
            <h1>Reset Password</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                onChange={(e) => setUser(e.target.value)}
                value={user ? user : ""}
                aria-describedby="uidnote"
                required
              ></input>

              <label htmlFor="password">
                Password:
                <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span>
              </label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby="pwdnote"
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              ></input>

              <p
                id="pwdnote"
                className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
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

              <label htmlFor="confirm_pwd">
                Cornfirm Password:
                <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                </span>
              </label>
              <input
                type="password"
                id="confirm_pwd"
                onChange={(e) => setMatchPwd(e.target.value)}
                value={matchPwd}
                required
                aria-invalid={validMatch ? "false" : "true"}
                aria-describedby="confirmnote"
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
              ></input>

              <p
                id="confirmnote"
                className={
                  matchFocus && !validMatch ? "instructions" : "offscreen"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle}></FontAwesomeIcon>
                Must match the first password input field.
              </p>
              <button
                disabled={
                  errMsg !== "" || !validPwd || !validMatch ? true : false
                }
              >
                Reset Password
              </button>
            </form>
            <p>
              <span className="line">
                <Link to="/LogIn">Log In</Link>
              </span>
            </p>
          </section>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;

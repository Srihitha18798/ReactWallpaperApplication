import React, { useContext } from "react";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
//import AuthContext from "../context/AuthProvider";
//import axios from "../api/axios";

//const LOGIN_URL='/auth';

const LogIn = () => {
  const { handleLogin } = useContext(UserContext);

  // const {setAuth}=useContext(AuthContext);

  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

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
        console.log(user + " You Are Successfully Logged In");
        setUser("");
        setPwd("");
        setSuccess(true);
        handleLogin(user);
      } else {
        console.log("Username or Password is not matching with our record");
        setErrMsg("Username or Password is not matching with our record");
      }
    } else {
      console.log("User not found");
      setErrMsg("User not found");
    }
    errRef.current.focus();

    /*try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }*/
  };

  return (
    <>
      <div className="login">
        {success ? (
          <section>{navigate("/Home")}</section>
        ) : (
          <section>
            <p
              ref={errRef}
              className={errMsg ? "errmsg" : "offscreen"}
              aria-live="assertive"
            >
              {errMsg}
            </p>

            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              ></input>

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              ></input>

              <button>Sign In</button>
            </form>
            <p>
              Need an account?
              <br />
              <span className="line">
                <Link to="/SignUp">Sign Up</Link>
                &emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                <Link to="/ForgotPassword" state={user}>
                  Forgot Password?
                </Link>
              </span>
            </p>
          </section>
        )}
      </div>
    </>
  );
};

export default LogIn;

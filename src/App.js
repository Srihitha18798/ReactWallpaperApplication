import React from "react";
import LogIn from "./components/logIn/LogIn";
import SignUp from "./components/signUp/SignUp";
import Home from "./components/wallPaper/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/logIn/ForgotPassword";
import MyAccount from "./components/Account/MyAccount";
import MyDetails from "./components/Account/MyDetails";
import DownloadedImages from "./components/Account/DownloadedImages";
import Signout from "./components/Account/Signout";
import DeleteAccount from "./components/Account/DeleteAccount";
import AccountSidebar from "./components/Account/AccountSidebar";
import Favorites from "./components/wallPaper/Favorites";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<LogIn />}></Route>
          <Route exact path="/signUp" element={<SignUp />}></Route>
          <Route exact path="/LogIn" element={<LogIn />}></Route>
          <Route exact path="/Home" element={<Home />}></Route>
          <Route
            exact
            path="/ForgotPassword"
            element={<ForgotPassword />}
          ></Route>

          <Route exact path="/MyAccount" element={<MyAccount />}></Route>
          <Route exact path="/MyDetails" element={<MyDetails />}></Route>

          <Route
            exact
            path="/AccountSidebar"
            element={<AccountSidebar />}
          ></Route>
          <Route
            exact
            path="/DownloadedImages"
            element={<DownloadedImages />}
          ></Route>
          <Route exact path="/Signout" element={<Signout />}></Route>
          <Route
            exact
            path="/DeleteAccount"
            element={<DeleteAccount />}
          ></Route>
          <Route exact path="/Favorites" element={<Favorites />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

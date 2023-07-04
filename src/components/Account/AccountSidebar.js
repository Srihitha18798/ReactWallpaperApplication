import React from "react";
import { useNavigate } from "react-router-dom";
import "../Account/Sidebar.css";
import { SidebarData } from "./SidebarData";

const AccountSidebar = ({user}) => {
  const navigate = useNavigate();

  return (
    <div className="Sidebar">
      <ul className="SidebarList">
        {SidebarData.map((data, key) => {
          return (
            <li
              key={key}
              id={window.location.pathname === data.link ? "active" : ""}
              className="row"
              onClick={() => {
                //window.location.pathname = data.link;
                navigate(data.link,{state:{user}})
              }}
            >
              <div id="icon">{data.icon}</div>
              <div id="title">{data.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AccountSidebar;

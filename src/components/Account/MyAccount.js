import React,{useContext} from "react";
import AccountHeader from "./AccountHeader";
import AccountSidebar from "./AccountSidebar";
import { UserContext } from '../UserContext'

const MyAccount = () => {
  const {user}=useContext(UserContext)
  console.log(user)
  return (
    <>
      <AccountHeader />
      <AccountSidebar  user={user}/>
    </>
  );
};

export default MyAccount;

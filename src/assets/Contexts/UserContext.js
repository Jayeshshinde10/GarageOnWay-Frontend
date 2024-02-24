import React from "react";
 const userData = React.createContext({
    isLoggedIn:null,
    username : null,
    user_id:null,
    handleLogin:()=>{},
    accessToken:'',
    refreshToken:'',
    handleLogout:()=>{},
})
export default userData;
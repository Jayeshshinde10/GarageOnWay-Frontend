import React from "react";
 const userData = React.createContext({
    isLoggedIn:null,
    username : null,
    user_id:null,
    handleLogin:()=>{},
    accessToken:'',
    refreshToken:'',
    isServiceProvider:null,
    handleLogout:()=>{},
    ServiceProviderdata:null,
    isloading:true,
    handleIsLoading:()=>{},
    handleCancledRequest:()=>{},
})
export default userData;
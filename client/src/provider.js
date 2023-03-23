//import React, {useState} from "react";
//import UserContext from "./context"
//import axios from "axios"
//import {useCookies} from "react-cookie";
//
//const Provider = props => {
//    const [cookies] = useCookies();
//    const [user, setUser] = useState({});
//
//    const headers = {
//        'Content-Type': 'application/json',
//        'token': cookies.token
//    }
//
//    const getUser = async () => {
//        const res = await axios.get("/profile", {
//            headers
//        })
//        // console.log(res)
//        setUser(res.data.user)
//    }
//
//    return (
//        <UserContext.Provider
//            value={{getUser, user, setUser}}>
//
//            {props.children}
//        </UserContext.Provider>
//    )
//}
//
//export default Provider;
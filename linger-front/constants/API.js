export  const    HOST_ADDRESS        =   "http://10.0.2.2:8080";
export  const    API_HOST_ADDRESS    =   `${HOST_ADDRESS}/api`;


// Api's prifixs
export  const    PUBLIC_PREFIX       =   "/public"

// Backend Endpoints
export const API_ENDPOINTS={
    register:"/signup",
    login:"/signin",
    checkIfTheUsernameExist:"/checkTheUsername",
    googleLognUrl:"/google",
    sendCode:"/sendCode",
    verifiyCode:"/verifiyCode",
    verifiyUserCode:"/verifiyUserCode"
}



// Clients Endpoints
export const CLIENT_ENDPOINTS={
    index:"index",
    auth:{
        login:"login",
        register:"register",
        dash:"(dash)",
        verify:"verify",
        codeSent:"codeSent"
    }

}
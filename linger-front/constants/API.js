export  const    HOST_ADDRESS        =   "http://10.0.2.2:8080";
export  const    API_HOST_ADDRESS    =   `${HOST_ADDRESS}/api`;
export  const    API_ADDRESS_STATIC  =    `${HOST_ADDRESS}/static`;


// Api's prifixs
export  const    PUBLIC_PREFIX       =   "/public";
export  const    IMAGE_PREFIX        =   "/images";
export  const    LOCALE_PREFIX       =   "/locale";

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
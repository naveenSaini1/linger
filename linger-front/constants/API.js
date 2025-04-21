export  const    HOST_ADDRESS        =   "http://10.0.2.2:8080";
// export  const    HOST_ADDRESS        =    "http://b598-2405-201-580a-70a7-545c-e9fa-7902-63c2.ngrok-free.app"
export  const    API_HOST_ADDRESS    =   `${HOST_ADDRESS}/api`;
export  const    API_ADDRESS_STATIC  =    `${HOST_ADDRESS}/static`;


// Api's prifixs
export  const    PUBLIC_PREFIX           =   "/public";
export  const    IMAGE_PREFIX            =   "/images";
export  const    LOCALE_PREFIX           =   "/locale";
export  const    FOLLOW_PREFIX           =   "/follow"
export  const    USER_PREFIX             =   "/user";
export  const    MESSAGE_PREFIX          =    "/message";
export  const    WEBSOCKET_PREFIX        =    "/ws";
export  const    CODE_PREFIX             =    "/code";
export  const    APP_PREFIX              =     "/topic"
export  const    QUESTION_ANSWER_PRIFIX  =    "/questionanswer"


// Backend Endpoints
export const API_ENDPOINTS={
    register:"/signup",
    login:"/signin",
    checkIfTheUsernameExist:"/checkTheUsername",
    googleLognUrl:"/google",
    sendCode:"/sendCode",
    verifiyCode:"/verifiyCode",
    verifiyUserCode:"/verifiyUserCode",
    followTo:"/followTo",
    unfollow:"/unfollow",
    getTheFollower:"/getTheFollower",
    getTheFollowing:"/getTheFollowing",
    getUserProfile:"/getUserProfile",
    getTheUserDetailsForMessage:"/getTheUserDetailsForMessage",
    sendMessage:"/sendMessage",
    getTheFriendsList:"/getTheFriendsList",
    toggleTheRequest:"/toggleTheRequest",
    establishConnection:"/establishConnection",
    createQuestion:"/createQuestion"
}



// Clients Endpoints
export const CLIENT_ENDPOINTS={
    index:"index",
    auth:{
        login:"login",
        register:"register",
        dash:"(dash)",
        verify:"verify",
        codeSent:"codeSent",
    },
    dashboard:{
        profile:"profile",
        message:{
            message:"message",
            sendmessagescreen:"sendmessagescreen",

        },
        sendmessagescreen:"sendmessagescreen"
    }

}
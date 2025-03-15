import CodeSendPage from "../components/page/CodeSendPage";
import UserContextApiProvider from "../contextApis/userContextApi";

const codeSent = () => {
 
    return (
        <>
         <UserContextApiProvider>
           <CodeSendPage/>
           </UserContextApiProvider>
        </>
    );
};



export default codeSent;
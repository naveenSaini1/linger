import VerifyPage from "../components/page/VerifyPage";
import UserContextApiProvider from "../contextApis/userContextApi";


const verify = () => {
   return (
    <>
     <UserContextApiProvider>
            <VerifyPage />
     </UserContextApiProvider>
    </>
   )
};

export default verify;

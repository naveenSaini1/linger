
import { MessageContextApiProvider } from "../contextApis/messageContextApi";
import SendMessageScreenPage from "../components/page/SendMessageScreenPage";



const SendMessageScreen=()=>{

    return (
        <MessageContextApiProvider>
            <SendMessageScreenPage/>
        </MessageContextApiProvider>
       
    )
}
export default SendMessageScreen;
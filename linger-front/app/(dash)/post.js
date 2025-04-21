import PostPage from "../../components/page/PostPage";
import { PostContextApiProvider } from "../../contextApis/postContextApi";

const post=()=>{
    return (
        <>
        <PostContextApiProvider>
        <PostPage/> 
        </PostContextApiProvider>
        
        
        </>
    )
}
export default post;
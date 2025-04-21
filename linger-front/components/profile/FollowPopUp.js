import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, KeyboardAvoidingView, Modal, Pressable, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import useFetchApi from "../../hooks/fetchApi";
import { API_ADDRESS_STATIC, API_ENDPOINTS, API_HOST_ADDRESS, CLIENT_ENDPOINTS, FOLLOW_PREFIX, IMAGE_PREFIX } from "../../constants/API";
import { useRouter } from "expo-router";
import useCommonContext from "../../contextApis/commonContextApi";
const PAGE_SIZE = 2; // Define page size for pagination

const FollowPopUp = ({ followersCount, followingCount,token,username }) => {
    const showModelWhichRef = useRef(null);
    const [showFollowPopUp, setShowFollowPopUp] = useState(false);
    const [page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const { loading, error, fetchApi } = useFetchApi();
    const router=useRouter();
    const { toggleFollow } = useCommonContext();

    const updateFollowButton=async(follow,username)=>{
        let response = await toggleFollow({follow,username,token})
        console.log(response,"resssssssss");
        if(response.result){
            updateUserIsFollowingInModel(username);
        }

    }
    const updateUserIsFollowingInModel=(username)=>{
        const newData=data.map((item)=>{
            if(item.username==username){
                item.isFollowing=!item.isFollowing;
            }
            return item;
        })
        setData(newData);

    }

    const fetchData=(pageNumber)=>{
        if (showFollowPopUp && hasMore && !loading ) {
            let endpoint = showModelWhichRef.current === "follower"
                ? API_ENDPOINTS.getTheFollower
                : API_ENDPOINTS.getTheFollowing;

            fetchApi({
                url: `${API_HOST_ADDRESS}${FOLLOW_PREFIX}${endpoint}/${username}/${pageNumber}`,
                token: token,
            }).then((newData) => {
                if(newData==null){
                    setHasMore(false)
                    return;
                }
                setData((pre)=>[...pre,...newData]);
                if (newData.length==0) setHasMore(false); // Stop if less data returned
                setPage(prevPage => prevPage + 1)
            });
        }
    }
    // before sendign him to the profile we have to close the model
    const moveForWard=(username)=>{
        setShowFollowPopUp(false);
        router.push({pathname:CLIENT_ENDPOINTS.dashboard.profile,params:{username}})
    }
    useEffect(() => {
        console.log("useeEftc", showFollowPopUp, hasMore, loading,page)
        fetchData(page);
    }, [showFollowPopUp, loading]);

    const loadMoreData = () => {
        console.warn(loading, hasMore, "loadMoreData",page);
        if (!loading && hasMore) {
            fetchData(page);
        }
    };
    console.log(data, "dddddddddddddddd")
    return (
        <>
            <View className="flex-row justify-start mt-3 gap-3">
                <TouchableOpacity onPress={() => {
                    showModelWhichRef.current = "follower";
                    setShowFollowPopUp(true);
                    setPage(1);
                    setHasMore(true);
                    setData([]);
                }}>
                    <Text className="text-sm font-semibold text-[#707070]">
                        {followersCount} <Text className="text-[#707070]">Followers</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    showModelWhichRef.current = "following";
                    setShowFollowPopUp(true);
                    setPage(1);
                    setHasMore(true);
                    setData([])
                }}>
                    <Text className="text-sm font-semibold text-[#707070]">
                        {followingCount} <Text className="text-[#707070]">Following</Text>
                    </Text>
                </TouchableOpacity>
            </View>
            <Modal visible={showFollowPopUp} animationType="fade" transparent>
            <TouchableWithoutFeedback onPress={() => setShowFollowPopUp(false)}>
                <View className="flex-1 bg-black/50 justify-center items-center">
                    <TouchableWithoutFeedback>
                        <View className="w-11/12 max-h-[70%] bg-white rounded-xl p-4 shadow-lg">
                            <Text className="text-lg font-bold text-center mb-4">{showModelWhichRef.current}</Text>
                            <FlatList
                                data={data}
                                keyExtractor={(item) => item.username.toString()}
                                renderItem={({ item }) => (
                                    <View className="flex-row items-center justify-between py-2 border-b border-gray-200">
                                        <TouchableOpacity onPress={()=>moveForWard(item.username)} className="flex-row items-center">
                                            <Image
                                                source={{ uri: `${API_ADDRESS_STATIC}${IMAGE_PREFIX}/${item?.profileimage}` }}
                                                className="w-12 h-12 rounded-full mr-3"
                                            />
                                            <View>
                                                <Text className="font-semibold">{item.username}</Text>
                                                <Text className="text-gray-500">{item.name}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={()=>updateFollowButton(!item.isFollowing,item.username)}  className="px-4 py-1 bg-gray-200 rounded-lg">
                                            {/* Follow/Following button */}
                                            <Text className="text-sm font-medium">{item.isFollowing ? "Following" : "Follow"}</Text>

                                        </TouchableOpacity>
                                    </View>
                                )}
                            />
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>



        </>
    )
}
export default FollowPopUp;
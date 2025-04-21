import { View, Text, Image, TouchableOpacity, FlatList, Modal, ActivityIndicator, Button, RefreshControl } from "react-native";
import { API_ADDRESS_STATIC, API_ENDPOINTS, API_HOST_ADDRESS, CLIENT_ENDPOINTS, FOLLOW_PREFIX, IMAGE_PREFIX } from "../../constants/API";
import { ICONS } from "../../constants/ICONS.JS";
import { useState } from "react";
import FollowPopUp from "./FollowPopUp";
import { useRouter } from "expo-router";


const ProfileCard = ({ user, toggleFollow, mainUser }) => {
    if (user == null) user = {};
    const [showFullBio, setShowFullBio] = useState(false);
    const  route= useRouter();

    const shortBio = user?.bio?.length > 50 ? user.bio.slice(0, 45) + "..." : user.bio;


    return (
        <View className="bg-white rounded-lg shadow-md p-4 w-full"
        >
            {/* Profile Header */}
            <View className="flex-row items-center">
                <View className="flex-2 ml-4">
                    <Image
                        source={{ uri: `${API_ADDRESS_STATIC}${IMAGE_PREFIX}/${user?.profileimage}` }}
                        className="w-28 h-28 rounded-full"
                    />
                </View>

                <View className="flex-1 flex-row">
                    <View className="ml-4 flex-1">
                        <Text className="text-lg font-semibold text-[#707070]">{user?.name}</Text>
                        <Text className="text-[#707070] opacity-50">@{user?.username}</Text>

                        <Text className="text-[#707070] text-sm mt-1">
                            {showFullBio ? user.bio : shortBio}
                        </Text>
                        {user?.bio?.length > 50 && (
                            <TouchableOpacity onPress={() => setShowFullBio(prev => !prev)}>
                                <Text className="text-[#707070] font-medium mt-1">
                                    {showFullBio ? "see less" : "see more"}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <FollowPopUp token={mainUser.token} username={user?.username} followersCount={user?.followersCount} followingCount={user?.followingCount} />
                    </View>

                    <TouchableOpacity>
                        <Image source={ICONS.profile.setting} className="w-8 h-8" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Buttons */}
            <View className="flex-row mt-4 gap-2 w-[80%] m-auto">
                <TouchableOpacity
                    onPress={() => toggleFollow(!user.isFollowing, user.username)}
                    className="flex-1 bg-[#F3F8FF] py-2 rounded-lg"
                >
                    <Text className="text-[#707070] text-center font-semibold">
                        {user.isFollowing ? "Unfollow" : "Follow"}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>route.push({pathname:CLIENT_ENDPOINTS.dashboard.message.sendmessagescreen,params:{username:user?.username}})} className="flex-1 bg-[#F3F8FF] py-2 rounded-lg">
                    <Text className="text-[#707070] text-center font-semibold">Message</Text>
                </TouchableOpacity>
            </View>


        </View>
    );
};

export default ProfileCard;

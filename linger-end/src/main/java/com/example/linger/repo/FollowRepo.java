package com.example.linger.repo;

import java.util.List;

import com.example.linger.dto.userdto.UserFollowoList;
import com.example.linger.exception.MyCustomeException;

/**
 * Author: Naveen Saini
 * Date: 18-Mar-2025	
 */
public interface FollowRepo {
	
	public Integer followToThroughUsername(Integer follower_id,String followingUsername) throws MyCustomeException;
	public Integer checkIfTheUserFollowing(String logedUsername,String username ) throws MyCustomeException;
	public Integer UpdateIfFollowAlreadyExist(String logedUsername,String username ) throws MyCustomeException;

	public Integer unfollowToTheOtherUser(String follwoUsername,String follwingUsername) throws MyCustomeException;
	
	public List<UserFollowoList> getTheFollowers(String logedUsername,String username,Integer limit,Integer offset) throws MyCustomeException;
	public List<UserFollowoList> getTheFollowoing(String logedUsername,String username,Integer limit,Integer offset) throws MyCustomeException;
	
	
}

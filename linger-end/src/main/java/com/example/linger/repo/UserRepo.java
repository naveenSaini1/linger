package com.example.linger.repo;

import com.example.linger.dto.userdto.UsersRegistrationPhaseOne;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;

/**
 * Author: Naveen Saini
 * Date: 09-Mar-2025	
 */
public interface UserRepo {
	
public int insertUsersPhaseOne(UsersRegistrationPhaseOne usersRegistrationPhaseOne) throws MyCustomeException;
	
	public User findTheUserByEmail(String email) throws MyCustomeException;
	
	public User getTheUserDataByUsername(String username) throws MyCustomeException;
	
	public Integer updateTheFollowerCount(String username,String type) throws MyCustomeException;
	
	public Integer updateTheFollowingCount(String username,String type) throws MyCustomeException;
	
	public Integer updateTheQuestionCount(String username,String type) throws MyCustomeException;
	
	public Integer updateTheAnswerCount(String username,String type) throws MyCustomeException;
	
	
	

}

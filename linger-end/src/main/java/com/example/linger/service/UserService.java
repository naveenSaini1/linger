package com.example.linger.service;

import com.example.linger.dto.userdto.UserProfile;
import com.example.linger.dto.userdto.UsersRegistrationPhaseOne;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;

import jakarta.mail.MessagingException;

/**
 * Author: Naveen Saini
 * Date: 09-Mar-2025	
 */
public interface UserService {
	   public int insertUserPhaseOne(UsersRegistrationPhaseOne usersRegistrationPhaseOne) throws MyCustomeException, MessagingException;
	   public User  findTheUserByEmail(String email) throws MyCustomeException;
	   public ResponseModel<Boolean> checkIfTheUsernameExist(String username)throws MyCustomeException; 
	   public String getAccessTokenFromGoogle(String code,String redirectUri);
	   public UsersRegistrationPhaseOne getUserInfoFromGoogle(String accessToken);
	   public ResponseModel<Boolean> genrateThecode(String email) throws MyCustomeException, MessagingException ;
	   public ResponseModel<UserProfile> getTheUserProfile(String username) throws MyCustomeException;
	   
}

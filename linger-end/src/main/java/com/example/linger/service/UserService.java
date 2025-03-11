package com.example.linger.service;

import com.example.linger.dto.userdto.UsersRegistrationPhaseOne;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;

/**
 * Author: Naveen Saini
 * Date: 09-Mar-2025	
 */
public interface UserService {
	   public int insertUserPhaseOne(UsersRegistrationPhaseOne usersRegistrationPhaseOne) throws MyCustomeException;
	   public User  findTheUserByEmail(String email) throws MyCustomeException;
	   public ResponseModel<Boolean> checkIfTheUsernameExist(String username)throws MyCustomeException; 

}

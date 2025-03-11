package com.example.linger.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.dto.userdto.UsersRegistrationPhaseOne;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;
import com.example.linger.repo.UserRepo;
import com.example.linger.service.UserService;


/**
 * Author: Naveen Saini
 * Date: 09-Mar-2025	
 */
@Service
public class UserServiceImpl implements UserService {
	
	@Autowired
	UserRepo usersRepo;

	
	
	@Override
	public int insertUserPhaseOne(UsersRegistrationPhaseOne usersRegistrationPhaseOne) throws MyCustomeException {
		Integer				rowAffected		=0;
		
		if(usersRegistrationPhaseOne==null)
			throw new MyCustomeException(ErroMessageConstants.USER_NOT_FOUND_MESSAGE);
		
		
		if(usersRepo.findTheUserByEmail(usersRegistrationPhaseOne.getEmail())!=null)
			throw new MyCustomeException(ErroMessageConstants.EMAIL_ALREADY_EXIST_MESSAGE);
		
		
		rowAffected	=	 usersRepo.insertUsersPhaseOne(usersRegistrationPhaseOne);
		if(rowAffected==0) {
			throw new MyCustomeException(ErroMessageConstants.USER_NOT_INSERTIATION_ERROR_MESSAGE);
			
		}
		
		return rowAffected;

	}

	@Override
	public User findTheUserByEmail(String email) throws MyCustomeException {
		User		user		=	null;
		
		if(email==null || email.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		user	=	 usersRepo.findTheUserByEmail(email);
		if(user==null)
			throw new MyCustomeException(ErroMessageConstants.USER_NOT_FOUND_MESSAGE);
		
		return user;
		
	}

	@Override
	public ResponseModel<Boolean> checkIfTheUsernameExist(String username) throws MyCustomeException {
		if(username==null || username.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		User					user					=	null;
		ResponseModel<Boolean>	response				=	new ResponseModel<>();

		
		user 	= 	usersRepo.getTheUserDataByUsername(username);
		response.setResultType(ResponseModelsType.SUCCESS);
		if(user==null) {
			response.setData(false);
			return response;
		}
		
		response.setData(true);
		return response;
	}

}

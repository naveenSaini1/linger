package com.example.linger.service.impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.dto.commonDto.GoogleTokenResponse;
import com.example.linger.dto.userdto.UsersRegistrationPhaseOne;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.User;
import com.example.linger.repo.CodeRepo;
import com.example.linger.repo.UserRepo;
import com.example.linger.service.UserService;
import com.example.linger.util.CommonUtil;

import jakarta.mail.MessagingException;


/**
 * Author: Naveen Saini
 * Date: 09-Mar-2025	
 */
@Service
public class UserServiceImpl implements UserService {
	
		@Autowired
		UserRepo usersRepo;
		@Autowired
		CommonUtil commonUtil;
		
		@Value("${spring.security.oauth2.client.registration.google.client-id}")
		private String clientId;

		@Value("${spring.security.oauth2.client.registration.google.client-secret}")
		private String clientSecret;
		
		@Value("${spring.gooogle.info}")
		private String googleProfileUrl;

		@Autowired
		private CodeRepo	codeRepo;
	
	
	@Override
	public int insertUserPhaseOne(UsersRegistrationPhaseOne usersRegistrationPhaseOne) throws MyCustomeException, MessagingException {
		Integer					userId		=	0;
		String 					code			=	commonUtil.generateCode()+"";

		
		if(usersRegistrationPhaseOne==null)
			throw new MyCustomeException(ErroMessageConstants.USER_NOT_FOUND_MESSAGE);
		
		
		if(usersRepo.findTheUserByEmail(usersRegistrationPhaseOne.getEmail())!=null)
			throw new MyCustomeException(ErroMessageConstants.EMAIL_ALREADY_EXIST_MESSAGE);
		
		if(!commonUtil.isValidUsername(usersRegistrationPhaseOne.getUsername()))
			throw new MyCustomeException(ErroMessageConstants.USERNAME_IS_NOT_VALID);

		
		userId	=	 usersRepo.insertUsersPhaseOne(usersRegistrationPhaseOne);
		if(userId	==	0) {
			throw new MyCustomeException(ErroMessageConstants.USER_NOT_INSERTIATION_ERROR_MESSAGE);
			
		}
		commonUtil.sendMailCodeForVerify(usersRegistrationPhaseOne.getEmail(),usersRegistrationPhaseOne.getUsername(), code);
		codeRepo.insertCode(code, userId);
		
		
		return 1;

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

	@Override
	public String getAccessTokenFromGoogle(String code,String redirectUri) {
		   String url = "https://oauth2.googleapis.com/token";
	        RestTemplate 			restTemplate 				= new RestTemplate();
	        Map<String, String> 	params 					    = new HashMap();
	        ResponseEntity<GoogleTokenResponse>  response       = null;
	        params.put("code", code);
	        params.put("client_id", clientId);
	        params.put("client_secret", clientSecret);
	        params.put("redirect_uri", redirectUri);
	        params.put("grant_type", "authorization_code");

	        response = restTemplate.postForEntity(url, params, GoogleTokenResponse.class);

	        return response.getBody().getAccessToken();
	}

	@Override
	public UsersRegistrationPhaseOne getUserInfoFromGoogle(String accessToken) {
		 String			 url 				= googleProfileUrl + accessToken;
		 RestTemplate 	 restTemplate 		= new RestTemplate();
		 UsersRegistrationPhaseOne 	 result 			= restTemplate.getForObject(url, UsersRegistrationPhaseOne.class);	
		 System.out.println(result);
		  return result;
	}

	@Override
	public ResponseModel<Boolean> genrateThecode(String email) throws MyCustomeException, MessagingException {
		if(email==null || email.isEmpty()) {
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		}
		String 					code		=	commonUtil.generateCode()+"";
		ResponseModel<Boolean> 	response 	= 	new ResponseModel<>();
		
		User   user =	 usersRepo.findTheUserByEmail(email);
		
		if(user==null) {
			throw new MyCustomeException(ErroMessageConstants.NOT_FOUND);
		}
		
		
		commonUtil.sendMailCodeForPassword(email, user.getUsername(), code);
		codeRepo.insertCode(code, user.getUserId());
		System.out.println("send code");
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(true);
		
		return response;
	}




}

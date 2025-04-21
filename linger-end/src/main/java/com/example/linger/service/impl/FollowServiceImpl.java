package com.example.linger.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.linger.constants.DefaultConstants;
import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.dto.userdto.UserFollowoList;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.repo.FollowRepo;
import com.example.linger.repo.UserRepo;
import com.example.linger.service.FollowService;
import com.example.linger.util.CommonUtil;

/**
 * Author: Naveen Saini
 * Date: 18-Mar-2025	
 */
@Service
public class FollowServiceImpl implements FollowService{
	
	@Autowired
	CommonUtil commonUtil;
	
	@Autowired
	FollowRepo		followRepo;
	
	@Autowired
	UserRepo		userRepo;

	@Override
	public ResponseModel<Boolean> followToTheUser(String username) throws MyCustomeException {
		
		if(username==null || username.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		Integer					responseId		=	0;
		Integer					userId			=	commonUtil.getUserId();
		ResponseModel<Boolean>	response		=	new ResponseModel<>();
		String					logedUsername	=	commonUtil.getUsername();
		
		// let first Let's Increase the follower and following count
		
		// followers Count , following count
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(true);
		
		
		if(logedUsername.equals(username)) throw new MyCustomeException(ErroMessageConstants.SOMETING_WENT_WRONG);
		
		if(followRepo.checkIfTheUserFollowing(logedUsername, username)!=0) {
			response.setData(false);
			return response;
		}
		
		
		if(userRepo.updateTheFollowerCount(username, DefaultConstants.INCREASE)==0 ||
				userRepo.updateTheFollowingCount(logedUsername, DefaultConstants.INCREASE)==0){
			response.setData(false);
			return response;
			
		}
		
		if(followRepo.UpdateIfFollowAlreadyExist(logedUsername, username)!=0) {
			
			return response;
		}
		
		
		responseId	=	followRepo.followToThroughUsername(userId, username);
		if(responseId==0) {
			response.setData(false);
			return response;
			
		}
		return response;
	}

	@Override
	public ResponseModel<Boolean> unFollowToTheUser(String unFollowUsnerName) throws MyCustomeException {

		if(unFollowUsnerName==null || unFollowUsnerName.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		Integer					responseId		=	0;
		ResponseModel<Boolean>	response		=	new ResponseModel<>();
		String					logedUsername	=	commonUtil.getUsername();
		
		// let first Let's Increase the follower and following count
		
		// followers Count , following count
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(true);
		
		if(followRepo.unfollowToTheOtherUser(logedUsername, unFollowUsnerName)==0 || userRepo.updateTheFollowerCount(unFollowUsnerName, DefaultConstants.DECREASE)==0 ||
				userRepo.updateTheFollowingCount(logedUsername, DefaultConstants.DECREASE)==0){
			response.setData(false);
			return response;
			
		}
		
		return response;

	}

	@Override
	public ResponseModel<List<UserFollowoList>> getTheFollowerList(String username,Integer page) throws MyCustomeException {
		if(username==null || username.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		ResponseModel<List<UserFollowoList>>		response				=	new ResponseModel<>();
		Integer								 		defualtLimit			=   DefaultConstants.DEFAULT_LIMIT_FOR_USER_SEARCH;
		Integer								 		offeset					= 	(page==1)?0:(page-1)*defualtLimit;
		String										logedUsername			=	commonUtil.getUsername();

		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(followRepo.getTheFollowers(logedUsername,username,defualtLimit,offeset));
		
		return response;
	}

	@Override
	public ResponseModel<List<UserFollowoList>> getTheFollowingList(String username,Integer page) throws MyCustomeException {
		
		if(username==null || username.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		ResponseModel<List<UserFollowoList>>		response				=	new ResponseModel<>();
		Integer								 		defualtLimit			=   DefaultConstants.DEFAULT_LIMIT_FOR_USER_SEARCH;
		Integer								 		offeset					= 	(page==1)?0:(page-1)*defualtLimit;
		String										logedUsername			=	commonUtil.getUsername();

	
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(followRepo.getTheFollowoing(logedUsername,username,defualtLimit,offeset));
		
		return response;
	}

}

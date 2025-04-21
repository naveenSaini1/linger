package com.example.linger.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.linger.constants.ErroMessageConstants;
import com.example.linger.dto.conversation.Friend;
import com.example.linger.dto.conversation.UserDetails;
import com.example.linger.enums.ConversationType;
import com.example.linger.enums.ResponseModel;
import com.example.linger.enums.ResponseModelsType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Conversation;
import com.example.linger.model.Message;
import com.example.linger.model.User;
import com.example.linger.repo.ConversationRepo;
import com.example.linger.repo.MessageRepo;
import com.example.linger.repo.UserRepo;
import com.example.linger.service.MessageService;
import com.example.linger.util.CommonUtil;

/**
 * Author: Naveen Saini
 * Date: 26-Mar-2025	
 */
@Service
public class MessageServiceImpl  implements MessageService{
	
	@Autowired
	private MessageRepo			messageRepo;
	
	@Autowired
	private UserRepo			userRepo;
	
	@Autowired
	private ConversationRepo	conversationRepo;
	
	@Autowired
	private CommonUtil			commonUtil;
	
	

	@Override
	public ResponseModel<Message> inserTheMessage(String username,String message,String userName) throws MyCustomeException {
		if(username==null || username.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		Message 				getIfInserTed			=	null;
		ConversationType		conversationType		=	ConversationType.accepted;
		String					logedUsername			=	(userName==null)?commonUtil.getUsername():userName;
		ResponseModel<Message>	response				=	new ResponseModel<>();
		Conversation			conversation			=   null;
		
		// insert if the conversation type is accepted
		System.out.println("lin one 54 "+username+"  "+message+"  "+logedUsername+" type" +conversationType.toString());
		getIfInserTed	=	messageRepo.inserMessage(logedUsername, username, message, conversationType);
		response.setResultType(ResponseModelsType.SUCCESS);
		
		System.out.println("line no 58"+getIfInserTed);
		if(getIfInserTed!=null) {
			response.setData(getIfInserTed);
			return response;
		}
		System.out.println("is inserted"+ getIfInserTed+ logedUsername+" "+username+" "+" "+message+" "+conversationType);
		
		// if the message did not insert let's check with what is the type
		
		conversation	=	conversationRepo.getTheConversationIfExist(logedUsername, username);
		
		System.out.println("conversation "+ conversation);

		// if the conversation null then we have to insert the first conversation
		if(conversation==null) {
			//let's first see if the user sendin the message him self or not 
			ConversationType		insertType	=	ConversationType.pending;
			
			if(logedUsername.equals(username))insertType=ConversationType.accepted;
			
			Integer		responseConversation	=	conversationRepo.inserTheConversation(logedUsername, username,insertType);
			
			// getting 0 so the issue would be the username , fucking username is not right
			if(responseConversation==0)throw new MyCustomeException(ErroMessageConstants.USER_NOT_FOUND_MESSAGE);	
			
			return response;
			
		}
		
		//  let category the conversaton 
		
		switch (conversation.getType()) {
		case accepted: {
			
			throw new MyCustomeException(ErroMessageConstants.NOW_WAY);			

		}
		case pending: {
			
			throw new MyCustomeException(ErroMessageConstants.USER_HAVE_NOT_ACCEPTED);			

			
			
		}
		case rejected: {
			throw new MyCustomeException(ErroMessageConstants.REQUEST_REJECTED);			
			
			
		}	
		default:
			throw new MyCustomeException("Unexpected value: " + conversation.getType());
		}
		
		
		
	}

	@Override
	public ResponseModel<Boolean> toggleTheConversationRequest(String type,String username) throws MyCustomeException {
		if(type==null || type.trim().equals("") || username==null || username.trim().equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		ConversationType		conversationType	= 	ConversationType.valueOf(type);
		
		String 					logedUsername		= 	commonUtil.getUsername();
		ResponseModel<Boolean> 	response			=	new ResponseModel<>();
		Conversation			conversation		=	null;
		Integer					isSuccesfull		=	0;
		
		
		if(conversationType==null || conversationType.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		conversation	=	conversationRepo.getTheConversationIfExist(logedUsername, username);
		
		System.out.println(conversation+" username "+logedUsername+" username"+username);
		switch (conversationType) {
		case intialize: {
			
			if(conversation==null) {
				isSuccesfull 	=	 conversationRepo.inserTheConversation(logedUsername, username, ConversationType.pending);
				
			}
			break;
		}
		case accepted: {
			
			if(conversation!=null)
			isSuccesfull =	conversationRepo.toggleTheConversationType(ConversationType.accepted, logedUsername, username);
			
			break;
		}
		case rejected: {
			
			if(conversation!=null)
				isSuccesfull =  conversationRepo.toggleTheConversationType(ConversationType.rejected, logedUsername, username);
			
			break;
		}
		default:
			throw new MyCustomeException("Unexpected value: " + conversationType);
		}
		
		if(isSuccesfull==0)throw new MyCustomeException(ErroMessageConstants.SOMETING_WENT_WRONG);
		
		response.setData(true);
		response.setResultType(ResponseModelsType.SUCCESS);
		return response;
	}

	@Override
	public ResponseModel<UserDetails> getTheUserDtailsWhileOnMessageClikc(String username) throws MyCustomeException {
		if(username==null || username.equals(""))
			throw new MyCustomeException(ErroMessageConstants.FIELD_IS_EMPTY);
		
		
		String						logedUsername		= commonUtil.getUsername();
		UserDetails					details				= null;
		ResponseModel<UserDetails>	response			= new ResponseModel<>();
		
		details		=	conversationRepo.getTheUserInfoWhileClick(logedUsername, username);
		
		// if the details are null so it means there is no conversation happend with them
		response.setResultType(ResponseModelsType.SUCCESS);
		if(details==null) {
			User	user	=	userRepo.getTheUserDataByUsername(username);
			if(user==null) throw new MyCustomeException(ErroMessageConstants.USER_NOT_FOUND_MESSAGE);
			
			details	=	new UserDetails();
			details.setName(user.getName());
			details.setUsername(user.getUsername());
//			details.setIsActive(user.getIsactive());
			details.setProfileImage(user.getProfileImage());
			response.setData(details);
			
			return response;
			
			
			
		}
		System.out.println(details);
		if(details.getType()==ConversationType.accepted || details.getType()==ConversationType.pending) {
					
			List<Message> message=messageRepo.getTheMessagesByConversationId(details.getConversationId(),20,0);
			
			details.setMessages(message);
		}
		
		response.setData(details);
		return response;
		
	}

	@Override
	public ResponseModel<List<Friend>> fetchAllTheFriendsOfMessageScreen() throws MyCustomeException {
		String 						logedUsername		= commonUtil.getUsername();
		ResponseModel<List<Friend>>	response				= new ResponseModel<>();
		
		System.out.println("getThe friends");
		response.setResultType(ResponseModelsType.SUCCESS);
		response.setData(conversationRepo.getTheChatFriendsList(logedUsername));
		
		
		return response;
	}
	
	

}

package com.example.linger.service;
/**
 * Author: Naveen Saini
 * Date: 26-Mar-2025	
 */

import java.util.List;

import com.example.linger.dto.conversation.Friend;
import com.example.linger.dto.conversation.UserDetails;
import com.example.linger.enums.ResponseModel;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Message;

public interface MessageService {
	
	
	public ResponseModel<Message> 	inserTheMessage(String username,String message,String header) throws MyCustomeException;
	public ResponseModel<Boolean>	toggleTheConversationRequest(String type,String username) throws MyCustomeException;
	public ResponseModel<UserDetails> getTheUserDtailsWhileOnMessageClikc(String username) throws MyCustomeException;
	public ResponseModel<List<Friend>> fetchAllTheFriendsOfMessageScreen() throws MyCustomeException;
}

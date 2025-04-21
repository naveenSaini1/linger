package com.example.linger.repo;
/**
 * Author: Naveen Saini
 * Date: 26-Mar-2025	
 */

import java.util.List;

import com.example.linger.dto.conversation.Friend;
import com.example.linger.dto.conversation.UserDetails;
import com.example.linger.enums.ConversationType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Conversation;

public interface ConversationRepo {
	
	public Conversation	getTheConversationIfExist(String logedUsername,String username) throws MyCustomeException;

	public Integer		inserTheConversation(String logedUsername,String username,ConversationType type) throws MyCustomeException;
	
	public Integer		toggleTheConversationType(ConversationType type,String receverUsername,String senderUsername) throws MyCustomeException;
	
	public UserDetails	getTheUserInfoWhileClick(String logedUsername,String otherUsername) throws MyCustomeException;
	public List<Friend> getTheChatFriendsList(String logedUsername) throws MyCustomeException;
}

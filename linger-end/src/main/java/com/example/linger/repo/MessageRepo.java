package com.example.linger.repo;

import java.util.List;

import com.example.linger.enums.ConversationType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Message;

/**
 * Author: Naveen Saini
 * Date: 26-Mar-2025	
 */
public interface MessageRepo {

	public Message inserMessage(String senderUsername,String receiverUsername,String message,ConversationType type) throws MyCustomeException;
	public List<Message> getTheMessagesByConversationId(Integer conversationId,Integer limit,Integer offset) throws MyCustomeException;
}

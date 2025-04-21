package com.example.linger.repo.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.linger.constants.SqlConstants;
import com.example.linger.enums.ConversationType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Message;
import com.example.linger.repo.MessageRepo;
import com.example.linger.rowmapper.MessageRowMapper;

/**
 * Author: Naveen Saini
 * Date: 26-Mar-2025	
 */
@Repository
public class MessageRepoImpl implements MessageRepo {
	

	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private SqlConstants	sqlConstants;
	

	@Override
	public Message inserMessage(String senderUsername, String receiverUsername, String message,ConversationType type) throws MyCustomeException {
		
		Object[]		data		=	{senderUsername,receiverUsername,type.toString(),message};
		
		try {
			return jdbcTemplate.query(sqlConstants.INSERT_THE_MESSAGE_IF_THE_CONVERSATION_TYPE,new MessageRowMapper.GetTheMessagesWhileInserting(),data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}


	@Override
	public List<Message> getTheMessagesByConversationId(Integer conversationId, Integer limit, Integer offset) throws MyCustomeException {
	Object[]		data		=	{conversationId,limit,offset};
		
	System.out.println(sqlConstants.GET_THE_MESSAGES_BY_CONVERSATION_ID);
	
		try {
			return jdbcTemplate.query(sqlConstants.GET_THE_MESSAGES_BY_CONVERSATION_ID,new MessageRowMapper.GetTheMessagesByConversationid(),data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

}

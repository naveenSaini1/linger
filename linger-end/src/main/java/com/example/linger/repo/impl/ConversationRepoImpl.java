package com.example.linger.repo.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.linger.constants.SqlConstants;
import com.example.linger.dto.conversation.Friend;
import com.example.linger.dto.conversation.UserDetails;
import com.example.linger.enums.ConversationType;
import com.example.linger.exception.MyCustomeException;
import com.example.linger.model.Conversation;
import com.example.linger.repo.ConversationRepo;
import com.example.linger.rowmapper.ConversationRowMapper;

/**
 * Author: Naveen Saini
 * Date: 26-Mar-2025	
 */
@Repository
public class ConversationRepoImpl implements ConversationRepo{
	@Autowired
	private JdbcTemplate 	jdbcTemplate;
	
	@Autowired
	private SqlConstants	sqlConstants;

	@Override
	public Conversation getTheConversationIfExist(String logedUsername, String username) throws MyCustomeException {
		Object[]		data		=	{logedUsername,username};
		
		try {
			return jdbcTemplate.query(sqlConstants.GET_THE_CONVERSATION_IF_EXIST,new ConversationRowMapper.GetTheConversation(),data);
		}
		catch(Exception ex) {
			data	=	null;
			throw new MyCustomeException(ex.getMessage());
		
		}
	}

	@Override
	public Integer inserTheConversation(String logedUsername, String username,ConversationType type) throws MyCustomeException {
		Object[]		data		= {logedUsername,username,type.toString()};

		try {
			return jdbcTemplate.update(sqlConstants.INSERT_INTO_CONVERSATION,data);
		} catch (Exception e) {
			data	=	null;
			throw new MyCustomeException(e.getMessage());
			
		}
		
	}

	@Override
	public Integer toggleTheConversationType(ConversationType type, String receverUsername, String senderUsername) throws MyCustomeException {
		Object[]		data		= {type.toString(),receverUsername,senderUsername};

		try {
			return jdbcTemplate.update(sqlConstants.TOGGLE_CONVERSATION_THE_TYPE,data);
		} catch (Exception e) {
			data	=	null;
			throw new MyCustomeException(e.getMessage());
			
		}
	}

	@Override
	public UserDetails getTheUserInfoWhileClick(String logedUsername, String otherUsername) throws MyCustomeException {
		Object[]		data		= {logedUsername,otherUsername};

		try {
			return jdbcTemplate.query(sqlConstants.GET_THE_USER_DETAILS_WHILE_CLICKING_ON_MESSAGE,new ConversationRowMapper.GetTheUserDetails(),data);
		} catch (Exception e) {
			data	=	null;
			throw new MyCustomeException(e.getMessage());
			
		}
	}

	@Override
	public List<Friend> getTheChatFriendsList(String logedUsername) throws MyCustomeException {
		Object[]		data		= {logedUsername};

		try {
			return jdbcTemplate.query(sqlConstants.FETCH_FRIENDS_LIST_OF_MESSAGING,new ConversationRowMapper.FetchChatFriendsList(),data);
		} catch (Exception e) {
			data	=	null;
			throw new MyCustomeException(e.getMessage());
			
		}
	}

}
